import { Check, RefreshCw } from 'lucide-react';
import CaptchaCanvas from './CaptchaCanvas';
import styles from './CaptchaTasksBanner.module.css';

export default function CaptchaIllustration({
  code, input, status, inputRef, onInput, onVerify, onRefresh,
}) {
  const locked = status === 'success';

  return (
    <div className={styles.art}>
      {/* Laptop, platform and gems (decorative) */}
      <svg viewBox="0 0 520 340" className={styles.svg} aria-hidden="true">
        <defs><linearGradient id="cScr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a3079"/><stop offset="1" stopColor="#151947"/></linearGradient><linearGradient id="cRim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b3bdff"/><stop offset="1" stopColor="#4a53c2"/></linearGradient><linearGradient id="cDeck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#434a9e"/><stop offset="1" stopColor="#1e2362"/></linearGradient><linearGradient id="cSlab" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#343b8a"/><stop offset="1" stopColor="#141845"/></linearGradient><linearGradient id="cGlare" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity=".16"/><stop offset="1" stopColor="#ffffff" stopOpacity="0"/></linearGradient><radialGradient id="cGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#7a5cff" stopOpacity=".55"/><stop offset="1" stopColor="#7a5cff" stopOpacity="0"/></radialGradient><linearGradient id="cSwirl" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stopColor="#cbbcff" stopOpacity="0"/><stop offset="1" stopColor="#cbbcff" stopOpacity=".95"/></linearGradient><pattern id="cKeys" width="22" height="13" patternUnits="userSpaceOnUse"><rect x="2" y="2" width="18" height="9" rx="3" fill="#3f46a0"/><rect x="2" y="2" width="18" height="3" rx="1.5" fill="#6a74e8" fillOpacity=".45"/></pattern><filter id="cBlur"><feGaussianBlur stdDeviation="6"/></filter></defs>
        <ellipse cx="270" cy="170" rx="285" ry="200" fill="url(#cGlow)"/>
        <ellipse cx="262" cy="318" rx="225" ry="18" fill="#000" fillOpacity=".55" filter="url(#cBlur)"/>
        <path d="M60 272 L100 250 H420 L460 272 Q502 292 472 306 H48 Q18 292 60 272Z" fill="url(#cSlab)" stroke="#5560c9" strokeOpacity=".55"/>
        <rect x="48" y="304" width="424" height="14" rx="7" fill="#101338" stroke="#3d4390" strokeOpacity=".7"/>
        <rect x="205" y="308" width="110" height="4" rx="2" fill="#8c9aff" filter="url(#cBlur)"/><rect x="215" y="309" width="90" height="3" rx="1.5" fill="#9fabff"/>
        <path d="M100 224 H420 L446 268 H74 Z" fill="url(#cDeck)" stroke="#7a83ea" strokeOpacity=".7"/>
        <path d="M116 232 H404 L420 262 H100 Z" fill="url(#cKeys)"/>
        <path d="M74 268 H446" stroke="#a9b4ff" strokeOpacity=".55" strokeWidth="1.5"/>
        <rect x="110" y="18" width="300" height="200" rx="18" fill="url(#cScr)" stroke="url(#cRim)" strokeWidth="2.5"/>
        <rect x="120" y="28" width="280" height="180" rx="12" fill="#0e1139" stroke="#2f3787"/>
        <path d="M120 44 Q120 28 136 28 H268 L176 208 H136 Q120 208 120 192 Z" fill="url(#cGlare)"/>
        <circle cx="260" cy="23" r="1.8" fill="#8c96ff"/>
        <path d="M446 90 C492 20 540 60 506 128" fill="none" stroke="url(#cSwirl)" strokeWidth="3" strokeLinecap="round"/>
        <path d="M440 110 C486 54 524 84 500 140" fill="none" stroke="url(#cSwirl)" strokeWidth="1.6" strokeLinecap="round" strokeOpacity=".6"/>
        <g transform="translate(62 196) scale(1.25)"><circle r="44" fill="url(#cGlow)" fillOpacity=".9"/><g className={`${styles.float} ${styles.floatA}`}><polygon points="0,-30 26,-14 0,-4 -26,-14" fill="#d3c4ff"/><polygon points="-26,-14 0,-4 -18,20" fill="#9079f0"/><polygon points="26,-14 0,-4 18,20" fill="#6d52d6"/><polygon points="-18,20 0,-4 18,20 0,32" fill="#573fbb"/><polygon points="-9,-21 0,-27 7,-19 -2,-13" fill="#ffffff" fillOpacity=".55"/><path d="M-26 -14 L0 -30 L26 -14 L18 20 L0 32 L-18 20 Z" fill="none" stroke="#e6dcff" strokeOpacity=".5" strokeWidth="1"/></g></g>
        <g transform="translate(468 150) scale(1.5)"><circle r="44" fill="url(#cGlow)" fillOpacity=".9"/><g className={`${styles.float} ${styles.floatB}`}><polygon points="0,-30 26,-14 0,-4 -26,-14" fill="#d3c4ff"/><polygon points="-26,-14 0,-4 -18,20" fill="#9079f0"/><polygon points="26,-14 0,-4 18,20" fill="#6d52d6"/><polygon points="-18,20 0,-4 18,20 0,32" fill="#573fbb"/><polygon points="-9,-21 0,-27 7,-19 -2,-13" fill="#ffffff" fillOpacity=".55"/><path d="M-26 -14 L0 -30 L26 -14 L18 20 L0 32 L-18 20 Z" fill="none" stroke="#e6dcff" strokeOpacity=".5" strokeWidth="1"/></g></g>
        <g transform="translate(432 262) scale(1.0)"><circle r="44" fill="url(#cGlow)" fillOpacity=".9"/><g className={`${styles.float} ${styles.floatC}`}><polygon points="0,-30 26,-14 0,-4 -26,-14" fill="#d3c4ff"/><polygon points="-26,-14 0,-4 -18,20" fill="#9079f0"/><polygon points="26,-14 0,-4 18,20" fill="#6d52d6"/><polygon points="-18,20 0,-4 18,20 0,32" fill="#573fbb"/><polygon points="-9,-21 0,-27 7,-19 -2,-13" fill="#ffffff" fillOpacity=".55"/><path d="M-26 -14 L0 -30 L26 -14 L18 20 L0 32 L-18 20 Z" fill="none" stroke="#e6dcff" strokeOpacity=".5" strokeWidth="1"/></g></g>
        <g transform="translate(490 52) scale(0.55)"><circle r="44" fill="url(#cGlow)" fillOpacity=".9"/><g className={`${styles.float} ${styles.floatB}`}><polygon points="0,-30 26,-14 0,-4 -26,-14" fill="#d3c4ff"/><polygon points="-26,-14 0,-4 -18,20" fill="#9079f0"/><polygon points="26,-14 0,-4 18,20" fill="#6d52d6"/><polygon points="-18,20 0,-4 18,20 0,32" fill="#573fbb"/><polygon points="-9,-21 0,-27 7,-19 -2,-13" fill="#ffffff" fillOpacity=".55"/><path d="M-26 -14 L0 -30 L26 -14 L18 20 L0 32 L-18 20 Z" fill="none" stroke="#e6dcff" strokeOpacity=".5" strokeWidth="1"/></g></g>
        <path d="M470 25 L473.0 31.0 L479 34 L473.0 37.0 L470 43 L467.0 37.0 L461 34 L467.0 31.0 Z" fill="#f4efff" fillOpacity=".95"/>
        <path d="M34 94 L36.0 98.0 L40 100 L36.0 102.0 L34 106 L32.0 102.0 L28 100 L32.0 98.0 Z" fill="#f4efff" fillOpacity=".95"/>
        <path d="M500 209 L502.0 213.0 L506 215 L502.0 217.0 L500 221 L498.0 217.0 L494 215 L498.0 213.0 Z" fill="#f4efff" fillOpacity=".95"/>
        <path d="M120 295 L121.7 298.3 L125 300 L121.7 301.7 L120 305 L118.3 301.7 L115 300 L118.3 298.3 Z" fill="#f4efff" fillOpacity=".95"/>
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