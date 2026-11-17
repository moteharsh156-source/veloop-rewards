import CtaButton from '../CtaButton/CtaButton';
import SwapIllustration from './SwapIllustration';
import useCountUp from '../../hooks/useCountUp';
import { useStore } from '../../services/rewardsStore';
import styles from './SwapCenterBanner.module.css';

/** direction: 've-sve' | 'sve-ve' (shared with the swap panel below). */
export default function SwapCenterBanner({ direction, onFlip, onOpen }) {
  const wallet = useStore((s) => s.wallet);
  const ve = useCountUp(wallet.ve, 600);
  const sve = useCountUp(wallet.sve, 600);
  const flipped = direction === 'sve-ve';

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

        <p className={styles.status}>
          Your balance: {wallet.ve.toLocaleString()} VE · {wallet.sve.toLocaleString()} SVE. Swapping {flipped ? 'SVE → VE' : 'VE → SVE'}.
        </p>
      </div>

      <div className={styles.visual}>
        <SwapIllustration flipped={flipped} onSwap={onFlip} ve={ve} sve={sve} />
      </div>
    </section>
  );
}
