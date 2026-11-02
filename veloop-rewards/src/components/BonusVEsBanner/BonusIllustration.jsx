import styles from './BonusVEsBanner.module.css';

// progress: 0 to 1 (share of bonus activities selected)
export default function BonusIllustration({ progress = 0 }) {
  return (
    <div className={styles.art}>
      <svg
        viewBox="0 0 360 340"
        role="img"
        aria-label="A glowing VE bonus coin with a progress ring, next to a vault full of VE coins"
        className={styles.svg}
      >
        <defs><linearGradient id="bGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f7dc8f"/><stop offset="1" stopColor="#c8962f"/></linearGradient><radialGradient id="bCoin" cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#fbe6a0"/><stop offset=".55" stopColor="#d9a93c"/><stop offset="1" stopColor="#a87a1c"/></radialGradient><radialGradient id="bGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#e3b94f" stopOpacity=".32"/><stop offset="1" stopColor="#e3b94f" stopOpacity="0"/></radialGradient><linearGradient id="bBeam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#f3d27f" stopOpacity=".38"/><stop offset="1" stopColor="#f3d27f" stopOpacity="0"/></linearGradient></defs>
        <ellipse cx="180" cy="288" rx="172" ry="42" fill="url(#bGlow)"/>
        <rect x="212" y="62" width="136" height="196" rx="14" fill="#171c4a" stroke="#3a4290" strokeWidth="2"/>
        <rect x="224" y="74" width="112" height="172" rx="8" fill="#0e1238" stroke="#2a3170"/>
        <circle cx="280" cy="160" r="54" fill="#141944" stroke="#c9a24b" strokeWidth="3"/>
        <circle cx="280" cy="160" r="38" fill="#0c1030" stroke="#8a6f2e" strokeWidth="2"/>
        <path d="M280 122v76M242 160h76M253 133l54 54M307 133l-54 54" stroke="#c9a24b" strokeWidth="3" strokeLinecap="round" fill="none"/>
        <circle cx="280" cy="160" r="9" fill="url(#bGold)"/>
        <circle cx="236" cy="242" r="15" fill="url(#bCoin)" stroke="#a87a1c" strokeWidth="1.5"/><circle cx="236" cy="242" r="10.8" fill="none" stroke="#f7dc8f" strokeOpacity=".6" strokeWidth="1.5"/><text x="236" y="246.5" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="13.5" fill="#7a5a12">VE</text>
        <circle cx="262" cy="250" r="15" fill="url(#bCoin)" stroke="#a87a1c" strokeWidth="1.5"/><circle cx="262" cy="250" r="10.8" fill="none" stroke="#f7dc8f" strokeOpacity=".6" strokeWidth="1.5"/><text x="262" y="254.5" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="13.5" fill="#7a5a12">VE</text>
        <circle cx="302" cy="244" r="15" fill="url(#bCoin)" stroke="#a87a1c" strokeWidth="1.5"/><circle cx="302" cy="244" r="10.8" fill="none" stroke="#f7dc8f" strokeOpacity=".6" strokeWidth="1.5"/><text x="302" y="248.5" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="13.5" fill="#7a5a12">VE</text>
        <ellipse cx="118" cy="292" rx="72" ry="16" fill="#171c4a" stroke="#3a4290"/>
        <ellipse cx="118" cy="284" rx="54" ry="12" fill="#222a66" stroke="#5560c9"/>
        <ellipse cx="118" cy="279" rx="40" ry="8" fill="#e3b94f" fillOpacity=".35"/>
        <polygon points="88,279 148,279 156,150 80,150" fill="url(#bBeam)"/>
        <circle cx="118" cy="78" r="48" fill="#10153a" fillOpacity=".6" stroke="#2a3170" strokeWidth="9"/>
        <circle className={styles.progressArc} cx="118" cy="78" r="48" fill="none" stroke="url(#bGold)" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${progress * 301.6} 301.6`} transform="rotate(-90 118 78)"/>
        <text x="118" y="72" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="700" fontSize="11" letterSpacing="1.5" fill="#e8ebff">BONUS</text>
        <text x="118" y="100" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="30" fill="#f0cb6f">VE</text>
        <circle cx="172" cy="34" r="13" fill="#3a4bd6" stroke="#7f8cff"/><path d="M172 28v12M166 34h12" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/>
        <g transform="translate(118 196)"><g className={`${styles.float} ${styles.floatA}`}><circle cx="0" cy="0" r="40" fill="url(#bCoin)" stroke="#a87a1c" strokeWidth="1.5"/><circle cx="0" cy="0" r="28.8" fill="none" stroke="#f7dc8f" strokeOpacity=".6" strokeWidth="1.5"/><text x="0" y="12.0" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="36.0" fill="#7a5a12">VE</text></g></g>
        <g transform="translate(30 56)"><g className={`${styles.float} ${styles.floatB}`}><circle cx="0" cy="0" r="13" fill="url(#bCoin)" stroke="#a87a1c" strokeWidth="1.5"/><circle cx="0" cy="0" r="9.4" fill="none" stroke="#f7dc8f" strokeOpacity=".6" strokeWidth="1.5"/><text x="0" y="3.9" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="11.7" fill="#7a5a12">VE</text></g></g>
        <g transform="translate(332 34)"><g className={`${styles.float} ${styles.floatC}`}><circle cx="0" cy="0" r="15" fill="url(#bCoin)" stroke="#a87a1c" strokeWidth="1.5"/><circle cx="0" cy="0" r="10.8" fill="none" stroke="#f7dc8f" strokeOpacity=".6" strokeWidth="1.5"/><text x="0" y="4.5" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="13.5" fill="#7a5a12">VE</text></g></g>
        <g transform="translate(30 262)"><g className={`${styles.float} ${styles.floatC}`}><circle cx="0" cy="0" r="12" fill="url(#bCoin)" stroke="#a87a1c" strokeWidth="1.5"/><circle cx="0" cy="0" r="8.6" fill="none" stroke="#f7dc8f" strokeOpacity=".6" strokeWidth="1.5"/><text x="0" y="3.6" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="10.8" fill="#7a5a12">VE</text></g></g>
        <path d="M60 141 l2.7 6.3 l6.3 2.7 l-6.3 2.7 l-2.7 6.3 l-2.7 -6.3 l-6.3 -2.7 l6.3 -2.7 z" fill="#e9e3ff" fillOpacity=".9"/>
        <path d="M196 113 l2.1 4.9 l4.9 2.1 l-4.9 2.1 l-2.1 4.9 l-2.1 -4.9 l-4.9 -2.1 l4.9 -2.1 z" fill="#e9e3ff" fillOpacity=".9"/>
        <path d="M190 224 l1.8 4.2 l4.2 1.8 l-4.2 1.8 l-1.8 4.2 l-1.8 -4.2 l-4.2 -1.8 l4.2 -1.8 z" fill="#e9e3ff" fillOpacity=".9"/>
      </svg>
    </div>
  );
}