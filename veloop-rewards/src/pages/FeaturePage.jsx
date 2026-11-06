import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import styles from './FeaturePage.module.css';

/**
 * Placeholder destination for a banner's CTA.
 * Replace it with the real feature page when that module exists.
 */
export default function FeaturePage({ eyebrow = 'VELOOP REWARDS', title, description, backTo, backLabel }) {
  return (
    <section className={styles.wrap} aria-labelledby="feature-title">
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1 id="feature-title" className={styles.title}>{title}</h1>
      <p className={styles.text}>{description}</p>
      <p className={styles.note}>Demo page: the full feature is outside the scope of this banner task.</p>

      <Link to={backTo} className={styles.back}>
        <ArrowLeft size={18} aria-hidden="true" />
        {backLabel}
      </Link>
    </section>
  );
}