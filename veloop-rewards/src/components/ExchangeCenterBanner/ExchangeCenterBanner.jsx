import { useEffect, useRef, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import CtaButton from '../CtaButton/CtaButton';
import ExchangeIllustration from './ExchangeIllustration';
import useCountUp from '../../hooks/useCountUp';
import { EXCHANGE_DEMO } from '../../utils/exchangeData';
import styles from './ExchangeCenterBanner.module.css';

const { startGems, startVe, gemsPerStep, vePerStep } = EXCHANGE_DEMO;

function GemIcon() {
  return (
    <svg width="30" height="30" viewBox="-30 -32 60 64" aria-hidden="true">
      <polygon points="0,-30 26,-14 0,-4 -26,-14" fill="#d3c4ff" />
      <polygon points="-26,-14 0,-4 -18,20" fill="#9079f0" />
      <polygon points="26,-14 0,-4 18,20" fill="#6d52d6" />
      <polygon points="-18,20 0,-4 18,20 0,32" fill="#573fbb" />
    </svg>
  );
}

function VeCoin() {
  return <span className={styles.miniCoin} aria-hidden="true">VE</span>;
}

const MESSAGES = {
  idle: 'Press the convert button to preview an exchange.',
  done: `Converted ${gemsPerStep} Gems → ${vePerStep} VE (demo rate, not official).`,
  reset: 'Demo balances reset. Press convert to try again.',
};

export default function ExchangeCenterBanner({ onOpen = () => {} }) {
  const [gems, setGems] = useState(startGems);
  const [ve, setVe] = useState(startVe);
  const [converting, setConverting] = useState(false);
  const [message, setMessage] = useState('idle');
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const convert = () => {
    if (converting) return;
    if (gems < gemsPerStep) {
      setGems(startGems);
      setVe(startVe);
      setMessage('reset');
      return;
    }
    setConverting(true);
    setMessage('done');
    setGems((g) => g - gemsPerStep);
    setVe((v) => v + vePerStep);
    timer.current = setTimeout(() => setConverting(false), 900);
  };

  const gemsShown = useCountUp(gems);
  const veShown = useCountUp(ve);

  return (
    <section className={styles.card} aria-label="Exchange Center">
      <div className={styles.content}>
        <h2 className={styles.heading}>
          Convert <span className={styles.accentGem}>Gems</span><br />
          to <span className={styles.accentVe}>VEs</span>
        </h2>

        <p className={styles.text}>
          Exchange eligible Gems into VEs and grow your VE balance.
        </p>

        <CtaButton variant="rect" label="OPEN EXCHANGE CENTER" onClick={onOpen} />

        <div className={styles.flow} aria-label="How it works: Gems are converted into VEs">
          <div className={styles.step}>
            <span className={styles.tile}><GemIcon /></span>
            <span className={`${styles.stepLabel} ${styles.lGem}`}>GEM</span>
          </div>
          <span className={styles.dotArrow} aria-hidden="true" />
          <div className={styles.step}>
            <span className={`${styles.tile} ${styles.tileRound} ${converting ? styles.spin : ''}`}>
              <RefreshCw size={24} aria-hidden="true" />
            </span>
            <span className={styles.stepLabel}>CONVERT</span>
          </div>
          <span className={styles.dotArrow} aria-hidden="true" />
          <div className={styles.step}>
            <span className={styles.tile}><VeCoin /></span>
            <span className={`${styles.stepLabel} ${styles.lVe}`}>VE</span>
          </div>
        </div>

        <p className={styles.status} role="status" aria-live="polite">{MESSAGES[message]}</p>
      </div>

      <div className={styles.visual}>
        <ExchangeIllustration gems={gemsShown} ve={veShown} converting={converting} onConvert={convert} />
      </div>
    </section>
  );
}