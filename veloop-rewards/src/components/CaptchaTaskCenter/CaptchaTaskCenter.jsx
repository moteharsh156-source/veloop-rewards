import TaskPanel from './TaskPanel';
import ProgressCard from './ProgressCard';
import RewardHistory from './RewardHistory';
import styles from './CaptchaTaskCenter.module.css';

/** The working captcha experience: task panel + progress + reward history. */
export default function CaptchaTaskCenter({ ctl, sectionRef }) {
  return (
    <div className={styles.center} ref={sectionRef} id="task-center">
      <TaskPanel ctl={ctl} />
      <div className={styles.side}>
        <ProgressCard ctl={ctl} />
        <RewardHistory ctl={ctl} />
      </div>
    </div>
  );
}
