import { Check, RefreshCw } from 'lucide-react';
import CaptchaCanvas from './CaptchaCanvas';
import styles from './CaptchaTasksBanner.module.css';

function Gem({ x, y, s, cls }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className={`${styles.float} ${cls || ''}`}>
        <polygon points="0,-28 24,-10 15,24 -15,24 -24,-10" fill="#8d79e3" />
        <polygon points="0,-28 24,-10 0,-2 -24,-10" fill="#b7a8f5" />
        <polygon points="0,-2 24,-10 15,24 0,24" fill="#6a55c4" />
      </g>
    </g>
  );
}

export default function CaptchaIllustration({
  code, input, status, inputRef, onInput, onVerify, onRefresh,
}) {
  const locked = status === 'success';

  return (
    <div className={styles.art}>
      {/* Laptop + gems (decorative) */}
      <svg viewBox="0 0 520 340" className={styles.svg} aria-hidden="true">
        <defs>
          <pattern id="captchaKeys" width="22" height="13" patternUnits="userSpaceOnUse">
            <rect x="2" y="2" width="18" height="9" rx="3" fill="#323876" />
          </pattern>
          <radialGradient id="captchaGlow" cx="50%" cy="60%" r="50%">
            <stop offset="0" stopColor="#5b4bd0" stopOpacity=".35" />
            <stop offset="1" stopColor="#5b4bd0" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="260" cy="270" rx="250" ry="70" fill="url(#captchaGlow)" />
        <rect x="60" y="270" width="400" height="46" rx="14" fill="#262a5c" stroke="#3d4390" />
        <rect x="190" y="304" width="140" height="4" rx="2" fill="#7b6ee6" />
        <path d="M105 222 H415 L440 270 H80 Z" fill="#20244f" stroke="#3d4390" />
        <path d="M118 230 H402 L418 262 H102 Z" fill="url(#captchaKeys)" />
        <rect x="110" y="18" width="300" height="200" rx="18" fill="#1a1d40" stroke="#5560c9" strokeWidth="2" />
        <Gem x={62} y={196} s={1.25} cls={styles.floatA} />
        <Gem x={468} y={150} s={1.5} cls={styles.floatB} />
        <Gem x={430} y={262} s={1.0} cls={styles.floatC} />
        <Gem x={486} y={60} s={0.6} cls={styles.floatB} />
        <path d="M470 40 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 z" fill="#e9e3ff" />
      </svg>

      {/* Working captcha on the laptop screen */}
      <div className={styles.captchaBox}>
        <CaptchaCanvas code={code} />
      </div>

      <button type="button" className={styles.refreshBtn} onClick={onRefresh} aria-label="Get a new captcha">
        <RefreshCw size="60%" aria-hidden="true" />
      </button>

      <form
        className={styles.answerForm}
        onSubmit={(e) => { e.preventDefault(); onVerify(); }}
        noValidate
      >
        <input
          ref={inputRef}
          className={styles.answerInput}
          data-status={status}
          value={input}
          onChange={(e) => onInput(e.target.value)}
          readOnly={locked}
          maxLength={code.length}
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          aria-label="Type the characters shown in the captcha"
          placeholder="Type code"
        />
        <button type="submit" className={styles.verifyBtn} data-status={status} aria-label="Verify answer">
          <Check size="60%" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}