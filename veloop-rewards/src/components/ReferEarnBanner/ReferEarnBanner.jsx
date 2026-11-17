import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Gift, Users, X } from 'lucide-react';
import ReferIllustration from './ReferIllustration';
import useCountUp from '../../hooks/useCountUp';
import { useStore } from '../../services/rewardsStore';
import { ECONOMY } from '../../services/economy';
import { REFER_FEATURES, REFER_STEPS } from '../../utils/referData';
import styles from './ReferEarnBanner.module.css';

const R = ECONOMY.referral;

export default function ReferEarnBanner({ onInvite }) {
  const referral = useStore((s) => s.referral);
  const code = referral.code;
  const joined = referral.friends.length;
  const verified = referral.friends.filter((f) => f.status === 'rewarded').length;
  const [copied, setCopied] = useState(false);
  const [message, setMessage] = useState('idle');
  const [started, setStarted] = useState(false);
  const timer = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    setStarted(true); // starts the reward counters
    return () => clearTimeout(timer.current);
  }, []);

  const earn = useCountUp(started ? R.referrerVe : 0, 900);
  const friend = useCountUp(started ? R.friendVe : 0, 900);

  const copyCode = async () => {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setMessage('copied');
    } catch {
      setMessage('manual');
    }
    timer.current = setTimeout(() => {
      setCopied(false);
      setMessage('idle');
    }, 1800);
  };

  const openHow = () => dialogRef.current?.showModal();
  const closeHow = () => dialogRef.current?.close();

  return (
    <section className={styles.card} aria-label="Refer and Earn">
      <div className={styles.hero}>
        <div className={styles.content}>
          <span className={styles.badge}><Users size={16} aria-hidden="true" /> REFER &amp; EARN</span>

          <h2 className={styles.heading}>
            Refer Friends,<br />
            <span className={styles.accent}>Earn Rewards</span>
          </h2>

          <p className={styles.text}>
            Invite your friends to VELOOP Rewards and earn exciting rewards together.
          </p>

          <div className={styles.actions}>
            <button type="button" className={styles.invite} onClick={onInvite}>
              Invite Now <ArrowRight size={18} className={styles.inviteArrow} aria-hidden="true" />
            </button>
            <button type="button" className={styles.how} onClick={openHow}>
              <Gift size={18} aria-hidden="true" /> How It Works
            </button>
          </div>

          <p className={styles.status} role="status" aria-live="polite">
            {message === 'copied'
              ? 'Referral code copied to your clipboard.'
              : message === 'manual'
                ? `Could not copy automatically. Your code is ${code}.`
                : `${joined} ${joined === 1 ? 'friend' : 'friends'} joined · ${verified} verified`}
          </p>
        </div>

        <div className={styles.visual}>
          <ReferIllustration
            code={code}
            earn={earn}
            friend={friend}
            copied={copied}
            onCopy={copyCode}
          />
        </div>
      </div>

      <ul className={styles.features}>
        {REFER_FEATURES.map(({ id, title, text, icon: Icon, tone }) => (
          <li key={id} className={styles.feature}>
            <span className={`${styles.fIcon} ${styles[tone]}`}><Icon size={20} aria-hidden="true" /></span>
            <span className={styles.fText}>
              <span className={styles.fTitle}>{title}</span>
              <span className={styles.fDesc}>{text}</span>
            </span>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-labelledby="how-title"
        onClick={(e) => { if (e.target === dialogRef.current) closeHow(); }}
      >
        <div className={styles.dialogBody}>
          <div className={styles.dialogHead}>
            <h3 id="how-title" className={styles.dialogTitle}>How it works</h3>
            <button type="button" className={styles.dialogClose} onClick={closeHow} aria-label="Close">
              <X size={18} aria-hidden="true" />
            </button>
          </div>
          <ol className={styles.steps}>
            {REFER_STEPS.map((step) => <li key={step}>{step}</li>)}
          </ol>
          <p className={styles.dialogNote}>Reward amounts shown on this banner are demo values, not official.</p>
          <button type="button" className={styles.dialogOk} onClick={closeHow}>Got it</button>
        </div>
      </dialog>
    </section>
  );
}
