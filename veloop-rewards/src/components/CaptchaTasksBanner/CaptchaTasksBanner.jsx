import { Check } from 'lucide-react';
import CtaButton from '../CtaButton/CtaButton';
import CaptchaIllustration from './CaptchaIllustration';
import styles from './CaptchaTasksBanner.module.css';

function MiniGem() {
  return (
    <svg width="30" height="30" viewBox="-30 -32 60 64" aria-hidden="true">
      <polygon points="0,-30 26,-14 0,-4 -26,-14" fill="#d3c4ff" />
      <polygon points="-26,-14 0,-4 -18,20" fill="#9079f0" />
      <polygon points="26,-14 0,-4 18,20" fill="#6d52d6" />
      <polygon points="-18,20 0,-4 18,20 0,32" fill="#573fbb" />
    </svg>
  );
}

/**
 * ctl: the task controller from useCaptchaTask (balance, progress, phase).
 * onStart: scrolls to the Task Center and starts a task.
 */
export default function CaptchaTasksBanner({ ctl, onStart }) {
  const snap = ctl?.snap;
  const gems = snap?.gems ?? 0;
  const done = snap?.completedToday ?? 0;
  const limit = snap?.dailyLimit ?? 10;
  const phase = ctl?.phase;
  const running = phase === 'active' || phase === 'verifying';

  return (
    <section className={styles.card} aria-label="Captcha tasks">
      <div className={styles.content}>
        <h2 className={styles.heading}>
          Solve Captchas.<br />
          <span className={styles.accent}>Earn Gems.</span>
        </h2>

        <p className={styles.text}>
          Complete simple captcha tasks accurately and earn eligible Gem rewards.
        </p>

        <CtaButton variant="block" label={running ? 'CONTINUE TASK' : 'START TASK'} onClick={onStart} />

        <div className={styles.flow} aria-label="How it works: solve the captcha, get verified, receive gems">
          <span className={styles.tile}>
            <span className={styles.miniCaptcha} aria-hidden="true">K7M4</span>
            <span className={styles.miniBar} aria-hidden="true" />
          </span>
          <span className={styles.dotArrow} aria-hidden="true" />
          <span className={`${styles.tile} ${styles.tileRound} ${phase === 'success' ? styles.tileDone : ''}`}>
            <Check size={24} aria-hidden="true" />
          </span>
          <span className={styles.dotArrow} aria-hidden="true" />
          <span className={styles.tile}>
            <MiniGem />
            {gems > 0 && (
              <span key={gems} className={styles.badge} aria-label={`${gems} gems earned`}>{gems}</span>
            )}
          </span>
        </div>

        <p className={styles.status}>
          Today: {done}/{limit} tasks · {gems} Gems earned
        </p>
      </div>

      <div className={styles.visual}>
        <CaptchaIllustration />
      </div>
    </section>
  );
}
