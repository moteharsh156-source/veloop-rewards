import { useRef } from 'react';
import { Check } from 'lucide-react';
import CtaButton from '../CtaButton/CtaButton';
import CaptchaIllustration from './CaptchaIllustration';
import useCaptcha from '../../hooks/useCaptcha';
import { CAPTCHA_CONFIG } from '../../utils/rewardConfig';
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
        <h2 className={styles.heading}>
          Solve Captchas.<br />
          <span className={styles.accent}>Earn Gems.</span>
        </h2>

        <p className={styles.text}>
          Complete simple captcha tasks accurately and earn eligible Gem rewards.
        </p>

        <CtaButton variant="block" label="START TASK" onClick={startTask} />

        <div className={styles.flow} aria-label="How it works: solve the captcha, get verified, receive gems">
          <span className={styles.tile}>
            <span className={styles.miniCaptcha} aria-hidden="true">K7M4</span>
            <span className={styles.miniBar} aria-hidden="true" />
          </span>
          <span className={styles.dotArrow} aria-hidden="true" />
          <span className={`${styles.tile} ${styles.tileRound} ${status === 'success' ? styles.tileDone : ''}`}>
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