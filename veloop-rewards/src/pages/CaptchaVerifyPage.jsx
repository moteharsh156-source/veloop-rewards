import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import {
  AlertTriangle, ArrowRight, Check, CheckCircle2, Clock, Gem, Hourglass, Loader2, LayoutDashboard, RotateCcw, ScanSearch, ShieldCheck, Target, X, XCircle,
} from 'lucide-react';
import * as api from '../services/captchaApi';
import { sleep } from '../services/apiUtils';
import useCaptchaStats from '../hooks/useCaptchaStats';
import useCountUp from '../hooks/useCountUp';
import CaptchaStepper from '../components/CaptchaFlow/CaptchaStepper';
import styles from './CaptchaVerifyPage.module.css';

const STEPS = [
  { label: 'Checking your selection', Icon: ScanSearch },
  { label: 'Validating time and attempts', Icon: Hourglass },
  { label: 'Crediting your reward', Icon: Gem },
];

/* A refresh must never send the same answer twice: share one request, and remember its result. */
const inFlight = new Map();
const storeKey = (id) => `veloop.verify.${id}`;
function readSaved(id) {
  try {
    const raw = window.sessionStorage.getItem(storeKey(id));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function saveResult(id, res) {
  try {
    window.sessionStorage.setItem(storeKey(id), JSON.stringify(res));
  } catch {
    /* ignore */
  }
}
function submitOnce({ taskId, selection, requestId }) {
  if (!inFlight.has(requestId)) inFlight.set(requestId, api.submitAnswer({ taskId, selection, requestId }));
  return inFlight.get(requestId);
}

function useCountdown(until) {
  const [left, setLeft] = useState(() => Math.max(0, Math.ceil((until - Date.now()) / 1000)));
  useEffect(() => {
    if (!until) return undefined;
    const tick = () => setLeft(Math.max(0, Math.ceil((until - Date.now()) / 1000)));
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [until]);
  return left;
}

export default function CaptchaVerifyPage() {
  const { state } = useLocation();
  const requestId = state?.requestId;
  const stats = useCaptchaStats();

  const [result, setResult] = useState(() => (requestId ? readSaved(requestId) : null));
  const [stage, setStage] = useState(result ? 3 : 0);
  const cooldown = useCountdown(stats.lockedUntil);
  const earned = useCountUp(result?.ok ? result.gems : 0, 900);
  const balance = useCountUp(stats.gems, 900);

  useEffect(() => {
    if (!state?.taskId || !requestId || result) return undefined;
    let cancelled = false;
    const t1 = setTimeout(() => setStage((s) => Math.max(s, 1)), 400);
    const t2 = setTimeout(() => setStage((s) => Math.max(s, 2)), 1150);
    Promise.all([submitOnce(state), sleep(1900)]).then(([res]) => {
      if (cancelled) return;
      saveResult(requestId, res);
      setResult(res);
      setStage(3);
    });
    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // runs once for this verification
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state?.taskId || !requestId) return <Navigate to="/captcha" replace />;

  const done = stage === 3 && result;
  const code = result?.ok ? 'SUCCESS' : result?.code;
  const ok = Boolean(result?.ok);

  const VIEW = {
    SUCCESS: { tone: 'ok', Icon: CheckCircle2, title: 'Verified!', text: 'Your selection was correct. The reward has been added to your balance.' },
    WRONG: { tone: 'warn', Icon: XCircle, title: 'Not quite', text: `That was not the right selection. You have ${result?.attemptsLeft ?? 0} ${result?.attemptsLeft === 1 ? 'attempt' : 'attempts'} left, and a new challenge is ready.` },
    LOCKED: { tone: 'bad', Icon: AlertTriangle, title: 'Out of attempts', text: 'All attempts were used for this task. Take a short break before starting a new one.' },
    EXPIRED: { tone: 'bad', Icon: Clock, title: "Time's up", text: 'The timer ran out before the answer could be verified. No reward was added.' },
    DAILY_LIMIT: { tone: 'muted', Icon: Target, title: 'Daily limit reached', text: 'You have completed every captcha task for today. Come back after the reset.' },
  };
  const view = VIEW[code] || { tone: 'bad', Icon: AlertTriangle, title: 'Could not verify', text: result?.message || 'This verification session has ended. Please start again.' };
  const ViewIcon = view.Icon;

  const checkState = (i) => {
    if (!done) return stage > i ? 'done' : stage === i ? 'active' : 'wait';
    if (i === 2) return ok ? 'done' : 'fail';
    if (i === 1 && (code === 'EXPIRED' || code === 'DAILY_LIMIT')) return 'fail';
    if (i === 0 && (code === 'INVALID_SELECTION' || code === 'NOT_FOUND')) return 'fail';
    return 'done';
  };

  const limitNow = stats.limitReached;
  const canRetry = code === 'WRONG';
  const primary =
    ok && !limitNow ? { to: '/captcha', label: 'Next task' }
      : ok ? { to: '/captcha-tasks', label: 'Back to overview' }
        : canRetry ? { to: '/captcha', label: 'Try again' }
          : code === 'LOCKED' ? { to: '/captcha', label: cooldown > 0 ? `Try again in ${cooldown}s` : 'Start a new task', disabled: cooldown > 0 }
            : code === 'DAILY_LIMIT' ? { to: '/captcha-tasks', label: 'Back to overview' }
              : { to: '/captcha', label: 'Start a new task' };

  return (
    <div className={styles.page}>
      <CaptchaStepper current={done && ok ? 'reward' : 'verify'} />

      <section className={`${styles.card} ${done ? styles[`card_${view.tone}`] : ''}`} aria-labelledby="vf-title" aria-live="polite">
        <span className={`${styles.glow} ${done ? styles[`glow_${view.tone}`] : ''}`} aria-hidden="true" />

        {/* ---------- top: scanner while checking, result after ---------- */}
        {!done ? (
          <div className={styles.scanWrap}>
            <div className={styles.scanner} aria-hidden="true">
              <span className={styles.ring} />
              <span className={styles.ringSlow} />
              <span className={styles.shield}><ShieldCheck size={44} /></span>
            </div>
            <h1 id="vf-title" className={styles.title}>Verifying your answer</h1>
            <p className={styles.text}>Please wait a moment while the server checks your selection.</p>
          </div>
        ) : (
          <div className={styles.resultTop}>
            <div className={`${styles.badge} ${styles[`tone_${view.tone}`]}`} aria-hidden="true">
              {ok && [0, 60, 120, 180, 240, 300].map((a) => <span key={a} className={styles.spark} style={{ '--a': `${a}deg` }} />)}
              <span className={styles.badgeRing} />
              <ViewIcon size={46} />
            </div>
            <h1 id="vf-title" className={styles.title}>{view.title}</h1>
            <p className={styles.text}>{view.text}</p>
          </div>
        )}

        {/* ---------- the three checks ---------- */}
        <ol className={styles.checks} aria-label="Verification steps">
          {STEPS.map(({ label, Icon }, i) => {
            const s = checkState(i);
            const text = done && i === 2 && !ok ? 'No reward was added' : label;
            return (
              <li key={label} className={`${styles.check} ${styles[`c_${s}`]}`} style={{ '--i': i }}>
                <span className={styles.checkIcon}>
                  {s === 'done' ? <Check size={16} strokeWidth={3} aria-hidden="true" />
                    : s === 'fail' ? <X size={16} strokeWidth={3} aria-hidden="true" />
                      : s === 'active' ? <Loader2 size={16} className={styles.spin} aria-hidden="true" />
                        : <Icon size={15} aria-hidden="true" />}
                </span>
                <span className={styles.checkText}>{text}</span>
              </li>
            );
          })}
        </ol>

        {/* ---------- reward details (success only) ---------- */}
        {done && ok && (
          <div className={styles.reward}>
            <div className={styles.rewardMain}>
              <span className={styles.rewardGem} aria-hidden="true"><Gem size={30} /></span>
              <div>
                <p className={styles.rewardLabel}>Reward earned</p>
                <p className={styles.rewardValue} aria-label={`${result.gems} Gems earned`}>+{earned} <span>Gems</span></p>
              </div>
            </div>
            <div className={styles.rewardStats}>
              <div><span>New balance</span><strong>{balance.toLocaleString()} Gems</strong></div>
              <div><span>Tasks today</span><strong>{stats.completedToday} / {stats.dailyLimit}</strong></div>
            </div>
            <div className={styles.segments} role="progressbar" aria-label="Tasks completed today" aria-valuemin={0} aria-valuemax={stats.dailyLimit} aria-valuenow={stats.completedToday}>
              {Array.from({ length: stats.dailyLimit }).map((_, i) => (
                <span key={i} className={i < stats.completedToday ? styles.segOn : styles.segOff} style={{ '--i': i }} />
              ))}
            </div>
          </div>
        )}

        {done && code === 'WRONG' && (
          <div className={styles.attempts} aria-label={`${result.attemptsLeft} attempts left`}>
            {Array.from({ length: stats.maxAttempts }).map((_, i) => (
              <span key={i} className={i < result.attemptsLeft ? styles.pipOn : styles.pipOff} />
            ))}
          </div>
        )}

        {/* ---------- actions ---------- */}
        {done && (
          <div className={styles.actions}>
            {primary.disabled ? (
              <span className={`${styles.primary} ${styles.primaryOff}`} aria-disabled="true"><Clock size={18} aria-hidden="true" /> {primary.label}</span>
            ) : (
              <Link to={primary.to} className={styles.primary} replace>
                {canRetry ? <RotateCcw size={18} aria-hidden="true" /> : null}
                {primary.label} <ArrowRight size={18} aria-hidden="true" />
              </Link>
            )}
            <Link to="/captcha-tasks" className={styles.secondary} replace><LayoutDashboard size={16} aria-hidden="true" /> Overview</Link>
          </div>
        )}

        <p className={styles.ref}>Verification ref <strong>{requestId.slice(0, 8).toUpperCase()}</strong></p>
      </section>
    </div>
  );
}
