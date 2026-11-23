import styles from './CaptchaFlow.module.css';

export default function TimerRing({ secondsLeft, total }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const frac = Math.max(0, Math.min(1, secondsLeft / total));
  const tone = secondsLeft <= 8 ? 'danger' : secondsLeft <= 15 ? 'warn' : 'ok';

  return (
    <div className={`${styles.timer} ${styles[`t_${tone}`]}`} role="timer" aria-label={`${secondsLeft} seconds left`}>
      <svg viewBox="0 0 64 64" className={styles.timerSvg} aria-hidden="true">
        <circle cx="32" cy="32" r={r} className={styles.timerTrack} />
        <circle
          cx="32" cy="32" r={r}
          className={styles.timerArc}
          strokeDasharray={c}
          strokeDashoffset={c * (1 - frac)}
          transform="rotate(-90 32 32)"
        />
      </svg>
      <span className={styles.timerNum}>{secondsLeft}</span>
    </div>
  );
}
