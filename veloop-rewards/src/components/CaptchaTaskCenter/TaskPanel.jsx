import { useEffect, useRef, useState } from 'react';
import {
  AlertCircle, CheckCircle2, Clock, Info, Loader2, RefreshCw, ShieldCheck, Sparkles, Timer,
} from 'lucide-react';
import styles from './CaptchaTaskCenter.module.css';

const PILL = {
  loading: ['Loading', 'muted'],
  idle: ['Ready', 'blue'],
  starting: ['Preparing', 'blue'],
  active: ['In progress', 'gold'],
  verifying: ['Verifying', 'gold'],
  success: ['Completed', 'green'],
  failed: ['Locked', 'red'],
  expired: ['Expired', 'red'],
  limit: ['Daily limit', 'muted'],
};

const MSG_ICON = { success: CheckCircle2, error: AlertCircle, info: Info };

export default function TaskPanel({ ctl }) {
  const {
    phase, snap, task, input, setInput, fieldError, message, refreshing, secondsLeft,
    cooldownLeft, lastReward, errorTick, limitReached, ttlSeconds, maxAttempts, codeLength,
    start, refresh, submit,
  } = ctl;

  const inputRef = useRef(null);
  const nextRef = useRef(null);
  const [shake, setShake] = useState(false);

  // focus the answer box when a task opens, and the next button after a success
  useEffect(() => {
    if (phase === 'active') inputRef.current?.focus({ preventScroll: true });
    if (phase === 'success') nextRef.current?.focus({ preventScroll: true });
  }, [phase, task?.id]);

  useEffect(() => {
    if (!errorTick) return undefined;
    setShake(true);
    const id = setTimeout(() => setShake(false), 450);
    return () => clearTimeout(id);
  }, [errorTick]);

  const [pillText, pillTone] = PILL[phase] || PILL.idle;
  const reward = snap?.gemsPerTask ?? 5;
  const verifying = phase === 'verifying';
  const MsgIcon = message ? MSG_ICON[message.type] || Info : null;

  const startDisabled = phase === 'starting' || cooldownLeft > 0 || limitReached;
  let startLabel = 'Start task';
  if (cooldownLeft > 0) startLabel = `Try again in ${cooldownLeft}s`;
  else if (limitReached) startLabel = 'Daily limit reached';
  else if (phase === 'expired') startLabel = 'Start a new task';
  else if (phase === 'success') startLabel = 'Next task';

  const timerTone = secondsLeft <= 10 ? styles.fillDanger : secondsLeft <= 20 ? styles.fillWarn : styles.fillOk;

  /* ---------- bodies ---------- */
  let body;

  if (phase === 'loading') {
    body = (
      <div className={styles.skeletonStack} aria-busy="true" aria-label="Loading task">
        <span className={`${styles.skeleton} ${styles.skLine}`} />
        <span className={`${styles.skeleton} ${styles.skBox}`} />
        <span className={`${styles.skeleton} ${styles.skBtn}`} />
      </div>
    );
  } else if (phase === 'starting') {
    body = (
      <div className={styles.starting} aria-busy="true">
        <div className={`${styles.skeleton} ${styles.skCaptcha}`} />
        <p className={styles.startingText}><Loader2 size={18} className={styles.spin} aria-hidden="true" /> Preparing your captcha…</p>
      </div>
    );
  } else if (phase === 'active' || phase === 'verifying') {
    body = task && (
      <form
        className={styles.taskForm}
        onSubmit={(e) => { e.preventDefault(); submit(); }}
        noValidate
      >
        <div className={styles.captchaRow}>
          <div className={`${styles.captchaFrame} ${refreshing ? styles.dim : ''}`}>
            <img
              src={task.image}
              alt={`Captcha image. Type the ${codeLength} characters you see.`}
              className={styles.captchaImg}
              width="260"
              height="88"
              draggable={false}
            />
            {refreshing && <span className={styles.imgSpinner}><Loader2 size={26} className={styles.spin} aria-hidden="true" /></span>}
          </div>
          <button
            type="button"
            className={styles.refreshBtn}
            onClick={refresh}
            disabled={refreshing || verifying || task.refreshesLeft <= 0}
            aria-label={`Get a new captcha. ${task.refreshesLeft} refreshes left`}
          >
            <RefreshCw size={18} className={refreshing ? styles.spin : ''} aria-hidden="true" />
            <span className={styles.refreshCount}>{task.refreshesLeft}</span>
          </button>
        </div>

        <div className={styles.meta}>
          <div className={styles.timer} role="timer" aria-label={`${secondsLeft} seconds left`}>
            <span className={styles.timerLabel}><Timer size={14} aria-hidden="true" /> {secondsLeft}s left</span>
            <span className={styles.timerBar}>
              <span className={`${styles.timerFill} ${timerTone}`} style={{ width: `${Math.min(100, (secondsLeft / ttlSeconds) * 100)}%` }} />
            </span>
          </div>
          <div className={styles.attempts} aria-label={`${task.attemptsLeft} of ${maxAttempts} attempts left`}>
            <span className={styles.attemptsText}>{task.attemptsLeft} {task.attemptsLeft === 1 ? 'attempt' : 'attempts'} left</span>
            <span className={styles.pips} aria-hidden="true">
              {Array.from({ length: maxAttempts }).map((_, i) => (
                <span key={i} className={i < task.attemptsLeft ? styles.pipOn : styles.pipOff} />
              ))}
            </span>
          </div>
        </div>

        <div className={`${styles.slots} ${fieldError || shake ? styles.slotsError : ''} ${shake ? styles.shake : ''}`}>
          <input
            ref={inputRef}
            className={styles.slotInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            readOnly={verifying}
            maxLength={codeLength + 6}
            inputMode="text"
            autoCapitalize="characters"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label={`Type the ${codeLength} characters shown in the captcha image`}
            aria-invalid={Boolean(fieldError)}
            aria-describedby="captcha-help"
          />
          {Array.from({ length: codeLength }).map((_, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`${styles.slot} ${input[i] ? styles.slotFilled : ''} ${i === input.length && !verifying ? styles.slotActive : ''}`}
            >
              {input[i] || ''}
            </span>
          ))}
        </div>
        <p id="captcha-help" className={styles.help} data-error={Boolean(fieldError)}>
          {fieldError || 'Letters and numbers only. Not case sensitive.'}
        </p>

        <button type="submit" className={styles.primary} disabled={verifying || refreshing}>
          {verifying ? (
            <><Loader2 size={18} className={styles.spin} aria-hidden="true" /> Verifying…</>
          ) : (
            <><ShieldCheck size={18} aria-hidden="true" /> Verify &amp; claim +{reward} Gems</>
          )}
        </button>
      </form>
    );
  } else if (phase === 'success') {
    body = (
      <div className={styles.result}>
        <div className={styles.burst} aria-hidden="true">
          <span className={styles.burstRing} />
          <span className={styles.checkCircle}><CheckCircle2 size={44} /></span>
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <span key={a} className={styles.spark} style={{ '--a': `${a}deg` }} />
          ))}
        </div>
        <h3 className={styles.resultTitle}>+{lastReward} Gems earned</h3>
        <p className={styles.resultText}>
          Your answer was verified and the reward was added to your balance.
          {limitReached ? ' You have finished all tasks for today.' : ''}
        </p>
        {!limitReached && (
          <button ref={nextRef} type="button" className={styles.primary} onClick={start} disabled={startDisabled}>
            <Sparkles size={18} aria-hidden="true" /> {startLabel}
          </button>
        )}
      </div>
    );
  } else {
    // idle, failed, expired, limit
    const titles = {
      idle: 'Ready to earn Gems?',
      failed: 'Task locked for a moment',
      expired: 'This task expired',
      limit: 'Daily limit reached',
    };
    const texts = {
      idle: `Solve a captcha correctly to earn +${reward} Gems. Each task gives you ${ttlSeconds} seconds and ${maxAttempts} attempts.`,
      failed: 'You used all attempts. Take a short break, then start a new task.',
      expired: 'The time ran out before the answer was verified. Start a new task whenever you are ready.',
      limit: 'You completed every captcha task available today. Come back after the reset to earn more.',
    };
    body = (
      <div className={styles.result}>
        <span className={`${styles.heroIcon} ${phase === 'failed' || phase === 'expired' ? styles.heroBad : ''}`} aria-hidden="true">
          {phase === 'failed' || phase === 'expired' ? <Clock size={34} /> : <ShieldCheck size={34} />}
        </span>
        <h3 className={styles.resultTitle}>{titles[phase] || titles.idle}</h3>
        <p className={styles.resultText}>{texts[phase] || texts.idle}</p>
        <ul className={styles.rules}>
          <li><Timer size={15} aria-hidden="true" /> {ttlSeconds}s per task</li>
          <li><ShieldCheck size={15} aria-hidden="true" /> {maxAttempts} attempts</li>
          <li><Sparkles size={15} aria-hidden="true" /> +{reward} Gems</li>
        </ul>
        <button type="button" className={styles.primary} onClick={start} disabled={startDisabled}>
          {startDisabled && phase !== 'starting' ? <Clock size={18} aria-hidden="true" /> : <ShieldCheck size={18} aria-hidden="true" />} {startLabel}
        </button>
      </div>
    );
  }

  return (
    <section className={`${styles.card} ${styles.panel}`} aria-labelledby="task-title">
      <header className={styles.panelHead}>
        <div>
          <p className={styles.eyebrow}>TASK CENTER</p>
          <h2 id="task-title" className={styles.panelTitle}>Captcha task</h2>
        </div>
        <span className={`${styles.pill} ${styles[`pill_${pillTone}`]}`}>{pillText}</span>
      </header>

      {body}

      <div className={styles.messageWrap} aria-live="polite">
        {message && (
          <p className={styles.message} data-type={message.type} role={message.type === 'error' ? 'alert' : 'status'}>
            <MsgIcon size={16} aria-hidden="true" /> <span>{message.text}</span>
          </p>
        )}
      </div>
    </section>
  );
}
