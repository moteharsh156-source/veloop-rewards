import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle, Check, CheckCircle2, Copy, FlaskConical, History, Info, Loader2, UserPlus, Users,
} from 'lucide-react';
import { useStore } from '../../services/rewardsStore';
import { ECONOMY } from '../../services/economy';
import { addFriend, friendCompletesTask } from '../../services/referralApi';
import { formatWhen } from '../../utils/format';
import ui from '../shared/Panels.module.css';

const R = ECONOMY.referral;
const MSG_ICON = { success: CheckCircle2, error: AlertCircle, info: Info };

export default function ReferralPanel({ panelRef, inputRef }) {
  const referral = useStore((s) => s.referral);
  const { code, friends, history } = referral;

  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [message, setMessage] = useState(null);
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const rewarded = friends.filter((f) => f.status === 'rewarded').length;
  const earned = history.reduce((sum, h) => sum + (h.ve || 0), 0);

  const copyCode = async () => {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setMessage({ type: 'info', text: 'Referral code copied.' });
    } catch {
      setMessage({ type: 'info', text: `Copy this code manually: ${code}` });
    }
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  const onAdd = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setMessage(null);
    const res = await addFriend({ name });
    setBusy(false);
    if (res.ok) {
      setName('');
      setMessage({ type: 'success', text: `${res.friend.name} joined with your code. Now they need to complete a task.` });
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  const onComplete = async (friend) => {
    if (busyId) return;
    setBusyId(friend.id);
    setMessage(null);
    const res = await friendCompletesTask({ friendId: friend.id });
    setBusyId(null);
    setMessage(
      res.ok
        ? { type: 'success', text: `Verified! ${friend.name} completed a task. +${res.ve} VE added to your wallet.` }
        : { type: 'error', text: res.message },
    );
  };

  const MsgIcon = message ? MSG_ICON[message.type] || Info : null;

  return (
    <div className={ui.grid} ref={panelRef} id="referral-panel">
      <div className={ui.main}>
        <section className={ui.card} aria-labelledby="rf-title">
          <header className={ui.head}>
            <div>
              <p className={ui.eyebrow}>REFER &amp; EARN</p>
              <h2 id="rf-title" className={ui.title}>Your referral code</h2>
            </div>
            <span className={`${ui.pill} ${ui.pill_gold}`}>You earn {R.referrerVe} VE per friend</span>
          </header>

          <div className={ui.codeBox}>
            <span className={ui.codeText} aria-label={`Your referral code is ${code}`}>{code}</span>
            <button type="button" className={ui.ghost} onClick={copyCode}>
              {copied ? <><Check size={16} aria-hidden="true" /> Copied</> : <><Copy size={16} aria-hidden="true" /> Copy</>}
            </button>
          </div>
          <p className={ui.help}>
            A friend joins with this code. You are rewarded only after they complete their first task. Your friend gets {R.friendVe} VE.
          </p>

          <p className={ui.testNote}>
            <FlaskConical size={16} aria-hidden="true" />
            <span>
              Test tool: friends cannot sign in to this demo, so add a test friend here, then press &ldquo;Friend completed a task&rdquo;.
              These buttons send the same events a real friend account would. The server still checks every rule.
            </span>
          </p>

          <form className={ui.field} onSubmit={onAdd} noValidate>
            <label htmlFor="rf-name" className={ui.label}>Add a friend who joined with your code</label>
            <div className={ui.formRow}>
              <input
                id="rf-name"
                ref={inputRef}
                className={ui.textInput}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Friend's name"
                maxLength={24}
                autoComplete="off"
                readOnly={busy}
                aria-describedby="rf-help"
              />
              <button type="submit" className={ui.primary} disabled={busy}>
                {busy ? <><Loader2 size={18} className={ui.spin} aria-hidden="true" /> Adding…</> : <><UserPlus size={18} aria-hidden="true" /> Add friend</>}
              </button>
            </div>
            <p id="rf-help" className={ui.help}>2 to 20 characters. Letters, numbers and spaces. Up to {R.maxFriends} friends.</p>
          </form>

          <div className={ui.messageWrap} aria-live="polite">
            {message && (
              <p className={ui.message} data-type={message.type} role={message.type === 'error' ? 'alert' : 'status'}>
                <MsgIcon size={16} aria-hidden="true" /> <span>{message.text}</span>
              </p>
            )}
          </div>
        </section>

        <section className={ui.card} aria-labelledby="rf-friends">
          <header className={ui.head}>
            <h2 id="rf-friends" className={ui.subTitle}><Users size={18} aria-hidden="true" /> Your friends</h2>
            <span className={ui.hint}>{friends.length} of {R.maxFriends}</span>
          </header>
          {friends.length === 0 ? (
            <p className={ui.empty}>No friends yet. Add a test friend above to see how verification works.</p>
          ) : (
            <ul className={ui.friends}>
              {friends.map((f) => (
                <li key={f.id} className={ui.friend}>
                  <span className={ui.fAvatar} aria-hidden="true">{f.name.charAt(0).toUpperCase()}</span>
                  <div className={ui.fBody}>
                    <p className={ui.fName}>{f.name}</p>
                    <p className={ui.fMeta}>Joined {formatWhen(f.joinedAt)}</p>
                    <span className={`${ui.chip} ${f.status === 'rewarded' ? ui.chip_done : ui.chip_joined}`}>
                      {f.status === 'rewarded' ? <><CheckCircle2 size={12} aria-hidden="true" /> Verified · +{R.referrerVe} VE paid</> : 'Joined · waiting for first task'}
                    </span>
                  </div>
                  {f.status !== 'rewarded' && (
                    <button type="button" className={`${ui.ghost}`} onClick={() => onComplete(f)} disabled={Boolean(busyId)}>
                      {busyId === f.id ? <Loader2 size={16} className={ui.spin} aria-hidden="true" /> : null} Friend completed a task
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <div className={ui.side}>
        <section className={ui.card} aria-label="Referral summary">
          <header className={ui.head}><h2 className={ui.subTitle}><Users size={18} aria-hidden="true" /> Summary</h2></header>
          <ul className={ui.stats}>
            <li><span>Friends joined</span><strong>{friends.length}</strong></li>
            <li><span>Friends verified</span><strong>{rewarded}</strong></li>
            <li><span>VE earned from referrals</span><strong>+{earned} VE</strong></li>
          </ul>
        </section>

        <section className={ui.card} aria-labelledby="rf-history">
          <header className={ui.head}>
            <h2 id="rf-history" className={ui.subTitle}><History size={18} aria-hidden="true" /> Referral history</h2>
            <span className={ui.hint}>Last {history.length}</span>
          </header>
          {history.length === 0 ? (
            <p className={ui.empty}>Nothing yet. Joined friends and rewards appear here.</p>
          ) : (
            <ul className={ui.hList}>
              {history.map((h) => (
                <li key={h.id} className={ui.hItem}>
                  <span className={ui.hIcon} aria-hidden="true">{h.kind === 'rewarded' ? <CheckCircle2 size={18} /> : <UserPlus size={18} />}</span>
                  <span className={ui.hText}>
                    <span className={ui.hLabel}>{h.kind === 'rewarded' ? `${h.name} verified` : `${h.name} joined`}</span>
                    <span className={ui.hTime}>{formatWhen(h.at)}</span>
                  </span>
                  <span className={ui.hAmt}>{h.ve ? `+${h.ve} VE` : ''}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
