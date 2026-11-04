import { ArrowRight, ChevronRight, ChevronsRight } from 'lucide-react';
import styles from './CtaButton.module.css';

/**
 * Reusable gold call-to-action.
 *  variant="pill"  -> label + dark round arrow (Bonus, ...)
 *  variant="rect"  -> label + small chevron      (Swap Center, ...)
 *  variant="block" -> dark chevron block + label (Captcha style)
 * Pass `onClick` for actions or `href` for links.
 */
export default function CtaButton({ label, onClick, href, variant = 'pill', className = '' }) {
  let content;

  if (variant === 'block') {
    content = (
      <>
        <span className={styles.iconBlock}>
          <ChevronsRight size={20} className={styles.arrow} aria-hidden="true" />
        </span>
        <span className={styles.labelBlock}>{label}</span>
      </>
    );
  } else if (variant === 'rect') {
    content = (
      <>
        <span className={styles.labelPill}>{label}</span>
        <ChevronRight size={20} className={styles.arrow} aria-hidden="true" />
      </>
    );
  } else {
    content = (
      <>
        <span className={styles.labelPill}>{label}</span>
        <span className={styles.iconPill}>
          <ArrowRight size={18} className={styles.arrow} aria-hidden="true" />
        </span>
      </>
    );
  }

  const cls = `${styles.cta} ${styles[variant] || ''} ${className}`.trim();

  if (href) {
    return <a className={cls} href={href}>{content}</a>;
  }
  return <button type="button" className={cls} onClick={onClick}>{content}</button>;
}