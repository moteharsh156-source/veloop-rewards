import { useRef, useState } from 'react';
import SwapCenterBanner from '../components/SwapCenterBanner/SwapCenterBanner';
import SwapPanel from '../components/SwapPanel/SwapPanel';
import { scrollToElement } from '../utils/scroll';
import styles from './CaptchaTasksPage.module.css';

export default function SwapCenterPage() {
  const panelRef = useRef(null);
  const inputRef = useRef(null);
  const [direction, setDirection] = useState('ve-sve'); // shared by the banner and the panel

  const flip = () => setDirection((d) => (d === 've-sve' ? 'sve-ve' : 've-sve'));
  const open = () => scrollToElement(panelRef.current, inputRef.current);

  return (
    <div className={styles.stack}>
      <SwapCenterBanner direction={direction} onFlip={flip} onOpen={open} />
      <SwapPanel direction={direction} onFlip={flip} panelRef={panelRef} inputRef={inputRef} />
    </div>
  );
}
