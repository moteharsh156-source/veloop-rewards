import { ArrowRight, ChevronsRight } from 'lucide-react';
import styles from './CtaButton.module.css';
 
/**
 * Reusable gold call-to-action.
 *  variant="pill"  -> label + dark round arrow (Bonus, Swap, ...)
 *  variant="block" -> dark chevron block + label (Captcha style)
 * Pass `onClick` for actions or `href` for links.
 */
export default function CtaButton({ label, onClick, href, variant = 'pill', className = '' }) {
  const isBlock = variant === 'block';
  const Icon = isBlock ? ChevronsRight : ArrowRight;
 
  const content = isBlock ? (
    <>
      <span className={styles.iconBlock}><Icon size={20} className={styles.arrow} aria-hidden="true" /></span>
      <span className={styles.labelBlock}>{label}</span>
    </>
  ) : (
    <>
      <span className={styles.labelPill}>{label}</span>
      <span className={styles.iconPill}><Icon size={18} className={styles.arrow} aria-hidden="true" /></span>
    </>
  );
 
  const cls = `${styles.cta} ${styles[variant]} ${className}`.trim();
 
  if (href) {
    return <a className={cls} href={href}>{content}</a>;
  }
  return <button type="button" className={cls} onClick={onClick}>{content}</button>;
}
