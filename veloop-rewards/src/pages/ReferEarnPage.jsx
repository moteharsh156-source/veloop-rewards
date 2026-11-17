import { useRef } from 'react';
import ReferEarnBanner from '../components/ReferEarnBanner/ReferEarnBanner';
import ReferralPanel from '../components/ReferralPanel/ReferralPanel';
import { scrollToElement } from '../utils/scroll';
import styles from './CaptchaTasksPage.module.css';

export default function ReferEarnPage() {
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const invite = () => scrollToElement(panelRef.current, inputRef.current);

  return (
    <div className={styles.stack}>
      <ReferEarnBanner onInvite={invite} />
      <ReferralPanel panelRef={panelRef} inputRef={inputRef} />
    </div>
  );
}
