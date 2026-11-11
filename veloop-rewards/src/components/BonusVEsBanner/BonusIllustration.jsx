import styles from './BonusVEsBanner.module.css';

// progress: 0 to 1 (share of bonus activities selected)
export default function BonusIllustration({ progress = 0 }) {
  return (
    <div className={styles.art}>
      <svg
        viewBox="0 0 360 340"
        role="img"
        aria-label="A glowing VE bonus coin with a progress ring, next to an open vault full of VE coins"
        className={styles.svg}
      >
        <defs><linearGradient id="bGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f9e19a"/><stop offset="1" stopColor="#c8962f"/></linearGradient><radialGradient id="bCoin" cx=".35" cy=".3" r=".85"><stop offset="0" stopColor="#fdeeb8"/><stop offset=".5" stopColor="#e0ae45"/><stop offset="1" stopColor="#a87a1c"/></radialGradient><radialGradient id="bGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#f0c24f" stopOpacity=".5"/><stop offset="1" stopColor="#f0c24f" stopOpacity="0"/></radialGradient><radialGradient id="bBlue" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#5b7bff" stopOpacity=".45"/><stop offset="1" stopColor="#5b7bff" stopOpacity="0"/></radialGradient><linearGradient id="bBeam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stopColor="#f6d77a" stopOpacity=".5"/><stop offset="1" stopColor="#f6d77a" stopOpacity="0"/></linearGradient><linearGradient id="bSteel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#7f8cff"/><stop offset="1" stopColor="#262d78"/></linearGradient><linearGradient id="bVault" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2b3382"/><stop offset="1" stopColor="#0f1338"/></linearGradient><filter id="bBlur"><feGaussianBlur stdDeviation="5"/></filter></defs>
        <ellipse cx="200" cy="200" rx="200" ry="150" fill="url(#bGlow)" fillOpacity=".55"/>
        <circle cx="118" cy="78" r="78" fill="url(#bBlue)"/>
        <rect x="206" y="56" width="146" height="206" rx="16" fill="url(#bVault)" stroke="url(#bSteel)" strokeWidth="2.5"/>
        <rect x="220" y="70" width="118" height="178" rx="10" fill="#070920" stroke="#2a3170"/>
        <ellipse cx="276" cy="180" rx="52" ry="66" fill="url(#bGlow)"/>
        <path d="M338 70 L356 80 V250 L338 248 Z" fill="url(#bSteel)" stroke="#9aa6ff" strokeOpacity=".6"/>
        <circle cx="347" cy="165" r="9" fill="none" stroke="#e3b94f" strokeWidth="2.5"/><path d="M347 156v18M338 165h18" stroke="#e3b94f" strokeWidth="2.2" strokeLinecap="round"/>
        <circle cx="246" cy="215.8" r="15" fill="#7d5a12"/><circle cx="246" cy="214" r="15" fill="url(#bCoin)" stroke="#b98a22" strokeWidth="1.5"/><circle cx="246" cy="214" r="10.8" fill="none" stroke="#fbe6a0" strokeOpacity=".65" strokeWidth="1.5"/><text x="246" y="218.5" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="13.5" fill="#7a5a12">VE</text>
        <circle cx="282" cy="227.8" r="15" fill="#7d5a12"/><circle cx="282" cy="226" r="15" fill="url(#bCoin)" stroke="#b98a22" strokeWidth="1.5"/><circle cx="282" cy="226" r="10.8" fill="none" stroke="#fbe6a0" strokeOpacity=".65" strokeWidth="1.5"/><text x="282" y="230.5" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="13.5" fill="#7a5a12">VE</text>
        <circle cx="312" cy="213.8" r="15" fill="#7d5a12"/><circle cx="312" cy="212" r="15" fill="url(#bCoin)" stroke="#b98a22" strokeWidth="1.5"/><circle cx="312" cy="212" r="10.8" fill="none" stroke="#fbe6a0" strokeOpacity=".65" strokeWidth="1.5"/><text x="312" y="216.5" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="13.5" fill="#7a5a12">VE</text>
        <circle cx="262" cy="189.8" r="15" fill="#7d5a12"/><circle cx="262" cy="188" r="15" fill="url(#bCoin)" stroke="#b98a22" strokeWidth="1.5"/><circle cx="262" cy="188" r="10.8" fill="none" stroke="#fbe6a0" strokeOpacity=".65" strokeWidth="1.5"/><text x="262" y="192.5" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="13.5" fill="#7a5a12">VE</text>
        <circle cx="296" cy="197.8" r="15" fill="#7d5a12"/><circle cx="296" cy="196" r="15" fill="url(#bCoin)" stroke="#b98a22" strokeWidth="1.5"/><circle cx="296" cy="196" r="10.8" fill="none" stroke="#fbe6a0" strokeOpacity=".65" strokeWidth="1.5"/><text x="296" y="200.5" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="13.5" fill="#7a5a12">VE</text>
        <circle cx="278" cy="161.8" r="15" fill="#7d5a12"/><circle cx="278" cy="160" r="15" fill="url(#bCoin)" stroke="#b98a22" strokeWidth="1.5"/><circle cx="278" cy="160" r="10.8" fill="none" stroke="#fbe6a0" strokeOpacity=".65" strokeWidth="1.5"/><text x="278" y="164.5" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="13.5" fill="#7a5a12">VE</text>
        <rect x="206" y="236" width="146" height="26" rx="10" fill="url(#bVault)" fillOpacity=".0"/>
        <ellipse cx="118" cy="298" rx="80" ry="17" fill="#101442" stroke="url(#bSteel)" strokeWidth="1.5"/>
        <ellipse cx="118" cy="289" rx="60" ry="13" fill="#1c2262" stroke="#8c98ff" strokeOpacity=".7"/>
        <ellipse cx="118" cy="283" rx="46" ry="9" fill="#f0c24f" fillOpacity=".6"/>
        <ellipse cx="118" cy="283" rx="46" ry="9" fill="#f0c24f" fillOpacity=".5" filter="url(#bBlur)"/>
        <polygon points="84,283 152,283 176,112 60,112" fill="url(#bBeam)"/>
        <path d="M72 236 C58 206 74 182 94 172" fill="none" stroke="url(#bSteel)" strokeWidth="8" strokeLinecap="round"/><path d="M164 236 C178 206 162 182 142 172" fill="none" stroke="url(#bSteel)" strokeWidth="8" strokeLinecap="round"/>
        <circle cx="118" cy="78" r="60" fill="none" stroke="#5b7bff" strokeOpacity=".28" strokeWidth="1.5"/>
        <circle cx="118" cy="78" r="48" fill="#0d1130" fillOpacity=".78" stroke="#2a3170" strokeWidth="9" strokeDasharray="5 3.2"/>
        <circle className={styles.progressArc} cx="118" cy="78" r="48" fill="none" stroke="url(#bGold)" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${progress * 301.6} 301.6`} transform="rotate(-90 118 78)"/>
        <text x="118" y="72" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="700" fontSize="11" letterSpacing="1.5" fill="#e8ebff">BONUS</text>
        <text x="118" y="100" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="30" fill="#f0cb6f">VE</text>
        <circle cx="176" cy="30" r="22" fill="#4f6bff" fillOpacity=".25" filter="url(#bBlur)"/><circle cx="176" cy="30" r="13" fill="#3a4bd6" stroke="#9aa6ff"/><path d="M176 24v12M170 30h12" stroke="#fff" strokeWidth="2.4" strokeLinecap="round"/>
        <path d="M150 56 C158 50 164 44 168 38" fill="none" stroke="#7f9bff" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3"/>
        <path className={`${styles.flow} ${styles.flowD0}`} d="M0 112 C28 112 40 96 66 88" fill="none" stroke="#7f9bff" strokeWidth="2.4" strokeLinecap="round"/>
        <path className={`${styles.flow} ${styles.flowD1}`} d="M0 176 C36 176 46 126 74 106" fill="none" stroke="#7f9bff" strokeWidth="2.4" strokeLinecap="round"/>
        <path className={`${styles.flow} ${styles.flowD2}`} d="M0 240 C44 240 64 176 98 130" fill="none" stroke="#7f9bff" strokeWidth="2.4" strokeLinecap="round"/>
        <g transform="translate(118 198)"><g className={`${styles.float} ${styles.floatA}`}><circle cx="0" cy="4.8" r="40" fill="#7d5a12"/><circle cx="0" cy="0" r="40" fill="url(#bCoin)" stroke="#b98a22" strokeWidth="1.5"/><circle cx="0" cy="0" r="28.8" fill="none" stroke="#fbe6a0" strokeOpacity=".65" strokeWidth="1.5"/><text x="0" y="12.0" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="36.0" fill="#7a5a12">VE</text></g></g>
        <g transform="translate(30 52)"><g className={`${styles.float} ${styles.floatB}`}><circle cx="0" cy="1.6" r="13" fill="#7d5a12"/><circle cx="0" cy="0" r="13" fill="url(#bCoin)" stroke="#b98a22" strokeWidth="1.5"/><circle cx="0" cy="0" r="9.4" fill="none" stroke="#fbe6a0" strokeOpacity=".65" strokeWidth="1.5"/><text x="0" y="3.9" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="11.7" fill="#7a5a12">VE</text></g></g>
        <g transform="translate(334 30)"><g className={`${styles.float} ${styles.floatC}`}><circle cx="0" cy="1.8" r="15" fill="#7d5a12"/><circle cx="0" cy="0" r="15" fill="url(#bCoin)" stroke="#b98a22" strokeWidth="1.5"/><circle cx="0" cy="0" r="10.8" fill="none" stroke="#fbe6a0" strokeOpacity=".65" strokeWidth="1.5"/><text x="0" y="4.5" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="13.5" fill="#7a5a12">VE</text></g></g>
        <g transform="translate(32 268)"><g className={`${styles.float} ${styles.floatC}`}><circle cx="0" cy="1.4" r="12" fill="#7d5a12"/><circle cx="0" cy="0" r="12" fill="url(#bCoin)" stroke="#b98a22" strokeWidth="1.5"/><circle cx="0" cy="0" r="8.6" fill="none" stroke="#fbe6a0" strokeOpacity=".65" strokeWidth="1.5"/><text x="0" y="3.6" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="10.8" fill="#7a5a12">VE</text></g></g>
        <g transform="translate(336 300)"><g className={`${styles.float} ${styles.floatA}`}><circle cx="0" cy="1.7" r="14" fill="#7d5a12"/><circle cx="0" cy="0" r="14" fill="url(#bCoin)" stroke="#b98a22" strokeWidth="1.5"/><circle cx="0" cy="0" r="10.1" fill="none" stroke="#fbe6a0" strokeOpacity=".65" strokeWidth="1.5"/><text x="0" y="4.2" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="12.6" fill="#7a5a12">VE</text></g></g>
        <circle cx="70" cy="140" r="2" fill="#f6d77a" fillOpacity=".9"/>
        <circle cx="176" cy="150" r="2.4" fill="#f6d77a" fillOpacity=".9"/>
        <circle cx="40" cy="200" r="1.8" fill="#f6d77a" fillOpacity=".9"/>
        <circle cx="200" cy="246" r="2" fill="#f6d77a" fillOpacity=".9"/>
        <circle cx="150" cy="60" r="1.8" fill="#f6d77a" fillOpacity=".9"/>
        <circle cx="312" cy="120" r="2" fill="#f6d77a" fillOpacity=".9"/>
        <path d="M60 141 L63.0 147.0 L69 150 L63.0 153.0 L60 159 L57.0 153.0 L51 150 L57.0 147.0 Z" fill="#f4efff" fillOpacity=".95"/>
        <path d="M196 111 L198.3 115.7 L203 118 L198.3 120.3 L196 125 L193.7 120.3 L189 118 L193.7 115.7 Z" fill="#f4efff" fillOpacity=".95"/>
        <path d="M190 230 L192.0 234.0 L196 236 L192.0 238.0 L190 242 L188.0 238.0 L184 236 L188.0 234.0 Z" fill="#f4efff" fillOpacity=".95"/>
        <path d="M312 54 L314.0 58.0 L318 60 L314.0 62.0 L312 66 L310.0 62.0 L306 60 L310.0 58.0 Z" fill="#f4efff" fillOpacity=".95"/>
      </svg>
    </div>
  );
}