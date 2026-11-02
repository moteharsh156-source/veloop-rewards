import { useRef } from 'react';
import { ChevronsRight, Check } from 'lucide-react';
import CaptchaIllustration from './CaptchaIllustration';
import useCaptcha from '../../hooks/useCaptcha';
import { CAPTCHA_CONFIG } from '../../utils/rewardConfig';
import styles from './CaptchaTasksBanner.module.css';

function MiniGem() {
  return (
    <svg width="26" height="26" viewBox="-30 -32 60 60" aria-hidden="true">
      <polygon points="0,-28 24,-10 15,24 -15,24 -24,-10" fill="#8d79e3" />
      <polygon points="0,-28 24,-10 0,-2 -24,-10" fill="#b7a8f5" />
    </svg>
  );
}

const MESSAGES = {
  idle: 'Type the characters you see, then press Enter.',
  short: `Enter all ${CAPTCHA_CONFIG.codeLength} characters.`,
  success: `Correct! +${CAPTCHA_CONFIG.gemsPerTask} Gem added (demo value).`,
  error: "That didn't match. Here's a new captcha.",
};

export default function CaptchaTasksBanner() {
  const inputRef = useRef(null);
  const { code, input, setInput, status, gems, refresh, verify } = useCaptcha();

  const startTask = () => {
    refresh();
    inputRef.current?.focus();
  };

  return (
    <section className={styles.card} aria-label="Captcha tasks">
      <div className={styles.content}>
        <span className={styles.tag}>TASK-BASED EARNING</span>
        <h2 className={styles.heading}>
          Solve Captchas.<br />
          <span className={styles.accent}>Earn Gems.</span>
        </h2>

        <p className={styles.text}>
          Complete simple captcha tasks accurately and earn eligible Gem rewards.
        </p>

        <button type="button" className={styles.cta} onClick={startTask}>
          <span className={styles.ctaIcon}>
            <ChevronsRight size={20} className={styles.ctaArrow} aria-hidden="true" />
          </span>
          <span className={styles.ctaLabel}>START TASK</span>
        </button>

        <div className={styles.flow} aria-label="How it works: solve the captcha, get verified, receive gems">
          <span className={`${styles.chip} ${styles.chipCode}`}>K7M4</span>
          <span className={styles.dots} aria-hidden="true">›››</span>
          <span className={`${styles.chip} ${styles.chipRound} ${status === 'success' ? styles.chipDone : ''}`}>
            <Check size={22} aria-hidden="true" />
          </span>
          <span className={styles.dots} aria-hidden="true">›››</span>
          <span className={styles.chip}>
            <MiniGem />
            {gems > 0 && (
              <span key={gems} className={styles.badge} aria-label={`${gems} gems earned`}>{gems}</span>
            )}
          </span>
        </div>

        <p className={styles.status} data-status={status} role="status" aria-live="polite">
          {MESSAGES[status]}
        </p>
      </div>

      <div className={styles.visual}>
        <CaptchaIllustration
          code={code}
          input={input}
          status={status}
          inputRef={inputRef}
          onInput={setInput}
          onVerify={verify}
          onRefresh={refresh}
        />
      </div>
    </section>
  );
}