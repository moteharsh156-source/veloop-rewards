import { useRef } from 'react';
import CaptchaTasksBanner from '../components/CaptchaTasksBanner/CaptchaTasksBanner';
import CaptchaTaskCenter from '../components/CaptchaTaskCenter/CaptchaTaskCenter';
import useCaptchaTask from '../hooks/useCaptchaTask';
import styles from './CaptchaTasksPage.module.css';

export default function CaptchaTasksPage() {
  const ctl = useCaptchaTask();
  const centerRef = useRef(null);

  // Start Task: bring the task into view, then start (or resume) it
  const handleStart = () => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    centerRef.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    ctl.start();
  };

  return (
    <div className={styles.stack}>
      <CaptchaTasksBanner ctl={ctl} onStart={handleStart} />
      <CaptchaTaskCenter ctl={ctl} sectionRef={centerRef} />
    </div>
  );
}
