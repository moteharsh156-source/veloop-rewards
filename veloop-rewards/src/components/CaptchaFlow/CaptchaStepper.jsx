import { Check, Gem, MousePointerClick, ShieldCheck } from 'lucide-react';
import styles from './CaptchaFlow.module.css';

const STEPS = [
  { id: 'solve', label: 'Solve', Icon: MousePointerClick },
  { id: 'verify', label: 'Verify', Icon: ShieldCheck },
  { id: 'reward', label: 'Reward', Icon: Gem },
];

/** current: 'solve' | 'verify' | 'reward' */
export default function CaptchaStepper({ current }) {
  const idx = STEPS.findIndex((s) => s.id === current);
  return (
    <ol className={styles.stepper} aria-label="Captcha progress">
      {STEPS.map(({ id, label, Icon }, i) => (
        <li
          key={id}
          className={`${styles.step} ${i < idx ? styles.stepDone : ''} ${i === idx ? styles.stepCurrent : ''}`}
          aria-current={i === idx ? 'step' : undefined}
        >
          <span className={styles.stepDot}>{i < idx ? <Check size={16} strokeWidth={3} aria-hidden="true" /> : <Icon size={16} aria-hidden="true" />}</span>
          <span className={styles.stepLabel}>{label}</span>
        </li>
      ))}
    </ol>
  );
}
