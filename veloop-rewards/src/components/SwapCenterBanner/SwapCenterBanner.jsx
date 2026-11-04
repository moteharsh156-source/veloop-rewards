import { useState } from 'react';
import CtaButton from '../CtaButton/CtaButton';
import SwapIllustration from './SwapIllustration';
import { SWAP_DEMO } from '../../utils/swapData';
import styles from './SwapCenterBanner.module.css';

export default function SwapCenterBanner({ onOpen = () => {} }) {
  const [flipped, setFlipped] = useState(false);

  const { amount, rate, from, to } = SWAP_DEMO;
  const fromLabel = flipped ? to : from;
  const toLabel = flipped ? from : to;
  const result = flipped ? Math.round(amount / rate) : Math.round(amount * rate);

  return (
    <section className={styles.card} aria-label="Swap Center">
      <div className={styles.content}>
        <h2 className={styles.heading}>
          <span className={styles.accent}>Swap</span> Center
        </h2>

        <div className={styles.rule} aria-hidden="true">
          <span className={styles.ruleLine} />
        </div>

        <p className={styles.text}>
          Convert eligible reward balances between supported currencies.
        </p>

        <CtaButton variant="rect" label="OPEN SWAP CENTER" onClick={onOpen} />

        <p className={styles.status} role="status" aria-live="polite">
          Preview: {amount} {fromLabel} → {result} {toLabel} (demo rate, not official).
        </p>
      </div>

      <div className={styles.visual}>
        <SwapIllustration flipped={flipped} onSwap={() => setFlipped((f) => !f)} />
      </div>
    </section>
  );
}