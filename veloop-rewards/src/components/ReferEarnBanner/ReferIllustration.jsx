import { Check, Copy } from 'lucide-react';
import styles from './ReferEarnBanner.module.css';

// code: referral code. earn / friend: reward numbers (animated). copied: shows "Copied!" feedback.
export default function ReferIllustration({ code, earn, friend, copied, onCopy }) {
  return (
    <div className={styles.art}>
      <svg
        viewBox="0 0 520 316"
        role="img"
        aria-label="A phone showing a person with a megaphone and a referral code, with friends walking hand in hand and a stack of coins beside it"
        className={styles.svg}
      >
        <defs><radialGradient id="pGlowB" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#4f7bff" stopOpacity=".42"/><stop offset="1" stopColor="#4f7bff" stopOpacity="0"/></radialGradient><radialGradient id="pGlowP" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#b05cff" stopOpacity=".3"/><stop offset="1" stopColor="#b05cff" stopOpacity="0"/></radialGradient><linearGradient id="pPhone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3a42a8"/><stop offset="1" stopColor="#141a55"/></linearGradient><linearGradient id="pVideo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9a9cf6"/><stop offset="1" stopColor="#6a6ee0"/></linearGradient><radialGradient id="pCoin" cx=".35" cy=".3" r=".85"><stop offset="0" stopColor="#fdeeb8"/><stop offset=".5" stopColor="#e0ae45"/><stop offset="1" stopColor="#a87a1c"/></radialGradient><linearGradient id="pGold" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fbe6a0"/><stop offset="1" stopColor="#c99a2e"/></linearGradient><filter id="pBlur"><feGaussianBlur stdDeviation="5"/></filter></defs>
        <ellipse cx="260" cy="150" rx="255" ry="150" fill="url(#pGlowB)"/>
        <ellipse cx="400" cy="170" rx="140" ry="110" fill="url(#pGlowP)"/>
        <ellipse cx="260" cy="302" rx="244" ry="13" fill="#0c0f33" stroke="#5b6df0" strokeOpacity=".45"/>
        <path d="M150 214 C140 170 150 130 168 96" fill="none" stroke="#6f86ff" strokeOpacity=".45" strokeWidth="2"/>
        <ellipse cx="146" cy="196" rx="7" ry="17" transform="rotate(-60 146 196)" fill="#6f86ff" fillOpacity=".32"/>
        <ellipse cx="160" cy="176" rx="7" ry="17" transform="rotate(40 160 176)" fill="#6f86ff" fillOpacity=".32"/>
        <ellipse cx="144" cy="160" rx="7" ry="17" transform="rotate(-55 144 160)" fill="#6f86ff" fillOpacity=".32"/>
        <ellipse cx="162" cy="140" rx="7" ry="17" transform="rotate(45 162 140)" fill="#6f86ff" fillOpacity=".32"/>
        <ellipse cx="150" cy="122" rx="7" ry="17" transform="rotate(-50 150 122)" fill="#6f86ff" fillOpacity=".32"/>
        <ellipse cx="168" cy="106" rx="7" ry="17" transform="rotate(30 168 106)" fill="#6f86ff" fillOpacity=".32"/>
        <path d="M372 190 C384 150 380 118 364 86" fill="none" stroke="#b362f0" strokeOpacity=".5" strokeWidth="2"/>
        <ellipse cx="384" cy="176" rx="7" ry="17" transform="rotate(55 384 176)" fill="#b362f0" fillOpacity=".3"/>
        <ellipse cx="370" cy="156" rx="7" ry="17" transform="rotate(-40 370 156)" fill="#b362f0" fillOpacity=".3"/>
        <ellipse cx="386" cy="138" rx="7" ry="17" transform="rotate(50 386 138)" fill="#b362f0" fillOpacity=".3"/>
        <ellipse cx="368" cy="118" rx="7" ry="17" transform="rotate(-45 368 118)" fill="#b362f0" fillOpacity=".3"/>
        <ellipse cx="380" cy="100" rx="7" ry="17" transform="rotate(40 380 100)" fill="#b362f0" fillOpacity=".3"/>
        <path d="M472 196 C506 150 490 100 440 84" fill="none" stroke="#8f98f0" strokeOpacity=".55" strokeWidth="1.4" strokeDasharray="4 5"/>
        <circle cx="132" cy="140" r="14" fill="#fff" fillOpacity=".07" stroke="#8f9bff" strokeOpacity=".5"/><path d="M132 148 C122 141 125 133 130 134 C132 134 132 136 132 137 C132 136 133 134 135 134 C140 133 142 141 132 148 Z" fill="#e872b0"/>
        <circle cx="398" cy="128" r="14" fill="#fff" fillOpacity=".07" stroke="#8f9bff" strokeOpacity=".5"/><path d="M392 132 h4 v-8 l5 -4 c3 0 3 3 2 6 h5 c3 0 3 4 1 7 l-2 4 h-15 Z" fill="#8fa8ff"/>
        <circle cx="416" cy="172" r="14" fill="#fff" fillOpacity=".07" stroke="#8f9bff" strokeOpacity=".5"/><circle cx="410" cy="172" r="2.6" fill="#b8a2ff"/><circle cx="422" cy="167" r="2.6" fill="#b8a2ff"/><circle cx="422" cy="177" r="2.6" fill="#b8a2ff"/><path d="M410 172 L422 167 M410 172 L422 177" stroke="#b8a2ff" strokeWidth="1.3"/>
        <rect x="160" y="4" width="200" height="304" rx="28" fill="url(#pPhone)" stroke="#a9b4ff" strokeWidth="2.5"/>
        <rect x="170" y="14" width="180" height="284" rx="20" fill="#0f1342"/>
        <circle cx="192" cy="25" r="3" fill="#8c96ff"/><circle cx="203" cy="25" r="2" fill="#8c96ff" fillOpacity=".6"/><rect x="226" y="22" width="68" height="6" rx="3" fill="#2a3170"/>
        <rect x="180" y="38" width="160" height="108" rx="12" fill="url(#pVideo)"/>
        <path d="M214 146 C214 114 232 98 260 98 C288 98 306 114 306 146 Z" fill="#5a4be0"/>
        <path d="M248 100 L260 128 L272 100 Z" fill="#f4f6ff"/><path d="M258 98 L260 146 L262 98 Z" fill="#8f7cf0"/>
        <path d="M216 118 L190 124" stroke="#5a4be0" strokeWidth="12" strokeLinecap="round"/><circle cx="186" cy="125" r="6.5" fill="#f2b88c"/>
        <path d="M296 112 L330 76" stroke="#5a4be0" strokeWidth="12" strokeLinecap="round"/><circle cx="334" cy="71" r="6.5" fill="#f2b88c"/>
        <rect x="253" y="84" width="14" height="14" rx="5" fill="#f2b88c"/><circle cx="260" cy="76" r="16" fill="#f2b88c"/>
        <path d="M244 74 C244 58 276 58 276 74 C270 66 250 66 244 74 Z" fill="#1c1a3a"/><circle cx="254" cy="78" r="1.6" fill="#1b1b3a"/><circle cx="267" cy="78" r="1.6" fill="#1b1b3a"/><path d="M254 85 Q260 89 266 85" fill="none" stroke="#8a4a3a" strokeWidth="1.6" strokeLinecap="round"/>
        <g className={styles.bob}><path d="M338 66 L364 52 L370 82 L342 80 Z" fill="#eef1ff" stroke="#8f98f0"/><rect x="332" y="64" width="14" height="18" rx="4" fill="#7a6ef6"/><path d="M372 56 q10 6 0 26 M378 52 q16 12 0 34" fill="none" stroke="#fbe6a0" strokeWidth="2.4" strokeLinecap="round"/></g>
        <text x="260" y="162" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="700" fontSize="9.5" fill="#cfd4ff">Your Referral Code</text>
        <rect x="182" y="168" width="156" height="28" rx="9" fill="#1b1672" fillOpacity=".9" stroke="#6a5cf0" strokeOpacity=".7"/>
        <text x="240" y="187.5" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="14.5" letterSpacing=".6" fill="#fff">{copied ? 'Copied!' : code}</text>
        <rect x="182" y="206" width="76" height="42" rx="10" fill="#171b5e" fillOpacity=".95" stroke="#3d4390"/>
        <text x="190" y="219" fontFamily="Manrope,sans-serif" fontWeight="600" fontSize="7.5" fill="#cfd4ff">You earn</text>
        <circle cx="198" cy="236" r="7" fill="url(#pGold)" stroke="#b98a22"/><text x="198" y="239" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="8.5" fill="#7a5a12">V</text>
        <text x="209" y="241" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="15" fill="#fff">{earn}</text><text x="240" y="241" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="7.5" fill="#f0cb6f">VEs</text>
        <rect x="262" y="206" width="76" height="42" rx="10" fill="#171b5e" fillOpacity=".95" stroke="#3d4390"/>
        <text x="270" y="219" fontFamily="Manrope,sans-serif" fontWeight="600" fontSize="7.5" fill="#cfd4ff">Friend gets</text>
        <circle cx="278" cy="236" r="7" fill="url(#pGold)" stroke="#b98a22"/><text x="278" y="239" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="8.5" fill="#7a5a12">V</text>
        <text x="289" y="241" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="15" fill="#fff">{friend}</text><text x="320" y="241" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="7.5" fill="#f0cb6f">VEs</text>
        <circle cx="196" cy="272" r="8" fill="#5a5fd8" stroke="#fff" strokeOpacity=".35"/>
        <circle cx="214" cy="272" r="8" fill="#5a5fd8" stroke="#fff" strokeOpacity=".35"/>
        <circle cx="232" cy="272" r="8" fill="#5a5fd8" stroke="#fff" strokeOpacity=".35"/>
        <path d="M286 275 C277 269 279 262 283 263 C285 263 286 265 286 266 C286 265 287 263 289 263 C293 262 295 269 286 275 Z" fill="#e872b0"/>
        <path d="M43 252 L31 272 L20 290" fill="none" stroke="#2a2f7a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M49 252 L60 268 L58 292" fill="none" stroke="#2a2f7a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <ellipse cx="22" cy="292" rx="6.5" ry="3.2" fill="#15183f"/>
        <ellipse cx="60" cy="294" rx="6.5" ry="3.2" fill="#15183f"/>
        <path d="M35 218 Q46 212 57 218 L55 251 L37 251 Z" fill="#8f9bff"/>
        <path d="M37 222 L26 234 L18 224" fill="none" stroke="#8f9bff" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="18" cy="224" r="3.8" fill="#f2b88c"/>
        <path d="M55 222 L66 234 L72 236" fill="none" stroke="#8f9bff" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="72" cy="236" r="3.8" fill="#f2b88c"/>
        <rect x="43" y="212" width="6" height="7" fill="#f2b88c"/>
        <circle cx="46" cy="206" r="9.5" fill="#f2b88c"/>
        <path d="M36 206 C36 192 56 192 56 206 C51 199 41 199 36 206 Z" fill="#1c1a3a"/>
        <circle cx="42.5" cy="207" r="1.1" fill="#1b1b3a"/><circle cx="49.5" cy="207" r="1.1" fill="#1b1b3a"/>
        
        <path d="M95 248 L92 272 L89 292" fill="none" stroke="#f2b88c" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M101 248 L105 272 L110 292" fill="none" stroke="#f2b88c" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <ellipse cx="91" cy="294" rx="6.5" ry="3.2" fill="#15183f"/>
        <ellipse cx="112" cy="294" rx="6.5" ry="3.2" fill="#15183f"/>
        <path d="M86 246 L110 246 L116 272 L80 272 Z" fill="#5b4bd0"/>
        <path d="M87 218 Q98 212 109 218 L107 251 L89 251 Z" fill="#e872b0"/>
        <path d="M89 222 L78 234 L72 236" fill="none" stroke="#e872b0" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="72" cy="236" r="3.8" fill="#f2b88c"/>
        <path d="M107 222 L113 236 L111 226" fill="none" stroke="#e872b0" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="111" cy="226" r="3.8" fill="#f2b88c"/>
        <rect x="95" y="212" width="6" height="7" fill="#f2b88c"/>
        <circle cx="98" cy="206" r="9.5" fill="#f2b88c"/>
        <path d="M88 206 C88 192 108 192 108 206 C103 199 93 199 88 206 Z" fill="#231a3f"/>
        <path d="M106 200 C118 200 116 216 110 220 C111 210 108 206 106 200 Z" fill="#231a3f"/>
        <circle cx="94.5" cy="207" r="1.1" fill="#1b1b3a"/><circle cx="101.5" cy="207" r="1.1" fill="#1b1b3a"/>
        <rect x="107" y="214" width="7" height="12" rx="1.5" fill="#12153a" stroke="#8f98f0" strokeWidth=".8"/>
        <path d="M407 248 L404 272 L401 292" fill="none" stroke="#f2b88c" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M413 248 L417 272 L422 292" fill="none" stroke="#f2b88c" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
        <ellipse cx="403" cy="294" rx="6.5" ry="3.2" fill="#15183f"/>
        <ellipse cx="424" cy="294" rx="6.5" ry="3.2" fill="#15183f"/>
        <path d="M398 246 L422 246 L428 272 L392 272 Z" fill="#6a52e0"/>
        <path d="M399 218 Q410 212 421 218 L419 251 L401 251 Z" fill="#e872b0"/>
        <path d="M401 222 L392 208 L386 196" fill="none" stroke="#e872b0" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="386" cy="196" r="3.8" fill="#f2b88c"/>
        <path d="M419 222 L428 234 L436 236" fill="none" stroke="#e872b0" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="436" cy="236" r="3.8" fill="#f2b88c"/>
        <rect x="407" y="212" width="6" height="7" fill="#f2b88c"/>
        <circle cx="410" cy="206" r="9.5" fill="#f2b88c"/>
        <path d="M400 206 C400 192 420 192 420 206 C415 199 405 199 400 206 Z" fill="#2a1d3f"/>
        <path d="M418 200 C430 200 428 216 422 220 C423 210 420 206 418 200 Z" fill="#2a1d3f"/>
        <circle cx="406.5" cy="207" r="1.1" fill="#1b1b3a"/><circle cx="413.5" cy="207" r="1.1" fill="#1b1b3a"/>
        <g transform="translate(378 186) rotate(-20)"><path d="M0 0 L16 -7 L18 9 Z" fill="#eef1ff" stroke="#8f98f0"/><rect x="-6" y="0" width="7" height="9" rx="2" fill="#7a6ef6"/></g>
        <path d="M459 252 L447 270 L438 290" fill="none" stroke="#2a2f7a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M465 252 L476 266 L474 292" fill="none" stroke="#2a2f7a" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
        <ellipse cx="440" cy="292" rx="6.5" ry="3.2" fill="#15183f"/>
        <ellipse cx="476" cy="294" rx="6.5" ry="3.2" fill="#15183f"/>
        <path d="M451 218 Q462 212 473 218 L471 251 L453 251 Z" fill="#7d7dee"/>
        <path d="M453 222 L444 234 L436 236" fill="none" stroke="#7d7dee" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="436" cy="236" r="3.8" fill="#f2b88c"/>
        <path d="M471 222 L480 232 L486 228" fill="none" stroke="#7d7dee" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="486" cy="228" r="3.8" fill="#f2b88c"/>
        <rect x="459" y="212" width="6" height="7" fill="#f2b88c"/>
        <circle cx="462" cy="206" r="9.5" fill="#f2b88c"/>
        <path d="M452 206 C452 192 472 192 472 206 C467 199 457 199 452 206 Z" fill="#1c1a3a"/>
        <circle cx="458.5" cy="207" r="1.1" fill="#1b1b3a"/><circle cx="465.5" cy="207" r="1.1" fill="#1b1b3a"/>
        <rect x="482" y="218" width="16" height="14" rx="2" fill="#e872b0"/><rect x="488" y="218" width="4" height="14" fill="#fbe6a0"/><rect x="480" y="215" width="20" height="6" rx="2" fill="#f08fc4"/>
        <ellipse cx="346" cy="301" rx="26" ry="8.5" fill="#8a6414"/><ellipse cx="346" cy="296" rx="26" ry="8.5" fill="url(#pCoin)" stroke="#b98a22"/>
        <ellipse cx="346" cy="294" rx="26" ry="8.5" fill="#8a6414"/><ellipse cx="346" cy="289" rx="26" ry="8.5" fill="url(#pCoin)" stroke="#b98a22"/>
        <ellipse cx="346" cy="287" rx="26" ry="8.5" fill="#8a6414"/><ellipse cx="346" cy="282" rx="26" ry="8.5" fill="url(#pCoin)" stroke="#b98a22"/>
        <ellipse cx="346" cy="280" rx="26" ry="8.5" fill="#8a6414"/><ellipse cx="346" cy="275" rx="26" ry="8.5" fill="url(#pCoin)" stroke="#b98a22"/>
        <ellipse cx="346" cy="273" rx="26" ry="8.5" fill="#8a6414"/><ellipse cx="346" cy="268" rx="26" ry="8.5" fill="url(#pCoin)" stroke="#b98a22"/>
        <ellipse cx="346" cy="268" rx="17" ry="5" fill="none" stroke="#fbe6a0" strokeOpacity=".6"/><text x="346" y="271" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="9" fill="#7a5a12">VE</text>
        <ellipse cx="300" cy="302" rx="16" ry="5" fill="url(#pCoin)" stroke="#b98a22"/><ellipse cx="392" cy="304" rx="14" ry="4.5" fill="url(#pCoin)" stroke="#b98a22"/>
        <path d="M120 38 L122.0 42.0 L126 44 L122.0 46.0 L120 50 L118.0 46.0 L114 44 L118.0 42.0 Z" fill="#f4efff" fillOpacity=".9"/>
        <path d="M430 34 L432.0 38.0 L436 40 L432.0 42.0 L430 46 L428.0 42.0 L424 40 L428.0 38.0 Z" fill="#f4efff" fillOpacity=".9"/>
        <path d="M500 125 L501.7 128.3 L505 130 L501.7 131.7 L500 135 L498.3 131.7 L495 130 L498.3 128.3 Z" fill="#f4efff" fillOpacity=".9"/>
        <path d="M40 115 L41.7 118.3 L45 120 L41.7 121.7 L40 125 L38.3 121.7 L35 120 L38.3 118.3 Z" fill="#f4efff" fillOpacity=".9"/>
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
