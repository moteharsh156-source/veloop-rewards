import { useState } from 'react';
import { Check, Coins } from 'lucide-react';
import CtaButton from '../CtaButton/CtaButton';
import BonusIllustration from './BonusIllustration';
import useCountUp from '../../hooks/useCountUp';
import { BONUS_ACTIVITIES } from '../../utils/bonusData';
import styles from './BonusVEsBanner.module.css';

export default function BonusVEsBanner({ onExplore = () => {} }) {
  const [done, setDone] = useState([]);

  const toggle = (id) =>
    setDone((list) => (list.includes(id) ? list.filter((x) => x !== id) : [...list, id]));

  const total = BONUS_ACTIVITIES.filter((a) => done.includes(a.id)).reduce((sum, a) => sum + a.ve, 0);
  const shown = useCountUp(total);
  const progress = done.length / BONUS_ACTIVITIES.length;

  return (
    <section className={styles.card} aria-label="Bonus VEs">
      <div className={styles.content}>
        <h2 className={styles.heading}>
          Boost Your<br />
          <span className={styles.accent}>VE Balance</span>
        </h2>

        <div className={styles.rule} aria-hidden="true">
          <span className={styles.ruleLine} />
          <span className={styles.ruleDots}>›››</span>
        </div>

        <p className={styles.text}>
          Complete eligible activities and unlock additional VEs through special bonus opportunities.
        </p>

        <div className={styles.ctaRow}>
          <CtaButton label="EXPLORE BONUSES" onClick={onExplore} />
          <span className={styles.counter} aria-hidden="true">
            <Coins size={16} /> +{shown} VE
          </span>
        </div>

        <p className={styles.status} role="status" aria-live="polite">
          {done.length === 0
            ? 'Tap an activity to preview your bonus.'
            : `${done.length} of ${BONUS_ACTIVITIES.length} activities selected: +${total} VE preview (demo values).`}
        </p>
      </div>

      <div className={styles.visual}>
        <div className={styles.activities} role="group" aria-label="Bonus activities">
          {BONUS_ACTIVITIES.map(({ id, title, sub, icon: Icon }) => {
            const isDone = done.includes(id);
            return (
              <button
                key={id}
                type="button"
                className={`${styles.activity} ${isDone ? styles.done : ''}`}
                onClick={() => toggle(id)}
                aria-pressed={isDone}
              >
                <span className={styles.iconBox}><Icon size={20} aria-hidden="true" /></span>
                <span className={styles.activityText}>
                  <span className={styles.activityTitle}>{title}</span>
                  <span className={styles.activitySub}>{sub}</span>
                </span>
                <span className={styles.check} aria-hidden="true">
                  {isDone && <Check size={14} />}
                </span>
              </button>
            );
          })}
        </div>

        <BonusIllustration progress={progress} />
      </div>
    </section>
  );
}