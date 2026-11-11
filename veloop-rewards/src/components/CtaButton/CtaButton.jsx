import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import styles from './CtaButton.module.css';

/**
 * Reusable gold call-to-action.
 *  variant="pill"  -> label + dark round arrow (Bonus, ...)
 *  variant="rect"  -> label + small chevron      (Swap, Exchange, Back buttons)
 *  variant="block" -> dark chevron block + label (Captcha style)
 * iconLeft puts the chevron before the label (for "Back" buttons, rect only).
 * Pass `onClick` for actions, `to` for in-app links, or `href` for outside links.
 */
export default function CtaButton({
  label, onClick, href, to, variant = 'pill', iconLeft = false, className = '',
}) {
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
    content = iconLeft ? (
      <>
        <ChevronLeft size={20} className={styles.arrowLeft} aria-hidden="true" />
        <span className={styles.labelPill}>{label}</span>
      </>
    ) : (
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

  if (to) return <Link className={cls} to={to}>{content}</Link>;
  if (href) return <a className={cls} href={href}>{content}</a>;
  return <button type="button" className={cls} onClick={onClick}>{content}</button>;
}