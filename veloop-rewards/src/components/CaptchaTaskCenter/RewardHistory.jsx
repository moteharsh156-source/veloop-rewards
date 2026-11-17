import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Clock, History, RotateCcw, XCircle } from 'lucide-react';
import styles from './CaptchaTaskCenter.module.css';

const KIND = {
  success: { Icon: CheckCircle2, label: 'Task completed', tone: styles.hOk },
  failed: { Icon: XCircle, label: 'Task failed', tone: styles.hBad },
  expired: { Icon: Clock, label: 'Task expired', tone: styles.hWarn },
};

function formatWhen(at) {
  const diff = Date.now() - at;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
  return new Date(at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function RewardHistory({ ctl }) {
  const { snap, resetDemo } = ctl;
  const [confirming, setConfirming] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onReset = () => {
    if (!confirming) {
      setConfirming(true);
      timer.current = setTimeout(() => setConfirming(false), 4000);
      return;
    }
    clearTimeout(timer.current);
    setConfirming(false);
    resetDemo();
  };

  const items = snap?.history ?? [];

  return (
    <section className={styles.card} aria-labelledby="history-title">
      <header className={styles.historyHead}>
        <h2 id="history-title" className={styles.historyTitle}><History size={18} aria-hidden="true" /> Reward history</h2>
        <span className={styles.historyHint}>Last {Math.min(items.length, 20) || 0}</span>
      </header>

      {items.length === 0 ? (
        <p className={styles.empty}>No tasks yet. Complete your first captcha to see it here.</p>
      ) : (
        <ul className={styles.historyList}>
          {items.map((item) => {
            const kind = KIND[item.status] || KIND.expired;
            const { Icon } = kind;
            return (
              <li key={item.id} className={styles.historyItem}>
                <span className={`${styles.hIcon} ${kind.tone}`} aria-hidden="true"><Icon size={18} /></span>
                <span className={styles.hText}>
                  <span className={styles.hLabel}>{kind.label}</span>
                  <span className={styles.hTime}>{formatWhen(item.at)}</span>
                </span>
                <span className={`${styles.hGems} ${item.gems > 0 ? styles.hGemsOn : ''}`}>
                  {item.gems > 0 ? `+${item.gems} Gems` : '0 Gems'}
                </span>
              </li>
            );
          })}
        </ul>
      )}

      <button type="button" className={styles.resetBtn} onClick={onReset}>
        <RotateCcw size={14} aria-hidden="true" /> {confirming ? 'Click again to erase everything' : 'Reset all data (testing)'}
      </button>
    </section>
  );
}
