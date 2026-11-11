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
        <defs><radialGradient id="sGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#5b7bff" stopOpacity=".42"/><stop offset="1" stopColor="#5b7bff" stopOpacity="0"/></radialGradient><radialGradient id="sGoldGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#f0c24f" stopOpacity=".3"/><stop offset="1" stopColor="#f0c24f" stopOpacity="0"/></radialGradient><radialGradient id="sGold" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fbe6a0"/><stop offset=".55" stopColor="#d9a93c"/><stop offset="1" stopColor="#a87a1c"/></radialGradient><linearGradient id="sVE" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#26233f"/><stop offset="1" stopColor="#0a0918"/></linearGradient><linearGradient id="sVERim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f3d27f"/><stop offset="1" stopColor="#8a6a25"/></linearGradient><linearGradient id="sSVE" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3f6bff"/><stop offset="1" stopColor="#14207f"/></linearGradient><linearGradient id="sSVERim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#c0d2ff"/><stop offset="1" stopColor="#4a68e8"/></linearGradient><linearGradient id="sGloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity=".2"/><stop offset="1" stopColor="#ffffff" stopOpacity="0"/></linearGradient><linearGradient id="sPhone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1d2465"/><stop offset="1" stopColor="#0b0f33"/></linearGradient><linearGradient id="sStreakG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#e3b94f" stopOpacity="0"/><stop offset="1" stopColor="#f3d27f"/></linearGradient><linearGradient id="sStreakB" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stopColor="#7f9bff" stopOpacity="0"/><stop offset="1" stopColor="#9db8ff"/></linearGradient><filter id="sBlur"><feGaussianBlur stdDeviation="4"/></filter></defs>
        <ellipse cx="215" cy="172" rx="235" ry="172" fill="url(#sGlow)"/>
        <ellipse cx="40" cy="165" rx="95" ry="75" fill="url(#sGoldGlow)"/>
        <ellipse cx="210" cy="316" rx="196" ry="22" fill="none" stroke="#5b7bff" strokeOpacity="0.7" strokeWidth="2" filter="url(#sBlur)"/>
        <ellipse cx="210" cy="316" rx="196" ry="22" fill="none" stroke="#8fa8ff" strokeOpacity="0.7" strokeWidth="1.2"/>
        <ellipse cx="210" cy="316" rx="150" ry="15" fill="none" stroke="#5b7bff" strokeOpacity="0.45" strokeWidth="2" filter="url(#sBlur)"/>
        <ellipse cx="210" cy="316" rx="150" ry="15" fill="none" stroke="#8fa8ff" strokeOpacity="0.45" strokeWidth="1.2"/>
        <ellipse cx="210" cy="316" rx="104" ry="10" fill="none" stroke="#5b7bff" strokeOpacity="0.3" strokeWidth="2" filter="url(#sBlur)"/>
        <ellipse cx="210" cy="316" rx="104" ry="10" fill="none" stroke="#8fa8ff" strokeOpacity="0.3" strokeWidth="1.2"/>
        <rect x="148" y="8" width="124" height="324" rx="20" fill="url(#sPhone)" stroke="#4f5cd0" strokeWidth="2"/>
        <path d="M168 8 H252" stroke="#9aa6ff" strokeOpacity=".5" strokeWidth="2"/>
        <text x="166" y="38" fontFamily="Manrope,sans-serif" fontWeight="700" fontSize="7" letterSpacing="1" fill="#8e98d8">REWARD WALLET</text>
        <circle cx="252" cy="35" r="1.8" fill="#6a74b8"/><circle cx="258" cy="35" r="1.8" fill="#6a74b8"/><circle cx="264" cy="35" r="1.8" fill="#6a74b8"/>
        <text x="166" y="60" fontFamily="Manrope,sans-serif" fontWeight="600" fontSize="8" fill="#aeb4dc">Eligible Balances</text>
        <circle cx="172" cy="78" r="6" fill="#26307a" stroke="#4f6bff"/><rect x="186" y="75" width="50" height="6" rx="3" fill="#2a3170"/>
        <circle cx="172" cy="102" r="6" fill="#26307a" stroke="#4f6bff"/><rect x="186" y="99" width="50" height="6" rx="3" fill="#2a3170"/>
        <rect x="160" y="236" width="100" height="28" rx="8" fill="#1b2158" stroke="#2f3a85"/><circle cx="174" cy="250" r="6" fill="#26307a" stroke="#c9a24b"/><rect x="186" y="247" width="36" height="6" rx="3" fill="#3a4290"/><path d="M232 250h22M254 250l-5 -5M254 250l-5 5" fill="none" stroke="#8fa2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="160" y="270" width="100" height="28" rx="8" fill="#1b2158" stroke="#2f3a85"/><circle cx="174" cy="284" r="6" fill="#26307a" stroke="#c9a24b"/><rect x="186" y="281" width="36" height="6" rx="3" fill="#3a4290"/><path d="M254 284h-22M232 284l5 -5M232 284l5 5" fill="none" stroke="#8fa2ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <g className={`${styles.flow} ${styles.flowD0}`}><rect x="0" y="68.5" width="96" height="3" rx="1.5" fill="url(#sStreakG)"/><path d="M92 64l8 6-8 6" fill="none" stroke="#f3d27f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></g>
        <g className={`${styles.flow} ${styles.flowD1}`}><rect x="0" y="82.5" width="86" height="3" rx="1.5" fill="url(#sStreakG)"/><path d="M82 78l8 6-8 6" fill="none" stroke="#f3d27f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></g>
        <g className={`${styles.flow} ${styles.flowD2}`}><rect x="0" y="96.5" width="76" height="3" rx="1.5" fill="url(#sStreakG)"/><path d="M72 92l8 6-8 6" fill="none" stroke="#f3d27f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></g>
        <g className={`${styles.flow} ${styles.flowD0}`}><rect x="324" y="244.5" width="96" height="3" rx="1.5" fill="url(#sStreakB)"/><path d="M328 240l-8 6 8 6" fill="none" stroke="#9db8ff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></g>
        <g className={`${styles.flow} ${styles.flowD1}`}><rect x="334" y="258.5" width="86" height="3" rx="1.5" fill="url(#sStreakB)"/><path d="M338 254l-8 6 8 6" fill="none" stroke="#9db8ff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></g>
        <g className={`${styles.flow} ${styles.flowD2}`}><rect x="344" y="272.5" width="76" height="3" rx="1.5" fill="url(#sStreakB)"/><path d="M348 268l-8 6 8 6" fill="none" stroke="#9db8ff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/></g>
        <g className={styles.cardVE}><g transform="translate(95 160) skewY(5) translate(-95 -160)"><rect x="20" y="110" width="150" height="100" rx="14" fill="url(#sVE)" stroke="url(#sVERim)" strokeWidth="2"/><path d="M34 110 H110 L54 210 H34 Q20 210 20 196 V124 Q20 110 34 110 Z" fill="url(#sGloss)"/><path d="M26 198 C60 180 90 206 164 182" fill="none" stroke="#e3b94f" strokeOpacity=".18" strokeWidth="1.2"/><path d="M26 206 C64 188 100 210 164 192" fill="none" stroke="#e3b94f" strokeOpacity=".12" strokeWidth="1.2"/><text x="36" y="144" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="24" fill="#f0cb6f">VE</text><text x="36" y="159" fontFamily="Manrope,sans-serif" fontWeight="700" fontSize="6.5" letterSpacing=".6" fill="#b9a56b">REWARD CURRENCY</text><rect x="36" y="176" width="22" height="17" rx="3" fill="#c9a24b" fillOpacity=".85"/><path d="M36 184.5h22M47 176v17" stroke="#000" strokeOpacity=".25" strokeWidth=".8"/><circle cx="140" cy="170" r="20" fill="#1a1830" stroke="#c9a24b" strokeWidth="3"/><path d="M140 160 L143.3 166.7 L150 170 L143.3 173.3 L140 180 L136.7 173.3 L130 170 L136.7 166.7 Z" fill="#f0cb6f" fillOpacity="1"/></g></g>
        <g className={styles.cardSVE}><g transform="translate(325 160) skewY(-5) translate(-325 -160)"><rect x="250" y="110" width="150" height="100" rx="14" fill="url(#sSVE)" stroke="url(#sSVERim)" strokeWidth="2"/><path d="M264 110 H340 L284 210 H264 Q250 210 250 196 V124 Q250 110 264 110 Z" fill="url(#sGloss)"/><text x="266" y="144" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="24" fill="#e4ecff">SVE</text><text x="266" y="159" fontFamily="Manrope,sans-serif" fontWeight="700" fontSize="6.5" letterSpacing=".6" fill="#b4c8ff">REWARD CURRENCY</text><rect x="266" y="176" width="22" height="17" rx="3" fill="#9db8ff" fillOpacity=".85"/><path d="M266 184.5h22M277 176v17" stroke="#000" strokeOpacity=".25" strokeWidth=".8"/><circle cx="370" cy="170" r="20" fill="#18268a" stroke="#9db8ff" strokeWidth="3"/><path d="M370 160 L373.3 166.7 L380 170 L373.3 173.3 L370 180 L366.7 173.3 L360 170 L366.7 166.7 Z" fill="#e4ecff" fillOpacity="1"/></g></g>
        <circle cx="210" cy="160" r="46" fill="none" stroke="#6f8dff" strokeOpacity=".55" strokeWidth="1.5"/>
        <path d="M210 112 A48 48 0 0 1 258 160" fill="none" stroke="#f0cb6f" strokeWidth="3" strokeLinecap="round" strokeOpacity=".9"/>
        <circle cx="210" cy="160" r="52" fill="#5b7bff" fillOpacity=".25" filter="url(#sBlur)"/>
        <g transform="translate(58 40)"><g className={`${styles.float} ${styles.floatA}`}><circle r="9" fill="url(#sGold)" stroke="#a87a1c"/></g></g>
        <g transform="translate(366 48)"><g className={`${styles.float} ${styles.floatB}`}><circle r="8" fill="#3f58d8" stroke="#9db8ff"/></g></g>
        <g transform="translate(46 282)"><g className={`${styles.float} ${styles.floatC}`}><circle r="7" fill="url(#sGold)" stroke="#a87a1c"/></g></g>
        <g transform="translate(392 214)"><g className={`${styles.float} ${styles.floatA}`}><circle r="6" fill="#3f58d8" stroke="#9db8ff"/></g></g>
        <path d="M100 21 L102.3 25.7 L107 28 L102.3 30.3 L100 35 L97.7 30.3 L93 28 L97.7 25.7 Z" fill="#f4efff" fillOpacity=".95"/>
        <path d="M336 106 L338.0 110.0 L342 112 L338.0 114.0 L336 118 L334.0 114.0 L330 112 L334.0 110.0 Z" fill="#f4efff" fillOpacity=".95"/>
        <path d="M118 299 L119.7 302.3 L123 304 L119.7 305.7 L118 309 L116.3 305.7 L113 304 L116.3 302.3 Z" fill="#f4efff" fillOpacity=".95"/>
        <path d="M300 19 L301.7 22.3 L305 24 L301.7 25.7 L300 29 L298.3 25.7 L295 24 L298.3 22.3 Z" fill="#f4efff" fillOpacity=".95"/>
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