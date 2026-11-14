import { Check, Copy } from 'lucide-react';
import styles from './ReferEarnBanner.module.css';

// code: referral code. earn / friend: reward numbers (animated). copied: shows "Copied!" feedback.
export default function ReferIllustration({ code, earn, friend, copied, onCopy }) {
  return (
    <div className={styles.art}>
      <svg
        viewBox="0 0 520 316"
        role="img"
        aria-label="Two friends sharing a gift box, with a referral code above and the rewards each of them earns"
        className={styles.svg}
      >
        <defs><radialGradient id="rGlowB" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#4f7bff" stopOpacity=".45"/><stop offset="1" stopColor="#4f7bff" stopOpacity="0"/></radialGradient><radialGradient id="rGlowP" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#b05cff" stopOpacity=".34"/><stop offset="1" stopColor="#b05cff" stopOpacity="0"/></radialGradient><linearGradient id="rCoinRim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#6fcaff"/><stop offset="1" stopColor="#3b36d8"/></linearGradient><radialGradient id="rCoinFace" cx=".4" cy=".35" r=".8"><stop offset="0" stopColor="#1a2a8a"/><stop offset="1" stopColor="#0a0f3a"/></radialGradient><linearGradient id="rVgrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8fe0ff"/><stop offset="1" stopColor="#8b7cff"/></linearGradient><linearGradient id="rStage" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#5b7bff"/><stop offset=".5" stopColor="#a35cff"/><stop offset="1" stopColor="#e060b8"/></linearGradient><linearGradient id="rGiftBody" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5b4fe6"/><stop offset="1" stopColor="#32299f"/></linearGradient><linearGradient id="rGiftLid" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7a6ef6"/><stop offset="1" stopColor="#4a3fd0"/></linearGradient><linearGradient id="rGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fbe6a0"/><stop offset="1" stopColor="#c99a2e"/></linearGradient><linearGradient id="rHoodie" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5a74f6"/><stop offset="1" stopColor="#2a37b4"/></linearGradient><linearGradient id="rTop" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#a66cf6"/><stop offset="1" stopColor="#6a3acb"/></linearGradient><linearGradient id="rPanelC" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5646d6" stopOpacity=".7"/><stop offset="1" stopColor="#2a2190" stopOpacity=".7"/></linearGradient><filter id="rBlur"><feGaussianBlur stdDeviation="5"/></filter></defs>
        <ellipse cx="260" cy="150" rx="250" ry="150" fill="url(#rGlowB)"/>
        <ellipse cx="380" cy="190" rx="150" ry="110" fill="url(#rGlowP)"/>
        <ellipse cx="260" cy="288" rx="226" ry="26" fill="#150f3c" stroke="url(#rStage)" strokeWidth="3" filter="url(#rBlur)"/>
        <ellipse cx="260" cy="288" rx="226" ry="26" fill="#150f3c" stroke="url(#rStage)" strokeWidth="2.5"/>
        <ellipse cx="260" cy="288" rx="170" ry="19" fill="none" stroke="url(#rStage)" strokeWidth="1.8" strokeOpacity=".7"/>
        <g transform="translate(52 44)"><g className={`${styles.float} ${styles.floatA}`}><circle r="28" fill="url(#rGlowB)"/><circle r="22" fill="url(#rCoinRim)"/><circle r="17.2" fill="url(#rCoinFace)" stroke="#9fd2ff" strokeOpacity=".45"/><path d="M-7.0 -6.6 L0 8.4 L7.0 -6.6" fill="none" stroke="url(#rVgrad)" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round"/></g></g>
        <g transform="translate(472 58)"><g className={`${styles.float} ${styles.floatB}`}><circle r="30" fill="url(#rGlowB)"/><circle r="24" fill="url(#rCoinRim)"/><circle r="18.7" fill="url(#rCoinFace)" stroke="#9fd2ff" strokeOpacity=".45"/><path d="M-7.7 -7.2 L0 9.1 L7.7 -7.2" fill="none" stroke="url(#rVgrad)" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round"/></g></g>
        <rect x="96.5" y="16.5" width="7" height="7" transform="rotate(45 100 20)" fill="#35c7e8" fillOpacity=".9"/>
        <rect x="432.0" y="18.0" width="8" height="8" transform="rotate(45 436 22)" fill="#b362f0" fillOpacity=".9"/>
        <rect x="27.0" y="97.0" width="6" height="6" transform="rotate(45 30 100)" fill="#6f86ff" fillOpacity=".9"/>
        <rect x="488.5" y="116.5" width="7" height="7" transform="rotate(45 492 120)" fill="#e060b8" fillOpacity=".9"/>
        <rect x="21.5" y="187.5" width="5" height="5" transform="rotate(45 24 190)" fill="#b362f0" fillOpacity=".9"/>
        <rect x="495.0" y="211.0" width="6" height="6" transform="rotate(45 498 214)" fill="#35c7e8" fillOpacity=".9"/>
        <rect x="137.0" y="297.0" width="6" height="6" transform="rotate(45 140 300)" fill="#6f86ff" fillOpacity=".9"/>
        <path d="M120 262 C118 186 140 156 170 152 C200 156 222 186 220 262 Z" fill="url(#rHoodie)"/>
        <path d="M148 154 C156 170 184 170 192 154" fill="none" stroke="#fff" strokeOpacity=".25" strokeWidth="4" strokeLinecap="round"/>
        <rect x="162" y="136" width="16" height="20" rx="6" fill="#dd9c72"/>
        <circle cx="170" cy="116" r="24" fill="#f2b88c"/><circle cx="146" cy="118" r="4.5" fill="#e8a67c"/><circle cx="194" cy="118" r="4.5" fill="#e8a67c"/>
        <path d="M145 114 C142 88 160 82 173 83 C192 84 200 98 195 114 C190 103 182 98 170 100 C158 102 150 106 145 114 Z" fill="#1c1a3a"/>
        <circle cx="161" cy="118" r="2.4" fill="#1b1b3a"/><circle cx="180" cy="118" r="2.4" fill="#1b1b3a"/><path d="M161 128 Q171 136 181 128" fill="none" stroke="#8a4a3a" strokeWidth="2" strokeLinecap="round"/>
        <path d="M204 176 L238 152" stroke="#4a63f0" strokeWidth="16" strokeLinecap="round"/><circle cx="244" cy="148" r="7" fill="#f2b88c"/>
        <path d="M134 188 L150 224" stroke="#3d52e6" strokeWidth="15" strokeLinecap="round"/><circle cx="154" cy="226" r="7" fill="#f2b88c"/>
        <g transform="rotate(12 160 212)"><rect x="150" y="194" width="20" height="36" rx="4" fill="#12153a" stroke="#6a74e8"/><rect x="153" y="198" width="14" height="26" rx="2" fill="#5fc2ff" fillOpacity=".55"/></g>
        <path d="M322 126 C318 96 336 82 352 82 C374 82 388 98 382 134 L386 196 C372 202 330 202 318 196 Z" fill="#231a3f"/>
        <path d="M304 262 C304 190 324 162 350 158 C376 162 398 190 398 262 Z" fill="url(#rTop)"/>
        <rect x="342" y="140" width="16" height="20" rx="6" fill="#dd9c72"/>
        <circle cx="350" cy="124" r="22" fill="#f2b88c"/>
        <path d="M326 120 C330 98 348 92 360 96 C374 100 378 114 375 124 C367 110 346 108 326 120 Z" fill="#231a3f"/>
        <circle cx="343" cy="127" r="2.3" fill="#1b1b3a"/><circle cx="359" cy="127" r="2.3" fill="#1b1b3a"/><path d="M343 136 Q351 143 359 136" fill="none" stroke="#8a4a3a" strokeWidth="2" strokeLinecap="round"/>
        <path d="M392 190 L380 214" stroke="#8a52e6" strokeWidth="15" strokeLinecap="round"/><circle cx="378" cy="218" r="7" fill="#f2b88c"/>
        <g transform="rotate(-12 382 214)"><rect x="372" y="196" width="20" height="36" rx="4" fill="#12153a" stroke="#6a74e8"/><rect x="375" y="200" width="14" height="26" rx="2" fill="#c78bff" fillOpacity=".55"/></g>
        <g className={styles.bob}>
        <rect x="224" y="130" width="72" height="56" rx="4" fill="url(#rGiftBody)"/>
        <rect x="216" y="112" width="88" height="22" rx="5" fill="url(#rGiftLid)"/>
        <rect x="252" y="112" width="16" height="74" fill="url(#rGold)"/>
        <path d="M260 112 C236 82 212 96 226 112 C236 124 254 120 260 112 Z" fill="url(#rGold)" stroke="#b98a22" strokeWidth="1"/><path d="M260 112 C284 82 308 96 294 112 C284 124 266 120 260 112 Z" fill="url(#rGold)" stroke="#b98a22" strokeWidth="1"/><circle cx="260" cy="112" r="8" fill="url(#rGold)" stroke="#b98a22"/>
        </g>
        <rect x="146" y="6" width="228" height="66" rx="14" fill="url(#rPanelC)" stroke="#8f98f0" strokeOpacity=".5"/>
        <text x="260" y="25" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="700" fontSize="10.5" fill="#e8ebff">Your Referral Code</text>
        <rect x="160" y="33" width="200" height="32" rx="10" fill="#150f5c" fillOpacity=".85" stroke="#6a5cf0" strokeOpacity=".6"/>
        <text x="236" y="56" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="19" letterSpacing="1" fill="#fff">{copied ? 'Copied!' : code}</text>
        <rect x="160" y="198" width="200" height="58" rx="14" fill="#0f1240" fillOpacity=".92" stroke="#3d4390"/>
        <path d="M260 208 V246" stroke="#3d4390"/>
        <text x="176" y="214" fontFamily="Manrope,sans-serif" fontWeight="600" fontSize="9.5" fill="#cfd4ff">You Earn</text>
        <text x="276" y="214" fontFamily="Manrope,sans-serif" fontWeight="600" fontSize="9.5" fill="#cfd4ff">Your Friend Gets</text>
        <circle cx="186" cy="233" r="8.5" fill="url(#rGold)" stroke="#b98a22"/><text x="186" y="236.5" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="10" fill="#7a5a12">V</text>
        <circle cx="286" cy="233" r="8.5" fill="url(#rGold)" stroke="#b98a22"/><text x="286" y="236.5" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="10" fill="#7a5a12">V</text>
        <text x="199" y="240" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="19" fill="#fff">{earn}</text><text x="240" y="240" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="10.5" fill="#f0cb6f">VEs</text>
        <text x="299" y="240" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="19" fill="#fff">{friend}</text><text x="340" y="240" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="10.5" fill="#f0cb6f">VEs</text>
        <rect x="186" y="262" width="148" height="26" rx="13" fill="#0f1240" fillOpacity=".92" stroke="#4a56c9" strokeOpacity=".7"/>
        <circle cx="203" cy="273" r="3.2" fill="#8fa2ff"/><circle cx="211" cy="273" r="3.2" fill="#8fa2ff"/><path d="M198 283 q5 -7 10 0 M206 283 q5 -7 10 0" fill="none" stroke="#8fa2ff" strokeWidth="1.5"/>
        <text x="286" y="279.5" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="700" fontSize="9" fill="#e8ebff">More Friends, More Rewards!</text>
        <g transform="rotate(-8 45 151)"><rect x="22" y="128" width="46" height="46" rx="12" fill="#3a3fd0" fillOpacity=".85" stroke="#8f9bff"/><circle cx="40" cy="146" r="5" fill="none" stroke="#fff" strokeWidth="1.8"/><path d="M31 160 q9 -10 18 0" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/><path d="M54 142 v10 M49 147 h10" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/></g>
        <g transform="rotate(10 469 199)"><rect x="446" y="176" width="46" height="46" rx="12" fill="#3a5ae8" fillOpacity=".9" stroke="#9db8ff"/><path d="M458 208 q2 -14 18 -14 v-6 l12 11 -12 11 v-6 q-12 -1 -18 4 Z" fill="#fff" fillOpacity=".95"/></g>
        <g transform="translate(58 246)"><g className={`${styles.float} ${styles.floatC}`}><circle r="32" fill="url(#rGlowB)"/><circle r="26" fill="url(#rCoinRim)"/><circle r="20.3" fill="url(#rCoinFace)" stroke="#9fd2ff" strokeOpacity=".45"/><path d="M-8.3 -7.8 L0 9.9 L8.3 -7.8" fill="none" stroke="url(#rVgrad)" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round"/></g></g>
        <g transform="translate(470 256)"><g className={`${styles.float} ${styles.floatA}`}><circle r="30" fill="url(#rGlowB)"/><circle r="24" fill="url(#rCoinRim)"/><circle r="18.7" fill="url(#rCoinFace)" stroke="#9fd2ff" strokeOpacity=".45"/><path d="M-7.7 -7.2 L0 9.1 L7.7 -7.2" fill="none" stroke="url(#rVgrad)" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round"/></g></g>
        <path d="M120 54 L122.0 58.0 L126 60 L122.0 62.0 L120 66 L118.0 62.0 L114 60 L118.0 58.0 Z" fill="#f4efff" fillOpacity=".95"/>
        <path d="M404 24 L406.0 28.0 L410 30 L406.0 32.0 L404 36 L402.0 32.0 L398 30 L402.0 28.0 Z" fill="#f4efff" fillOpacity=".95"/>
        <path d="M500 145 L501.7 148.3 L505 150 L501.7 151.7 L500 155 L498.3 151.7 L495 150 L498.3 148.3 Z" fill="#f4efff" fillOpacity=".95"/>
      </svg>

      <button
        type="button"
        className={styles.copyBtn}
        onClick={onCopy}
        aria-label={copied ? 'Referral code copied' : 'Copy referral code'}
      >
        {copied ? <Check size="62%" aria-hidden="true" /> : <Copy size="62%" aria-hidden="true" />}
      </button>
    </div>
  );
}