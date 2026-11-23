import { Check, Grid3x3 } from 'lucide-react';
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

/** stats: live numbers from useCaptchaStats. onStart: opens the Captcha page. */
export default function CaptchaTasksBanner({ stats, onStart }) {
  const gems = stats?.gems ?? 0;
  const done = stats?.completedToday ?? 0;
  const limit = stats?.dailyLimit ?? 10;

  return (
    <section className={styles.card} aria-label="Captcha tasks">
      <div className={styles.content}>
        <h2 className={styles.heading}>
          Solve Captchas.<br />
          <span className={styles.accent}>Earn Gems.</span>
        </h2>

        <p className={styles.text}>
          Pick the right images in a quick visual challenge and earn eligible Gem rewards.
        </p>

        <CtaButton variant="block" label="START TASK" onClick={onStart} />

        <div className={styles.flow} aria-label="How it works: solve the challenge, get verified, receive gems">
          <span className={styles.tile}><Grid3x3 size={24} aria-hidden="true" /></span>
          <span className={styles.dotArrow} aria-hidden="true" />
          <span className={`${styles.tile} ${styles.tileRound}`}><Check size={24} aria-hidden="true" /></span>
          <span className={styles.dotArrow} aria-hidden="true" />
          <span className={styles.tile}>
            <MiniGem />
            {gems > 0 && <span key={gems} className={styles.badge} aria-label={`${gems} gems earned`}>{gems}</span>}
          </span>
        </div>

        <p className={styles.status}>Today: {done}/{limit} tasks · {gems} Gems earned</p>
      </div>

      <div className={styles.visual}>
        <CaptchaIllustration />
      </div>
    </section>
  );
}
