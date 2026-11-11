import CtaButton from '../components/CtaButton/CtaButton';
import styles from './FeaturePage.module.css';

/**
 * Placeholder destination for a banner's button.
 * accent: 'gold' | 'blue' | 'purple' (matches the banner it belongs to).
 * Replace it with the real feature page when that module exists.
 */
export default function FeaturePage({
  eyebrow = 'VELOOP REWARDS', title, description, backTo, backLabel, icon: Icon, accent = 'gold',
}) {
  return (
    <section className={`${styles.wrap} ${styles[accent] || ''}`} aria-labelledby="feature-title">
      <div className={styles.content}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 id="feature-title" className={styles.title}>{title}</h1>
        <p className={styles.text}>{description}</p>
        <p className={styles.note}>Demo page: the full feature is outside the scope of this banner task.</p>
        <CtaButton variant="rect" iconLeft to={backTo} label={backLabel.toUpperCase()} />
      </div>

      {Icon && (
        <div className={styles.emblem} aria-hidden="true">
          <span className={styles.ring1} />
          <span className={styles.ring2} />
          <span className={styles.disc}><Icon size="44%" strokeWidth={1.6} /></span>
        </div>
      )}
    </section>
  );
}