import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as api from '../services/captchaApi';
import { consumeTampered, endOfDay, getState, useStore } from '../services/rewardsStore';

const { codeLength, ttlSeconds, maxAttempts, failCooldownSeconds, dailyLimit, gemsPerTask } = api.CAPTCHA_RULES;

/**
 * State machine for the captcha task.
 * phase: idle | starting | active | verifying | success | failed | expired | limit
 * Balance, progress and history come LIVE from the shared store, so every page shows the
 * same numbers. This hook never changes the Gem balance itself.
 */
export default function useCaptchaTask() {
  const captcha = useStore((s) => s.captcha);
  const gems = useStore((s) => s.wallet.gems);

  const [phase, setPhase] = useState(() => (getState().captcha.completedToday >= dailyLimit ? 'limit' : 'idle'));
  const [task, setTask] = useState(null);
  const [input, setInputState] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [message, setMessage] = useState(() =>
    consumeTampered() ? { type: 'error', text: 'Saved data looked modified, so it was reset.' } : null,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [lastReward, setLastReward] = useState(0);
  const [errorTick, setErrorTick] = useState(0);

  const busy = useRef(false); // blocks double clicks / duplicate requests
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const lockedUntil = captcha.lockedUntil > Date.now() ? captcha.lockedUntil : 0;
  const snap = useMemo(
    () => ({
      gems,
      completedToday: captcha.completedToday,
      dailyLimit,
      gemsPerTask,
      resetsAt: endOfDay(),
      lockedUntil,
      history: captcha.history,
    }),
    [gems, captcha, lockedUntil],
  );

  /* ----- helpers ----- */
  const closeTask = useCallback((nextPhase, msg) => {
    setTask(null);
    setInputState('');
    setFieldError('');
    setPhase(nextPhase);
    setMessage(msg);
  }, []);

  const expire = useCallback(async () => {
    if (busy.current || !task) return;
    busy.current = true;
    await api.expireTask(task.id);
    busy.current = false;
    if (!mounted.current) return;
    closeTask('expired', { type: 'error', text: 'Time ran out. Start a new task to try again.' });
  }, [task, closeTask]);

  /* ----- countdown while a task is open ----- */
  useEffect(() => {
    if ((phase !== 'active' && phase !== 'verifying') || !task) return undefined;
    const tick = () => {
      const left = Math.max(0, Math.ceil((task.expiresAt - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0 && phase === 'active') expire();
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [phase, task, expire]);

  /* ----- cool-down after a failed task ----- */
  useEffect(() => {
    if (!lockedUntil) {
      setCooldownLeft(0);
      return undefined;
    }
    const tick = () => setCooldownLeft(Math.max(0, Math.ceil((lockedUntil - Date.now()) / 1000)));
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [lockedUntil]);

  /* ----- actions ----- */
  const start = useCallback(async () => {
    if (busy.current || phase === 'active' || phase === 'verifying') return; // no duplicate sessions
    busy.current = true;
    setPhase('starting');
    setMessage(null);
    setFieldError('');
    setInputState('');
    const res = await api.startTask();
    busy.current = false;
    if (!mounted.current) return;

    if (res.ok) {
      setTask(res.task);
      setSecondsLeft(Math.max(0, Math.ceil((res.task.expiresAt - Date.now()) / 1000)));
      setPhase('active');
      setMessage({
        type: 'info',
        text: res.resumed ? 'Resumed your current task.' : 'New captcha ready. Type the characters you see.',
      });
    } else if (res.code === 'DAILY_LIMIT') {
      setPhase('limit');
      setMessage({ type: 'info', text: res.message });
    } else if (res.code === 'COOLDOWN') {
      setPhase('failed');
      setMessage({ type: 'error', text: res.message });
    } else {
      setPhase('idle');
      setMessage({ type: 'error', text: res.message || 'Could not start the task. Please try again.' });
    }
  }, [phase]);

  const refresh = useCallback(async () => {
    if (phase !== 'active' || !task || refreshing || busy.current) return;
    setRefreshing(true);
    setFieldError('');
    const res = await api.refreshTask(task.id);
    if (!mounted.current) return;
    setRefreshing(false);
    if (res.ok) {
      setTask(res.task);
      setInputState('');
      setMessage({ type: 'info', text: 'New captcha loaded.' });
    } else if (res.code === 'EXPIRED') {
      closeTask('expired', { type: 'error', text: 'Time ran out. Start a new task to try again.' });
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  }, [phase, task, refreshing, closeTask]);

  const setInput = useCallback((raw) => {
    const upper = String(raw).toUpperCase();
    const cleaned = upper.replace(/[^A-Z0-9]/g, '');
    setInputState(cleaned.slice(0, codeLength));
    setFieldError(cleaned.length !== upper.length ? 'Only letters and numbers are allowed.' : '');
  }, []);

  const submit = useCallback(async () => {
    if (phase !== 'active' || !task || busy.current) return;

    if (!input) {
      setFieldError('Enter the characters shown in the image.');
      setErrorTick((n) => n + 1);
      return;
    }
    if (input.length < codeLength) {
      setFieldError(`Enter all ${codeLength} characters (${input.length}/${codeLength}).`);
      setErrorTick((n) => n + 1);
      return;
    }

    busy.current = true;
    setPhase('verifying');
    setFieldError('');
    setMessage(null);
    const res = await api.submitAnswer({ taskId: task.id, answer: input, requestId: api.uid() });
    busy.current = false;
    if (!mounted.current) return;

    if (res.ok) {
      setLastReward(res.gems);
      closeTask('success', { type: 'success', text: `Verified! ${res.gems} Gems were added to your balance.` });
      return;
    }

    switch (res.code) {
      case 'WRONG':
        setPhase('active');
        setTask((t) => (t ? { ...t, attemptsLeft: res.attemptsLeft } : t));
        setInputState('');
        setErrorTick((n) => n + 1);
        setMessage({
          type: 'error',
          text: `Incorrect code. ${res.attemptsLeft} ${res.attemptsLeft === 1 ? 'attempt' : 'attempts'} left.`,
        });
        break;
      case 'LOCKED':
        closeTask('failed', {
          type: 'error',
          text: `Too many incorrect attempts. You can try again in ${failCooldownSeconds}s.`,
        });
        break;
      case 'EXPIRED':
        closeTask('expired', { type: 'error', text: 'Time ran out. Start a new task to try again.' });
        break;
      case 'DAILY_LIMIT':
        closeTask('limit', { type: 'info', text: res.message });
        break;
      case 'ALREADY_COMPLETED':
      case 'TASK_CLOSED':
      case 'NOT_FOUND':
        closeTask('idle', { type: 'error', text: res.message });
        break;
      default:
        setPhase('active');
        setMessage({ type: 'error', text: res.message || 'Something went wrong. Please try again.' });
    }
  }, [phase, task, input, closeTask]);

  const resetDemo = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    await api.resetAllData();
    busy.current = false;
    if (!mounted.current) return;
    closeTask('idle', { type: 'info', text: 'All data was reset to zero.' });
  }, [closeTask]);

  const limitReached = snap.completedToday >= snap.dailyLimit;

  return {
    phase, snap, task, input, setInput, fieldError, message, refreshing,
    secondsLeft, cooldownLeft, lastReward, errorTick, limitReached,
    ttlSeconds, maxAttempts, codeLength,
    start, refresh, submit, resetDemo,
  };
}
