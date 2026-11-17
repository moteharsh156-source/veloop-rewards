import { Coins, Gem } from 'lucide-react';
import { useStore } from '../../services/rewardsStore';
import useCountUp from '../../hooks/useCountUp';
import styles from './WalletBadge.module.css';

/** Live balances: the same numbers every page shows. */
export default function WalletBadge({ variant = 'bar' }) {
  const w = useStore((s) => s.wallet);
  const gems = useCountUp(w.gems, 500);
  const ve = useCountUp(w.ve, 500);
  const sve = useCountUp(w.sve, 500);

  return (
    <div
      className={`${styles.wallet} ${variant === 'menu' ? styles.menu : ''}`}
      role="group"
      aria-label={`Your balance: ${w.gems} Gems, ${w.ve} VE, ${w.sve} SVE`}
    >
      <span className={`${styles.chip} ${styles.gem}`}><Gem size={14} aria-hidden="true" /> {gems.toLocaleString()}<span className={styles.unit}>Gems</span></span>
      <span className={`${styles.chip} ${styles.ve}`}><Coins size={14} aria-hidden="true" /> {ve.toLocaleString()}<span className={styles.unit}>VE</span></span>
      <span className={`${styles.chip} ${styles.sve}`}><span className={styles.sveMark} aria-hidden="true">S</span> {sve.toLocaleString()}<span className={styles.unit}>SVE</span></span>
    </div>
  );
}
