import { Link } from 'react-router-dom';
import {
  AlertCircle, ArrowRight, Clock, Gem, Grid3x3, Hash, Info, Lightbulb, Loader2, RefreshCw, RotateCcw, Search, ShieldCheck, Target,
} from 'lucide-react';
import useCaptchaChallenge from '../hooks/useCaptchaChallenge';
import CaptchaStepper from '../components/CaptchaFlow/CaptchaStepper';
import TimerRing from '../components/CaptchaFlow/TimerRing';
import TileGrid from '../components/CaptchaFlow/TileGrid';
import styles from './CaptchaChallengePage.module.css';

const TYPE_META = {
  select: { label: 'Pick all', Icon: Grid3x3 },
  odd: { label: 'Odd one out', Icon: Search },
  count: { label: 'Count', Icon: Hash },
};

export default function CaptchaChallengePage() {
  const c = useCaptchaChallenge();
  const { phase, task, stats } = c;
  const challenge = phase === 'starting' || phase === 'active' || phase === 'submitting';
  const meta = TYPE_META[task?.type] || TYPE_META.select;
  const MetaIcon = meta.Icon;

  let stateCard = null;
  if (phase === 'limit') {
    stateCard = {
      icon: Target, tone: 'muted', title: 'Daily limit reached',
      text: `You completed all ${stats.dailyLimit} captcha tasks today. Come back after the reset to earn more Gems.`,
    };
  } else if (phase === 'cooldown') {
    stateCard = {
      icon: Clock, tone: 'bad', title: 'Taking a short break',
      text: `You used all your attempts. A new task unlocks in ${c.cooldownLeft}s.`,
    };
  } else if (phase === 'expired') {
    stateCard = { icon: Clock, tone: 'bad', title: "Time's up", text: 'The timer ran out before you verified. Start a new task whenever you are ready.', action: 'Start a new task' };
  } else if (phase === 'error') {
    stateCard = { icon: AlertCircle, tone: 'bad', title: 'Something went wrong', text: c.message?.text || 'Please try again.', action: 'Try again' };
  }

  return (
    <div className={styles.page}>
      <CaptchaStepper current="solve" />

      <div className={styles.layout}>
        <section className={styles.arena} aria-labelledby="ch-title">
          <span className={`${styles.orb} ${styles.orbA}`} aria-hidden="true" />
          <span className={`${styles.orb} ${styles.orbB}`} aria-hidden="true" />

          {challenge ? (
            <>
              <header className={styles.head}>
                <div className={styles.headText}>
                  <p className={styles.eyebrow}>
                    <span className={styles.typePill}><MetaIcon size={14} aria-hidden="true" /> {task ? meta.label : 'Loading'}</span>
                    <span>Visual challenge</span>
                  </p>
                  <h1 id="ch-title" className={styles.prompt}>{task ? task.prompt : 'Preparing your challenge'}</h1>
                  <p className={styles.hint}>{task ? task.hint : 'Drawing fresh tiles for you…'}</p>
                </div>
                {task && <TimerRing secondsLeft={c.secondsLeft} total={task.totalSeconds} />}
              </header>

              <TileGrid
                tiles={task?.tiles || []}
                columns={task?.columns || 3}
                selected={c.selected}
                onToggle={c.toggle}
                disabled={phase !== 'active' || c.refreshing}
                loading={phase === 'starting' || c.refreshing}
                shake={c.shake}
                label={task?.prompt || 'Challenge'}
              />

              <div className={styles.msgWrap} aria-live="polite">
                {c.message && (
                  <p className={styles.msg} data-type={c.message.type} role={c.message.type === 'error' ? 'alert' : 'status'}>
                    {c.message.type === 'error' ? <AlertCircle size={16} aria-hidden="true" /> : <Info size={16} aria-hidden="true" />}
                    <span>{c.message.text}</span>
                  </p>
                )}
              </div>

              <footer className={styles.foot}>
                <div className={styles.footLeft}>
                  <span className={styles.count} aria-live="polite">
                    <strong>{c.selected.length}</strong> selected
                  </span>
                  <button type="button" className={styles.ghost} onClick={c.clear} disabled={!c.selected.length || phase !== 'active'}>
                    <RotateCcw size={16} aria-hidden="true" /> Clear
                  </button>
                  <button
                    type="button"
                    className={styles.ghost}
                    onClick={c.refresh}
                    disabled={phase !== 'active' || c.refreshing || !task || task.refreshesLeft <= 0}
                    aria-label={`New challenge. ${task?.refreshesLeft ?? 0} left`}
                  >
                    <RefreshCw size={16} className={c.refreshing ? styles.spin : ''} aria-hidden="true" /> New challenge
                    <span className={styles.badge}>{task?.refreshesLeft ?? 0}</span>
                  </button>
                </div>

                <button
                  type="button"
                  className={`${styles.verify} ${c.canSubmit ? styles.verifyReady : ''}`}
                  onClick={c.submit}
                  disabled={phase !== 'active' || c.refreshing}
                >
                  {phase === 'submitting' ? <Loader2 size={18} className={styles.spin} aria-hidden="true" /> : null}
                  Verify selection <ArrowRight size={18} aria-hidden="true" />
                </button>
              </footer>
            </>
          ) : (
            <div className={styles.stateCard}>
              <span className={`${styles.stateIcon} ${styles[`tone_${stateCard.tone}`]}`}><stateCard.icon size={34} aria-hidden="true" /></span>
              <h1 id="ch-title" className={styles.stateTitle}>{stateCard.title}</h1>
              <p className={styles.stateText}>{stateCard.text}</p>
              <div className={styles.stateActions}>
                {stateCard.action && <button type="button" className={styles.verify} onClick={c.start}>{stateCard.action}</button>}
                <Link to="/captcha-tasks" className={styles.ghost}>Back to overview</Link>
              </div>
            </div>
          )}
        </section>

        <aside className={styles.side} aria-label="Task details">
          <section className={styles.reward}>
            <span className={styles.rewardGem} aria-hidden="true"><Gem size={34} /></span>
            <div>
              <p className={styles.rewardLabel}>Reward for this task</p>
              <p className={styles.rewardValue}>+{stats.gemsPerTask} <span>Gems</span></p>
            </div>
            <p className={styles.rewardNote}><ShieldCheck size={15} aria-hidden="true" /> Paid only after the Verification page confirms your answer.</p>
          </section>

          <section className={styles.sideCard}>
            <h2 className={styles.sideTitle}>Attempts</h2>
            <div className={styles.pips} aria-label={`${task?.attemptsLeft ?? stats.maxAttempts} of ${stats.maxAttempts} attempts left`}>
              {Array.from({ length: stats.maxAttempts }).map((_, i) => (
                <span key={i} className={i < (task?.attemptsLeft ?? stats.maxAttempts) ? styles.pipOn : styles.pipOff} />
              ))}
            </div>
            <p className={styles.sideText}>{task?.attemptsLeft ?? stats.maxAttempts} of {stats.maxAttempts} attempts left. A wrong pick brings a brand-new challenge.</p>
          </section>

          <section className={styles.sideCard}>
            <h2 className={styles.sideTitle}>Today</h2>
            <div className={styles.bar} role="progressbar" aria-valuemin={0} aria-valuemax={stats.dailyLimit} aria-valuenow={stats.completedToday} aria-label="Tasks completed today">
              <span className={styles.barFill} style={{ width: `${(stats.completedToday / stats.dailyLimit) * 100}%` }} />
            </div>
            <p className={styles.sideText}><strong>{stats.completedToday}</strong> of {stats.dailyLimit} tasks completed</p>
          </section>

          <section className={styles.sideCard}>
            <h2 className={styles.sideTitle}><Lightbulb size={16} aria-hidden="true" /> Quick tips</h2>
            <ul className={styles.tips}>
              <li>You have {stats.ttlSeconds} seconds per task.</li>
              <li>You can ask for a new challenge up to {stats.maxRefreshes} times.</li>
              <li>Refreshing never adds time to the timer.</li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
