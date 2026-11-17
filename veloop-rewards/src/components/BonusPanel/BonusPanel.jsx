import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle, CheckCircle2, ClipboardCheck, Coins, History, Info, Loader2, TrendingUp, Users,
} from 'lucide-react';
import { useStore } from '../../services/rewardsStore';
import { ECONOMY } from '../../services/economy';
import { bonusStatus, claim } from '../../services/bonusApi';
import { uid } from '../../services/apiUtils';
import { formatWhen } from '../../utils/format';
import ui from '../shared/Panels.module.css';

const B = ECONOMY.bonus;
const MSG_ICON = { success: CheckCircle2, error: AlertCircle, info: Info };

export default function BonusPanel({ panelRef, highlight }) {
  const state = useStore((s) => s);
  const st = useMemo(() => bonusStatus(state), [state]);
  const history = state.bonus.history;

  const [busyId, setBusyId] = useState(null);
  const [message, setMessage] = useState(null);

  const onClaim = async (activity) => {
    if (busyId) return;
    setBusyId(activity);
    setMessage(null);
    const res = await claim({ activity, requestId: uid() });
    setBusyId(null);
    setMessage(
      res.ok
        ? { type: 'success', text: `+${res.ve} VE added: ${res.label}.` }
        : { type: 'error', text: res.message },
    );
  };

  const cards = [
    {
      id: 'checkin',
      title: 'Daily check-in',
      Icon: ClipboardCheck,
      reward: st.checkin.ve,
      done: st.checkin.claimed,
      ready: !st.checkin.claimed,
      text: 'Check in once every day to collect your bonus. The server allows one check-in per calendar day.',
      progress: st.checkin.claimed ? 1 : 0,
      progressText: st.checkin.claimed ? 'Checked in today' : 'Not checked in yet',
      label: st.checkin.claimed ? 'Claimed today' : `Check in & claim +${st.checkin.ve} VE`,
      disabled: st.checkin.claimed,
      link: null,
    },
    {
      id: 'tasks',
      title: 'Complete tasks',
      Icon: TrendingUp,
      reward: st.tasks.ve,
      done: st.tasks.claimed,
      ready: st.tasks.eligible && !st.tasks.claimed,
      text: `Complete ${st.tasks.required} captcha tasks today. The server counts your real completed tasks before it pays.`,
      progress: Math.min(1, st.tasks.done / st.tasks.required),
      progressText: `${Math.min(st.tasks.done, st.tasks.required)} of ${st.tasks.required} captcha tasks completed today`,
      label: st.tasks.claimed ? 'Claimed today' : st.tasks.eligible ? `Claim +${st.tasks.ve} VE` : `Locked: ${st.tasks.done}/${st.tasks.required} tasks`,
      disabled: st.tasks.claimed || !st.tasks.eligible,
      link: !st.tasks.eligible && !st.tasks.claimed ? { to: '/captcha-tasks', text: 'Go to Captcha Tasks' } : null,
    },
    {
      id: 'invite',
      title: 'Invite friends',
      Icon: Users,
      reward: st.invite.ve,
      done: st.invite.done,
      ready: st.invite.claimable > 0,
      text: 'A friend must join with your code AND complete a task. Each verified friend can be claimed once.',
      progress: st.invite.claimable > 0 || st.invite.done ? 1 : 0,
      progressText: `${st.invite.verified} verified ${st.invite.verified === 1 ? 'friend' : 'friends'} · ${st.invite.claimable} ready to claim`,
      label: st.invite.claimable > 0 ? `Claim +${st.invite.ve} VE` : st.invite.done ? 'All verified friends claimed' : 'No verified friend yet',
      disabled: st.invite.claimable === 0,
      link: st.invite.claimable === 0 ? { to: '/refer-earn', text: 'Go to Refer & Earn' } : null,
    },
  ];

  const MsgIcon = message ? MSG_ICON[message.type] || Info : null;

  return (
    <div className={ui.grid} ref={panelRef} id="bonus-panel">
      <div className={ui.main}>
        <section className={ui.card} aria-labelledby="bn-title">
          <header className={ui.head}>
            <div>
              <p className={ui.eyebrow}>BONUS CENTER</p>
              <h2 id="bn-title" className={ui.title}>Earn extra VE</h2>
            </div>
            <span className={`${ui.pill} ${ui.pill_gold}`}>{st.claimedCount} of 3 done today</span>
          </header>

          <div className={ui.acts}>
            {cards.map((c) => {
              const stateClass = c.done ? ui.actDone : c.ready ? ui.actReady : '';
              const flash = highlight === c.id ? ui.actFlash : '';
              const badge = c.done ? ['done', 'Claimed'] : c.ready ? ['ready', 'Ready'] : ['locked', 'Locked'];
              return (
                <article key={c.id} id={`bonus-${c.id}`} className={`${ui.act} ${stateClass} ${flash}`} aria-labelledby={`bn-${c.id}-t`}>
                  <div className={ui.actHead}>
                    <span className={ui.actIcon} aria-hidden="true"><c.Icon size={22} /></span>
                    <div>
                      <h3 id={`bn-${c.id}-t`} className={ui.actTitle}>{c.title}</h3>
                      <p className={ui.actReward}>+{c.reward} VE</p>
                    </div>
                    <span className={`${ui.badge} ${ui[`badge_${badge[0]}`]}`}>{badge[1]}</span>
                  </div>
                  <p className={ui.actText}>{c.text}</p>
                  <div className={ui.bar} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(c.progress * 100)} aria-label={`${c.title} progress`}>
                    <span className={`${ui.barFill} ${c.done ? ui.barDone : ''}`} style={{ width: `${c.progress * 100}%` }} />
                  </div>
                  <p className={ui.progressText}>{c.progressText}</p>
                  <div className={ui.actFoot}>
                    <button type="button" className={ui.primary} onClick={() => onClaim(c.id)} disabled={c.disabled || Boolean(busyId)}>
                      {busyId === c.id ? <><Loader2 size={18} className={ui.spin} aria-hidden="true" /> Verifying…</> : <><Coins size={18} aria-hidden="true" /> {c.label}</>}
                    </button>
                    {c.link && <Link to={c.link.to} className={ui.ghost}>{c.link.text}</Link>}
                  </div>
                </article>
              );
            })}
          </div>

          <div className={ui.messageWrap} aria-live="polite">
            {message && (
              <p className={ui.message} data-type={message.type} role={message.type === 'error' ? 'alert' : 'status'}>
                <MsgIcon size={16} aria-hidden="true" /> <span>{message.text}</span>
              </p>
            )}
          </div>
        </section>
      </div>

      <div className={ui.side}>
        <section className={ui.card} aria-label="Bonus summary">
          <header className={ui.head}><h2 className={ui.subTitle}><Coins size={18} aria-hidden="true" /> Today</h2></header>
          <ul className={ui.stats}>
            <li><span>Bonus VE earned today</span><strong>+{st.earnedToday} VE</strong></li>
            <li><span>Check-in reward</span><strong>+{B.checkin.ve} VE</strong></li>
            <li><span>Tasks reward</span><strong>+{B.tasks.ve} VE</strong></li>
            <li><span>Invite reward (per friend)</span><strong>+{B.invite.ve} VE</strong></li>
          </ul>
        </section>

        <section className={ui.card} aria-labelledby="bn-history">
          <header className={ui.head}>
            <h2 id="bn-history" className={ui.subTitle}><History size={18} aria-hidden="true" /> Bonus history</h2>
            <span className={ui.hint}>Last {history.length}</span>
          </header>
          {history.length === 0 ? (
            <p className={ui.empty}>No bonuses claimed yet.</p>
          ) : (
            <ul className={ui.hList}>
              {history.map((h) => (
                <li key={h.id} className={ui.hItem}>
                  <span className={ui.hIcon} aria-hidden="true"><Coins size={18} /></span>
                  <span className={ui.hText}>
                    <span className={ui.hLabel}>{h.label}</span>
                    <span className={ui.hTime}>{formatWhen(h.at)}</span>
                  </span>
                  <span className={ui.hAmt}>+{h.ve} VE</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
