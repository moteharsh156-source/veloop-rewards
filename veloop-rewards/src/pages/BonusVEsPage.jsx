import { useRef, useState } from 'react';
import BonusVEsBanner from '../components/BonusVEsBanner/BonusVEsBanner';
import BonusPanel from '../components/BonusPanel/BonusPanel';
import { scrollToElement } from '../utils/scroll';
import styles from './CaptchaTasksPage.module.css';

export default function BonusVEsPage() {
  const panelRef = useRef(null);
  const [highlight, setHighlight] = useState(null);

  const explore = () => scrollToElement(panelRef.current);
  const select = (id) => {
    scrollToElement(document.getElementById(`bonus-${id}`));
    setHighlight(id);
    setTimeout(() => setHighlight(null), 1300);
  };

  return (
    <div className={styles.stack}>
      <BonusVEsBanner onExplore={explore} onSelect={select} />
      <BonusPanel panelRef={panelRef} highlight={highlight} />
    </div>
  );
}
