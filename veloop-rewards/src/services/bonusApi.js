/**
 * Bonus "server": a bonus is paid only after it is cross-checked against real activity.
 *  - checkin: once per calendar day
 *  - tasks:   needs the required number of captcha tasks completed TODAY (read from the captcha record)
 *  - invite:  needs a friend who joined with your code AND was verified (read from the referral record),
 *             and each friend can be claimed only once
 * The page only asks; this file decides.
 */
import { ECONOMY } from './economy';
import { addLedger, applyDelta, mutate, pushHistory } from './rewardsStore';
import { fail, latency } from './apiUtils';

const B = ECONOMY.bonus;
const done = new Map();
let busy = false;

/** Read-only summary the UI uses to show progress (the server still re-checks on claim). */
export function bonusStatus(s) {
  const verified = s.referral.friends.filter((f) => f.status === 'rewarded');
  const claimable = verified.filter((f) => !s.bonus.claimedFriends.includes(f.id));
  const inviteDone = s.bonus.claimedFriends.length > 0 && claimable.length === 0;
  return {
    checkin: { claimed: s.bonus.claimed.checkin, ve: B.checkin.ve },
    tasks: {
      done: s.captcha.completedToday,
      required: B.tasks.required,
      claimed: s.bonus.claimed.tasks,
      eligible: s.captcha.completedToday >= B.tasks.required,
      ve: B.tasks.ve,
    },
    invite: {
      verified: verified.length,
      claimable: claimable.length,
      claimedFriends: s.bonus.claimedFriends.length,
      done: inviteDone,
      ve: B.invite.ve,
    },
    claimedCount: (s.bonus.claimed.checkin ? 1 : 0) + (s.bonus.claimed.tasks ? 1 : 0) + (inviteDone ? 1 : 0),
    earnedToday: s.bonus.earnedToday,
  };
}

export async function claim({ activity, requestId }) {
  if (requestId && done.has(requestId)) {
    await latency(150, 300);
    return done.get(requestId);
  }
  if (busy) return fail('BUSY', 'Another claim is still being processed.');

  busy = true;
  try {
    await latency(450, 800);

    const result = mutate((d) => {
      let reward = 0;
      let label = '';

      if (activity === 'checkin') {
        if (d.bonus.claimed.checkin) return fail('ALREADY_CLAIMED', 'You already checked in today. Come back tomorrow.');
        d.bonus.claimed.checkin = true;
        reward = B.checkin.ve;
        label = 'Daily check-in bonus';
      } else if (activity === 'tasks') {
        if (d.bonus.claimed.tasks) return fail('ALREADY_CLAIMED', 'You already claimed this bonus today.');
        if (d.captcha.completedToday < B.tasks.required) {
          return fail(
            'NOT_ELIGIBLE',
            `Not verified yet: complete ${B.tasks.required} captcha tasks first (you have completed ${d.captcha.completedToday}).`,
          );
        }
        d.bonus.claimed.tasks = true;
        reward = B.tasks.ve;
        label = `Tasks bonus (${B.tasks.required} captcha tasks)`;
      } else if (activity === 'invite') {
        const friend = d.referral.friends.find((f) => f.status === 'rewarded' && !d.bonus.claimedFriends.includes(f.id));
        if (!friend) {
          const any = d.referral.friends.some((f) => f.status === 'rewarded');
          return fail(
            'NOT_ELIGIBLE',
            any
              ? 'You already claimed the invite bonus for every verified friend.'
              : 'Not verified yet: a friend must join with your code and complete a task.',
          );
        }
        d.bonus.claimedFriends.push(friend.id);
        reward = B.invite.ve;
        label = `Invite bonus for ${friend.name}`;
      } else {
        return fail('UNKNOWN_ACTIVITY', 'That bonus does not exist.');
      }

      applyDelta(d, { ve: reward });
      d.bonus.earnedToday += reward;
      pushHistory(d.bonus.history, { activity, label, ve: reward });
      addLedger(d, { type: 'bonus', label, delta: { ve: reward } });
      return { ok: true, activity, ve: reward, label };
    });

    if (requestId) done.set(requestId, result);
    return result;
  } finally {
    busy = false;
  }
}

/* Test helper: exists ONLY in `vite build --mode test`, stripped from normal builds. */
if (import.meta.env.MODE === 'test' && typeof window !== 'undefined') {
  window.__apiTest = Object.assign(window.__apiTest || {}, { claim });
}
