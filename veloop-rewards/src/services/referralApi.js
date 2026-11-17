/**
 * Referral "server".
 * A reward is paid only after a friend is VERIFIED: they joined with YOUR code and completed
 * their first task. Each friend is rewarded once, and names cannot repeat.
 *
 * Real friends need their own accounts, which this demo does not have, so the Refer page
 * has a clearly labelled "test friend" tool that sends the same events a backend would.
 */
import { ECONOMY } from './economy';
import { addLedger, applyDelta, mutate, pushHistory } from './rewardsStore';
import { fail, latency, uid } from './apiUtils';

const R = ECONOMY.referral;

export async function addFriend({ name }) {
  await latency(400, 700);
  const clean = String(name ?? '').trim().replace(/\s+/g, ' ');
  if (clean.length < 2 || clean.length > 20) return fail('INVALID_NAME', 'Use 2 to 20 characters for the name.');
  if (!/^[A-Za-z0-9 ]+$/.test(clean)) return fail('INVALID_NAME', 'Use letters, numbers and spaces only.');

  return mutate((d) => {
    if (d.referral.friends.length >= R.maxFriends) {
      return fail('FRIEND_LIMIT', `You can add up to ${R.maxFriends} friends.`);
    }
    if (d.referral.friends.some((f) => f.name.toLowerCase() === clean.toLowerCase())) {
      return fail('DUPLICATE', 'A friend with that name has already joined with your code.');
    }
    const friend = { id: uid(), name: clean, joinedAt: Date.now(), status: 'joined', referredBy: d.referral.code, rewardedAt: 0 };
    d.referral.friends.push(friend);
    pushHistory(d.referral.history, { kind: 'joined', name: clean, ve: 0 });
    addLedger(d, { type: 'referral', label: `${clean} joined with your code`, delta: {} });
    return { ok: true, friend };
  });
}

export async function friendCompletesTask({ friendId }) {
  await latency(500, 800);
  return mutate((d) => {
    const friend = d.referral.friends.find((f) => f.id === friendId);
    if (!friend) return fail('NOT_FOUND', 'That friend was not found.');
    if (friend.referredBy !== d.referral.code) return fail('INVALID_REFERRAL', 'This friend did not join with your code.');
    if (friend.status === 'rewarded') return fail('ALREADY_REWARDED', `${friend.name} has already been rewarded.`);

    friend.status = 'rewarded';
    friend.rewardedAt = Date.now();
    applyDelta(d, { ve: R.referrerVe });
    pushHistory(d.referral.history, { kind: 'rewarded', name: friend.name, ve: R.referrerVe });
    addLedger(d, { type: 'referral', label: `${friend.name} completed a task: referral reward`, delta: { ve: R.referrerVe } });
    return { ok: true, ve: R.referrerVe, friend };
  });
}

/* Test helper: exists ONLY in `vite build --mode test`, stripped from normal builds. */
if (import.meta.env.MODE === 'test' && typeof window !== 'undefined') {
  window.__apiTest = Object.assign(window.__apiTest || {}, { addFriend, friendCompletesTask });
}
