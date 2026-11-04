import { RefreshCw } from 'lucide-react';
import styles from './SwapCenterBanner.module.css';

// flipped = false: VE on the left, SVE on the right. flipped = true: they trade places.
export default function SwapIllustration({ flipped = false, onSwap }) {
  return (
    <div className={styles.art} data-flipped={flipped}>
      <svg
        viewBox="0 0 420 340"
        role="img"
        aria-label="A VE reward card and an SVE reward card on either side of a reward wallet, with swap arrows between them"
        className={styles.svg}
      >
        <defs><radialGradient id="sGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#5b7bff" stopOpacity=".28"/><stop offset="1" stopColor="#5b7bff" stopOpacity="0"/></radialGradient><radialGradient id="sGold" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fbe6a0"/><stop offset=".55" stopColor="#d9a93c"/><stop offset="1" stopColor="#a87a1c"/></radialGradient></defs>
        <ellipse cx="210" cy="175" rx="205" ry="150" fill="url(#sGlow)"/>
        <ellipse cx="210" cy="318" rx="192" ry="20" fill="none" stroke="#4f6bff" strokeOpacity=".55" strokeWidth="1.5"/>
        <ellipse cx="210" cy="318" rx="140" ry="13" fill="none" stroke="#4f6bff" strokeOpacity=".3" strokeWidth="1.5"/>
        <rect x="150" y="12" width="120" height="316" rx="18" fill="#121743" stroke="#3a4290" strokeWidth="2"/>
        <text x="166" y="40" fontFamily="Manrope,sans-serif" fontWeight="700" fontSize="7" letterSpacing="1" fill="#8e98d8">REWARD WALLET</text>
        <circle cx="252" cy="37" r="1.8" fill="#6a74b8"/><circle cx="258" cy="37" r="1.8" fill="#6a74b8"/><circle cx="264" cy="37" r="1.8" fill="#6a74b8"/>
        <text x="166" y="62" fontFamily="Manrope,sans-serif" fontWeight="600" fontSize="8" fill="#aeb4dc">Eligible Balances</text>
        <circle cx="172" cy="80" r="6" fill="#26307a" stroke="#4f6bff"/><rect x="186" y="77" width="50" height="6" rx="3" fill="#2a3170"/>
        <circle cx="172" cy="104" r="6" fill="#26307a" stroke="#4f6bff"/><rect x="186" y="101" width="50" height="6" rx="3" fill="#2a3170"/>
        <rect x="160" y="238" width="100" height="28" rx="8" fill="#1b2158"/><circle cx="174" cy="252" r="6" fill="#26307a" stroke="#c9a24b"/><rect x="186" y="249" width="36" height="6" rx="3" fill="#3a4290"/><path d="M232 252h22l-5 -5M254 252l-5 5" fill="none" stroke="#8fa2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 0)"/>
        <rect x="160" y="272" width="100" height="28" rx="8" fill="#1b2158"/><circle cx="174" cy="286" r="6" fill="#26307a" stroke="#c9a24b"/><rect x="186" y="283" width="36" height="6" rx="3" fill="#3a4290"/><path d="M254 286h-22l5 -5M232 286l5 5" fill="none" stroke="#8fa2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" transform="translate(0 0)"/>
        <path className={`${styles.flow} ${styles.flowD0}`} d="M8 88l8 7-8 7" fill="none" stroke="#e3b94f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path className={`${styles.flow} ${styles.flowD0}`} d="M412 236l-8 7 8 7" fill="none" stroke="#7f9bff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path className={`${styles.flow} ${styles.flowD1}`} d="M19 88l8 7-8 7" fill="none" stroke="#e3b94f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path className={`${styles.flow} ${styles.flowD1}`} d="M401 236l-8 7 8 7" fill="none" stroke="#7f9bff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path className={`${styles.flow} ${styles.flowD2}`} d="M30 88l8 7-8 7" fill="none" stroke="#e3b94f" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <path className={`${styles.flow} ${styles.flowD2}`} d="M390 236l-8 7 8 7" fill="none" stroke="#7f9bff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        <g className={styles.cardVE}><rect x="20" y="110" width="150" height="100" rx="14" fill="#14122a" stroke="#c9a24b" strokeWidth="2"/>
        <text x="36" y="144" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="24" fill="#f0cb6f">VE</text>
        <text x="36" y="159" fontFamily="Manrope,sans-serif" fontWeight="700" fontSize="6.5" letterSpacing=".6" fill="#b9a56b">REWARD CURRENCY</text>
        <rect x="36" y="176" width="22" height="17" rx="3" fill="#c9a24b" fillOpacity=".8"/>
        <circle cx="140" cy="170" r="20" fill="#1a1830" stroke="#c9a24b" strokeWidth="3"/>
        <path d="M140 160 L143.3 166.7 L150 170 L143.3 173.3 L140 180 L136.7 173.3 L130 170 L136.7 166.7 Z" fill="#f0cb6f"/></g>
        <g className={styles.cardSVE}><rect x="250" y="110" width="150" height="100" rx="14" fill="#1b2a73" stroke="#6f8dff" strokeWidth="2"/>
        <text x="266" y="144" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="24" fill="#dbe6ff">SVE</text>
        <text x="266" y="159" fontFamily="Manrope,sans-serif" fontWeight="700" fontSize="6.5" letterSpacing=".6" fill="#a9c0ff">REWARD CURRENCY</text>
        <rect x="266" y="176" width="22" height="17" rx="3" fill="#8fb0ff" fillOpacity=".8"/>
        <circle cx="370" cy="170" r="20" fill="#16226a" stroke="#8fb0ff" strokeWidth="3"/>
        <path d="M370 160 L373.3 166.7 L380 170 L373.3 173.3 L370 180 L366.7 173.3 L360 170 L366.7 166.7 Z" fill="#dbe6ff"/></g>
        <circle cx="210" cy="160" r="40" fill="none" stroke="#6f8dff" strokeOpacity=".5" strokeWidth="1.5"/>
        <g transform="translate(58 62)"><g className={`${styles.float} ${styles.floatA}`}><circle r="9" fill="url(#sGold)" stroke="#a87a1c"/></g></g>
        <g transform="translate(366 54)"><g className={`${styles.float} ${styles.floatB}`}><circle r="8" fill="#3f58d8" stroke="#8fb0ff"/></g></g>
        <g transform="translate(46 276)"><g className={`${styles.float} ${styles.floatC}`}><circle r="7" fill="url(#sGold)" stroke="#a87a1c"/></g></g>
        <g transform="translate(378 270)"><g className={`${styles.float} ${styles.floatA}`}><circle r="6" fill="#3f58d8" stroke="#8fb0ff"/></g></g>
        <path d="M100 33 L102.3 37.7 L107 40 L102.3 42.3 L100 47 L97.7 42.3 L93 40 L97.7 37.7 Z" fill="#e9e3ff"/>
        <path d="M330 104 L332.0 108.0 L336 110 L332.0 112.0 L330 116 L328.0 112.0 L324 110 L328.0 108.0 Z" fill="#e9e3ff"/>
        <path d="M120 295 L121.7 298.3 L125 300 L121.7 301.7 L120 305 L118.3 301.7 L115 300 L118.3 298.3 Z" fill="#e9e3ff"/>
      </svg>

      <button
        type="button"
        className={styles.swapBtn}
        onClick={onSwap}
        aria-label={flipped ? 'Swap direction: SVE to VE. Press to switch' : 'Swap direction: VE to SVE. Press to switch'}
      >
        <RefreshCw size="52%" className={styles.swapIcon} aria-hidden="true" />
      </button>
    </div>
  );
}