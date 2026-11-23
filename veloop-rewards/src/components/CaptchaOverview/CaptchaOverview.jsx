import { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Clock, Gem, History, MousePointerClick, RotateCcw, ShieldCheck, Target, XCircle } from 'lucide-react';
import useCountUp from '../../hooks/useCountUp';
import { resetAllData } from '../../services/captchaApi';
import { formatDuration, formatWhen } from '../../utils/format';
import styles from './CaptchaOverview.module.css';

const HOW = [
  { n: 1, Icon: MousePointerClick, title: 'Solve', text: 'Pick the right tiles in a quick visual challenge. Every task gives you a short timer.' },
  { n: 2, Icon: ShieldCheck, title: 'Verify', text: 'A dedicated verification step checks your selection, the time and your attempts.' },
  { n: 3, Icon: Gem, title: 'Reward', text: 'Only a verified answer pays out. Gems go to your wallet and show on every page.' },
];

export function HowItWorks() {
  return (
    <section aria-labelledby="how-title">
      <h2 id="how-title" className={styles.sectionTitle}>How it works</h2>
      <ol className={styles.how}>
        {HOW.map(({ n, Icon, title, text }, i) => (
          <li key={title} className={styles.howCard} style={{ '--i': i }}>
            <span className={styles.howNum}>{n}</span>
            <span className={styles.howIcon} aria-hidden="true"><Icon size={26} /></span>
            <h3 className={styles.howTitle}>{title}</h3>
            <p className={styles.howText}>{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function StatsCard({ stats }) {
  const gems = useCountUp(stats.gems, 700);
  const remaining = Math.max(0, stats.dailyLimit - stats.completedToday);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.card} aria-label="Your captcha progress">
      <div className={styles.balance}>
        <span className={styles.gemIcon} aria-hidden="true"><Gem size={28} /></span>
        <div>
          <p className={styles.balanceLabel}>Gem balance</p>
          <p className={styles.balanceNum} aria-label={`${stats.gems} Gems`}>{gems.toLocaleString()}</p>
        </div>
      </div>

      <div className={styles.progressHead}>
        <span><Target size={15} aria-hidden="true" /> Today&apos;s tasks</span>
        <strong>{stats.completedToday} / {stats.dailyLimit}</strong>
      </div>
      <div className={styles.segments} role="progressbar" aria-label="Tasks completed today" aria-valuemin={0} aria-valuemax={stats.dailyLimit} aria-valuenow={stats.completedToday}>
        {Array.from({ length: stats.dailyLimit }).map((_, i) => (
          <span key={i} className={i < stats.completedToday ? styles.segOn : styles.segOff} />
        ))}
      </div>

      <ul className={styles.stats}>
        <li><span>Tasks left today</span><strong>{remaining}</strong></li>
        <li><span>Reward per task</span><strong>+{stats.gemsPerTask} Gems</strong></li>
        <li><span>Time per task</span><strong>{stats.ttlSeconds}s</strong></li>
        <li><span><Clock size={13} aria-hidden="true" /> Daily reset in</span><strong>{formatDuration(stats.resetsAt - now)}</strong></li>
      </ul>
    </section>
  );
}

const KIND = {
  success: { Icon: CheckCircle2, label: 'Task completed', tone: styles.hOk },
  failed: { Icon: XCircle, label: 'Task failed', tone: styles.hBad },
  expired: { Icon: Clock, label: 'Task expired', tone: styles.hWarn },
};

export function HistoryCard({ stats }) {
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
    resetAllData();
  };

  const items = stats.history;
  return (
    <section className={styles.card} aria-labelledby="hist-title">
      <header className={styles.histHead}>
        <h2 id="hist-title" className={styles.histTitle}><History size={18} aria-hidden="true" /> Reward history</h2>
        <span className={styles.hint}>Last {items.length}</span>
      </header>

      {items.length === 0 ? (
        <p className={styles.empty}>No tasks yet. Finish your first challenge and it will appear here.</p>
      ) : (
        <ul className={styles.histList}>
          {items.map((item) => {
            const kind = KIND[item.status] || KIND.expired;
            const { Icon } = kind;
            return (
              <li key={item.id} className={styles.histItem}>
                <span className={`${styles.hIcon} ${kind.tone}`} aria-hidden="true"><Icon size={18} /></span>
                <span className={styles.hText}>
                  <span className={styles.hLabel}>{kind.label}</span>
                  <span className={styles.hTime}>{formatWhen(item.at)}</span>
                </span>
                <span className={`${styles.hGems} ${item.gems > 0 ? styles.hGemsOn : ''}`}>{item.gems > 0 ? `+${item.gems} Gems` : '0 Gems'}</span>
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
