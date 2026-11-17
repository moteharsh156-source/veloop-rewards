import { useEffect, useState } from 'react';
import { Clock, Gem, Target } from 'lucide-react';
import useCountUp from '../../hooks/useCountUp';
import styles from './CaptchaTaskCenter.module.css';

function formatDuration(ms) {
  const totalMin = Math.max(0, Math.floor(ms / 60000));
  const h = Math.floor(totalMin / 60);
  return h > 0 ? `${h}h ${totalMin % 60}m` : `${totalMin}m`;
}

export default function ProgressCard({ ctl }) {
  const { snap } = ctl;
  const gems = useCountUp(snap?.gems ?? 0, 700);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(id);
  }, []);

  if (!snap) {
    return (
      <section className={styles.card} aria-label="Your progress" aria-busy="true">
        <span className={`${styles.skeleton} ${styles.skLine}`} />
        <span className={`${styles.skeleton} ${styles.skBox}`} />
      </section>
    );
  }

  const { completedToday, dailyLimit, gemsPerTask, resetsAt } = snap;
  const remaining = Math.max(0, dailyLimit - completedToday);

  return (
    <section className={styles.card} aria-label="Your progress">
      <div className={styles.balance}>
        <span className={styles.gemIcon} aria-hidden="true"><Gem size={26} /></span>
        <div>
          <p className={styles.balanceLabel}>Gem balance</p>
          <p className={styles.balanceNum} aria-label={`${snap.gems} Gems`}>{gems}</p>
        </div>
      </div>

      <div className={styles.progressHead}>
        <span className={styles.progressTitle}><Target size={15} aria-hidden="true" /> Today&apos;s tasks</span>
        <span className={styles.progressCount}>{completedToday} / {dailyLimit}</span>
      </div>
      <div
        className={styles.segments}
        role="progressbar"
        aria-label="Tasks completed today"
        aria-valuemin={0}
        aria-valuemax={dailyLimit}
        aria-valuenow={completedToday}
      >
        {Array.from({ length: dailyLimit }).map((_, i) => (
          <span key={i} className={i < completedToday ? styles.segOn : styles.segOff} />
        ))}
      </div>

      <ul className={styles.stats}>
        <li><span>Remaining today</span><strong>{remaining}</strong></li>
        <li><span>Reward per task</span><strong>+{gemsPerTask} Gems</strong></li>
        <li><span><Clock size={13} aria-hidden="true" /> Resets in</span><strong>{formatDuration(resetsAt - now)}</strong></li>
      </ul>
    </section>
  );
}
