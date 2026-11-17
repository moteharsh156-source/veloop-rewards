import { useMemo } from 'react';
import { Check, ClipboardCheck, Coins, TrendingUp, Users } from 'lucide-react';
import CtaButton from '../CtaButton/CtaButton';
import BonusIllustration from './BonusIllustration';
import useCountUp from '../../hooks/useCountUp';
import { useStore } from '../../services/rewardsStore';
import { bonusStatus } from '../../services/bonusApi';
import styles from './BonusVEsBanner.module.css';

// Live status of each bonus. The Bonus Center below the banner does the real, verified claiming.
const ACTIVITIES = [
  {
    id: 'checkin', title: 'Daily Check-in', Icon: ClipboardCheck,
    sub: (st) => (st.checkin.claimed ? 'Claimed today' : `+${st.checkin.ve} VE ready`),
    done: (st) => st.checkin.claimed,
  },
  {
    id: 'invite', title: 'Invite Friends', Icon: Users,
    sub: (st) => (st.invite.claimable > 0 ? `${st.invite.claimable} ready to claim` : `${st.invite.verified} verified`),
    done: (st) => st.invite.done,
  },
  {
    id: 'tasks', title: 'Complete Tasks', Icon: TrendingUp,
    sub: (st) => (st.tasks.claimed ? 'Claimed today' : `${Math.min(st.tasks.done, st.tasks.required)}/${st.tasks.required} done`),
    done: (st) => st.tasks.claimed,
  },
];

export default function BonusVEsBanner({ onExplore, onSelect }) {
  const state = useStore((s) => s);
  const st = useMemo(() => bonusStatus(state), [state]);
  const earned = useCountUp(st.earnedToday, 600);
  const progress = st.claimedCount / ACTIVITIES.length;

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
          <span className={styles.counter} aria-label={`${st.earnedToday} VE earned from bonuses today`}>
            <Coins size={16} aria-hidden="true" /> +{earned} VE today
          </span>
        </div>

        <p className={styles.status}>
          {st.claimedCount} of {ACTIVITIES.length} bonuses claimed today.
        </p>
      </div>

      <div className={styles.visual}>
        <div className={styles.activities} role="group" aria-label="Bonus activities">
          {ACTIVITIES.map(({ id, title, Icon, sub, done }) => {
            const isDone = done(st);
            return (
              <button
                key={id}
                type="button"
                className={`${styles.activity} ${isDone ? styles.done : ''}`}
                onClick={() => onSelect(id)}
                aria-label={`${title}: ${sub(st)}. Open this bonus`}
              >
                <span className={styles.iconBox}><Icon size={20} aria-hidden="true" /></span>
                <span className={styles.activityText}>
                  <span className={styles.activityTitle}>{title}</span>
                  <span className={styles.activitySub}>{sub(st)}</span>
                </span>
                <span className={styles.check} aria-hidden="true">{isDone && <Check size={14} />}</span>
              </button>
            );
          })}
        </div>

        <BonusIllustration progress={progress} />
      </div>
    </section>
  );
}
