import { useRef } from 'react';
import ExchangeCenterBanner from '../components/ExchangeCenterBanner/ExchangeCenterBanner';
import ExchangePanel from '../components/ExchangePanel/ExchangePanel';
import { scrollToElement } from '../utils/scroll';
import styles from './CaptchaTasksPage.module.css';

export default function ExchangeCenterPage() {
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const open = () => scrollToElement(panelRef.current, inputRef.current);

  return (
    <div className={styles.stack}>
      <ExchangeCenterBanner onOpen={open} />
      <ExchangePanel panelRef={panelRef} inputRef={inputRef} />
    </div>
  );
}
