import { RefreshCw } from 'lucide-react';
import styles from './ExchangeCenterBanner.module.css';

// gems / ve: balances shown on the two cards. converting: plays the gem-flow animation.
export default function ExchangeIllustration({ gems, ve, converting, onConvert }) {
  return (
    <div className={styles.art} data-converting={converting}>
      <svg
        viewBox="0 0 560 340"
        role="img"
        aria-label="A Gem card on the left and a VE card on the right with a convert button between them"
        className={styles.svg}
      >
        <defs><radialGradient id="xPurple" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#8a5cff" stopOpacity=".42"/><stop offset="1" stopColor="#8a5cff" stopOpacity="0"/></radialGradient><radialGradient id="xGold" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#f0c24f" stopOpacity=".42"/><stop offset="1" stopColor="#f0c24f" stopOpacity="0"/></radialGradient><radialGradient id="xGemGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stopColor="#8a6bff" stopOpacity=".5"/><stop offset="1" stopColor="#8a6bff" stopOpacity="0"/></radialGradient><radialGradient id="xCoin" cx=".35" cy=".3" r=".85"><stop offset="0" stopColor="#fdeeb8"/><stop offset=".5" stopColor="#e0ae45"/><stop offset="1" stopColor="#a87a1c"/></radialGradient><linearGradient id="xGemCard" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2c2260"/><stop offset="1" stopColor="#110c2c"/></linearGradient><linearGradient id="xGemRim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#b9a2ff"/><stop offset="1" stopColor="#5b3fd0"/></linearGradient><linearGradient id="xVeCard" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3a2d10"/><stop offset="1" stopColor="#120f0a"/></linearGradient><linearGradient id="xVeRim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f6d77a"/><stop offset="1" stopColor="#8a6a25"/></linearGradient><linearGradient id="xArrow" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#e3b94f" stopOpacity=".25"/><stop offset="1" stopColor="#f8dc84"/></linearGradient><linearGradient id="xGloss" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" stopOpacity=".14"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient><filter id="xBlur"><feGaussianBlur stdDeviation="5"/></filter></defs>
        <ellipse cx="140" cy="160" rx="170" ry="150" fill="url(#xPurple)"/>
        <ellipse cx="420" cy="160" rx="170" ry="150" fill="url(#xGold)"/>
        <rect x="20" y="28" width="170" height="250" rx="18" fill="url(#xGemCard)" stroke="url(#xGemRim)" strokeWidth="2"/>
        <path d="M38 28 H120 L52 278 H38 Q20 278 20 260 V46 Q20 28 38 28 Z" fill="url(#xGloss)"/>
        <text x="105" y="58" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="15" letterSpacing="1" fill="#b8a2ff">GEM</text>
        <g transform="translate(105 150) scale(2.1)"><circle r="46" fill="url(#xGemGlow)"/><g><polygon points="0,-30 26,-14 0,-4 -26,-14" fill="#d3c4ff"/><polygon points="-26,-14 0,-4 -18,20" fill="#9079f0"/><polygon points="26,-14 0,-4 18,20" fill="#6d52d6"/><polygon points="-18,20 0,-4 18,20 0,32" fill="#573fbb"/><polygon points="-9,-21 0,-27 7,-19 -2,-13" fill="#fff" fillOpacity=".55"/><path d="M-26 -14 L0 -30 L26 -14 L18 20 L0 32 L-18 20 Z" fill="none" stroke="#e6dcff" strokeOpacity=".5" strokeWidth="1"/></g></g>
        <g transform="translate(46 92) scale(0.5)"><g className={`${styles.float} ${styles.floatB}`}><polygon points="0,-30 26,-14 0,-4 -26,-14" fill="#d3c4ff"/><polygon points="-26,-14 0,-4 -18,20" fill="#9079f0"/><polygon points="26,-14 0,-4 18,20" fill="#6d52d6"/><polygon points="-18,20 0,-4 18,20 0,32" fill="#573fbb"/><polygon points="-9,-21 0,-27 7,-19 -2,-13" fill="#fff" fillOpacity=".55"/><path d="M-26 -14 L0 -30 L26 -14 L18 20 L0 32 L-18 20 Z" fill="none" stroke="#e6dcff" strokeOpacity=".5" strokeWidth="1"/></g></g>
        <g transform="translate(168 198) scale(0.42)"><g className={`${styles.float} ${styles.floatC}`}><polygon points="0,-30 26,-14 0,-4 -26,-14" fill="#d3c4ff"/><polygon points="-26,-14 0,-4 -18,20" fill="#9079f0"/><polygon points="26,-14 0,-4 18,20" fill="#6d52d6"/><polygon points="-18,20 0,-4 18,20 0,32" fill="#573fbb"/><polygon points="-9,-21 0,-27 7,-19 -2,-13" fill="#fff" fillOpacity=".55"/><path d="M-26 -14 L0 -30 L26 -14 L18 20 L0 32 L-18 20 Z" fill="none" stroke="#e6dcff" strokeOpacity=".5" strokeWidth="1"/></g></g>
        <text x="105" y="252" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="24" fill="#fff">{gems}</text>
        <text x="105" y="268" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="700" fontSize="8" letterSpacing="1.5" fill="#b8a2ff">GEMS</text>
        <rect x="370" y="28" width="170" height="250" rx="18" fill="url(#xVeCard)" stroke="url(#xVeRim)" strokeWidth="2"/>
        <path d="M388 28 H470 L402 278 H388 Q370 278 370 260 V46 Q370 28 388 28 Z" fill="url(#xGloss)"/>
        <text x="455" y="58" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="15" letterSpacing="1" fill="#f0cb6f">VE</text>
        <circle cx="455" cy="150" r="70" fill="url(#xGold)"/>
        <g className={`${styles.float} ${styles.floatA}`}><circle cx="455" cy="155.4" r="54" fill="#7d5a12"/><circle cx="455" cy="150" r="54" fill="url(#xCoin)" stroke="#b98a22" strokeWidth="2"/><circle cx="455" cy="150" r="40.0" fill="none" stroke="#fbe6a0" strokeOpacity=".65" strokeWidth="2"/><text x="455" y="166.2" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="49.7" fill="#7a5a12">VE</text></g>
        <text x="455" y="252" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="24" fill="#f6d77a">{ve}</text>
        <text x="455" y="268" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="700" fontSize="8" letterSpacing="1.5" fill="#c9a24b">VE BALANCE</text>
        <circle cx="528" cy="266" r="19" fill="#14100a" stroke="#e3b94f" strokeWidth="3"/><path d="M519 266 l7 7 l13 -14" fill="none" stroke="#f0cb6f" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
        <g className={`${styles.particle} ${styles.p0}`}><g transform="translate(204 118) scale(0.34)"><polygon points="0,-30 26,-14 0,-4 -26,-14" fill="#d3c4ff"/><polygon points="-26,-14 0,-4 -18,20" fill="#9079f0"/><polygon points="26,-14 0,-4 18,20" fill="#6d52d6"/><polygon points="-18,20 0,-4 18,20 0,32" fill="#573fbb"/></g></g>
        <g className={`${styles.particle} ${styles.p1}`}><g transform="translate(222 176) scale(0.28)"><polygon points="0,-30 26,-14 0,-4 -26,-14" fill="#d3c4ff"/><polygon points="-26,-14 0,-4 -18,20" fill="#9079f0"/><polygon points="26,-14 0,-4 18,20" fill="#6d52d6"/><polygon points="-18,20 0,-4 18,20 0,32" fill="#573fbb"/></g></g>
        <g className={`${styles.particle} ${styles.p2}`}><g transform="translate(238 132) scale(0.24)"><polygon points="0,-30 26,-14 0,-4 -26,-14" fill="#d3c4ff"/><polygon points="-26,-14 0,-4 -18,20" fill="#9079f0"/><polygon points="26,-14 0,-4 18,20" fill="#6d52d6"/><polygon points="-18,20 0,-4 18,20 0,32" fill="#573fbb"/></g></g>
        <g className={`${styles.particle} ${styles.p3}`}><g transform="translate(214 150) scale(0.2)"><polygon points="0,-30 26,-14 0,-4 -26,-14" fill="#d3c4ff"/><polygon points="-26,-14 0,-4 -18,20" fill="#9079f0"/><polygon points="26,-14 0,-4 18,20" fill="#6d52d6"/><polygon points="-18,20 0,-4 18,20 0,32" fill="#573fbb"/></g></g>
        <g className={`${styles.particle} ${styles.p4}`}><g transform="translate(246 166) scale(0.22)"><polygon points="0,-30 26,-14 0,-4 -26,-14" fill="#d3c4ff"/><polygon points="-26,-14 0,-4 -18,20" fill="#9079f0"/><polygon points="26,-14 0,-4 18,20" fill="#6d52d6"/><polygon points="-18,20 0,-4 18,20 0,32" fill="#573fbb"/></g></g>
        <g className={`${styles.flow} ${styles.flowD1}`}><path d="M324 138 H352 V124 L378 150 L352 176 V162 H324 Z" fill="url(#xArrow)" stroke="#f8dc84" strokeOpacity=".6"/></g>
        <circle cx="280" cy="150" r="58" fill="#8a5cff" fillOpacity=".28" filter="url(#xBlur)"/>
        <circle cx="280" cy="150" r="48" fill="none" stroke="#8f98f0" strokeOpacity=".55" strokeWidth="1.5"/>
        <path d="M280 98 A52 52 0 0 1 332 150" fill="none" stroke="#f0cb6f" strokeWidth="3" strokeLinecap="round" strokeOpacity=".9"/>
        <path d="M280 202 A52 52 0 0 1 228 150" fill="none" stroke="#b8a2ff" strokeWidth="3" strokeLinecap="round" strokeOpacity=".9"/>
        <rect x="200" y="266" width="160" height="58" rx="12" fill="#14183f" fillOpacity=".92" stroke="#3d4390"/>
        <text x="280" y="284" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="700" fontSize="7.5" letterSpacing="1" fill="#aeb4dc">EXCHANGE RATE (DEMO)</text>
        <g transform="translate(236 306) scale(0.42)"><g><polygon points="0,-30 26,-14 0,-4 -26,-14" fill="#d3c4ff"/><polygon points="-26,-14 0,-4 -18,20" fill="#9079f0"/><polygon points="26,-14 0,-4 18,20" fill="#6d52d6"/><polygon points="-18,20 0,-4 18,20 0,32" fill="#573fbb"/><polygon points="-9,-21 0,-27 7,-19 -2,-13" fill="#fff" fillOpacity=".55"/><path d="M-26 -14 L0 -30 L26 -14 L18 20 L0 32 L-18 20 Z" fill="none" stroke="#e6dcff" strokeOpacity=".5" strokeWidth="1"/></g></g>
        <text x="280" y="310" textAnchor="middle" fontFamily="Manrope,sans-serif" fontWeight="800" fontSize="12" fill="#8f98f0">&gt;&gt;&gt;</text>
        <circle cx="324" cy="307.1" r="11" fill="#7d5a12"/><circle cx="324" cy="306" r="11" fill="url(#xCoin)" stroke="#b98a22" strokeWidth="2"/><circle cx="324" cy="306" r="8.1" fill="none" stroke="#fbe6a0" strokeOpacity=".65" strokeWidth="2"/><text x="324" y="309.3" textAnchor="middle" fontFamily="Georgia,serif" fontWeight="700" fontSize="10.1" fill="#7a5a12">VE</text>
        <path d="M100 9 L102.3 13.7 L107 16 L102.3 18.3 L100 23 L97.7 18.3 L93 16 L97.7 13.7 Z" fill="#f4efff" fillOpacity=".95"/>
        <path d="M300 34 L302.0 38.0 L306 40 L302.0 42.0 L300 46 L298.0 42.0 L294 40 L298.0 38.0 Z" fill="#f4efff" fillOpacity=".95"/>
        <path d="M536 14 L538.0 18.0 L542 20 L538.0 22.0 L536 26 L534.0 22.0 L530 20 L534.0 18.0 Z" fill="#f4efff" fillOpacity=".95"/>
        <path d="M290 245 L291.7 248.3 L295 250 L291.7 251.7 L290 255 L288.3 251.7 L285 250 L288.3 248.3 Z" fill="#f4efff" fillOpacity=".95"/>
      </svg>

      <button
        type="button"
        className={styles.convertBtn}
        onClick={onConvert}
        aria-label="Convert Gems to VEs (demo)"
      >
        <RefreshCw size="52%" className={styles.convertIcon} aria-hidden="true" />
      </button>
    </div>
  );
}