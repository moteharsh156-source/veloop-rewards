import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/captchaApi';
import useCaptchaStats from './useCaptchaStats';

/**
 * Controller for the Captcha page (picture challenge).
 * phase: starting | active | submitting | expired | limit | cooldown | error
 * It only collects the selection. Checking it and paying the reward happens on the
 * Verification page, through the server-side rules in captchaApi.js.
 */
export default function useCaptchaChallenge() {
  const navigate = useNavigate();
  const stats = useCaptchaStats();

  const [phase, setPhase] = useState('starting');
  const [task, setTask] = useState(null);
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [shake, setShake] = useState(0);
  const [cooldownLeft, setCooldownLeft] = useState(0);

  const busy = useRef(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  /* ----- start or resume a task ----- */
  const start = useCallback(async () => {
    if (busy.current) return;
    busy.current = true;
    setPhase('starting');
    setMessage(null);
    setSelected([]);
    const res = await api.startTask();
    busy.current = false;
    if (!mounted.current) return;

    if (res.ok) {
      setTask(res.task);
      setSecondsLeft(Math.max(0, Math.ceil((res.task.expiresAt - Date.now()) / 1000)));
      setPhase('active');
      if (res.resumed && res.task.attemptsLeft < stats.maxAttempts) {
        setMessage({ type: 'info', text: 'Here is a brand-new challenge. Your timer is still running.' });
      }
    } else if (res.code === 'DAILY_LIMIT') {
      setPhase('limit');
    } else if (res.code === 'COOLDOWN') {
      setPhase('cooldown');
    } else {
      setPhase('error');
      setMessage({ type: 'error', text: res.message || 'Could not start the task. Please try again.' });
    }
  }, [stats.maxAttempts]);

  useEffect(() => {
    start();
  }, [start]);

  /* ----- countdown while the task is open ----- */
  const expire = useCallback(async () => {
    if (!task || busy.current) return;
    busy.current = true;
    await api.expireTask(task.id);
    busy.current = false;
    if (!mounted.current) return;
    setTask(null);
    setSelected([]);
    setPhase('expired');
  }, [task]);

  useEffect(() => {
    if (phase !== 'active' || !task) return undefined;
    const tick = () => {
      const left = Math.max(0, Math.ceil((task.expiresAt - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0) expire();
    };
    tick();
    const id = setInterval(tick, 250);
    return () => clearInterval(id);
  }, [phase, task, expire]);

  /* ----- cool-down after a failed task ----- */
  useEffect(() => {
    if (phase !== 'cooldown') return undefined;
    const tick = () => {
      const left = Math.max(0, Math.ceil((stats.lockedUntil - Date.now()) / 1000));
      setCooldownLeft(left);
      if (left === 0) start();
    };
    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [phase, stats.lockedUntil, start]);

  /* ----- actions ----- */
  const toggle = useCallback(
    (id) => {
      if (phase !== 'active' || !task) return;
      setMessage(null);
      setSelected((sel) => {
        if (task.maxSelect === 1) return sel[0] === id ? [] : [id]; // single pick: choosing again swaps
        if (sel.includes(id)) return sel.filter((x) => x !== id);
        return sel.length < task.maxSelect ? [...sel, id] : sel;
      });
    },
    [phase, task],
  );

  const clear = useCallback(() => {
    setSelected([]);
    setMessage(null);
  }, []);

  const refresh = useCallback(async () => {
    if (phase !== 'active' || !task || refreshing || busy.current) return;
    setRefreshing(true);
    const res = await api.refreshTask(task.id);
    if (!mounted.current) return;
    setRefreshing(false);
    if (res.ok) {
      setTask(res.task);
      setSelected([]);
      setMessage({ type: 'info', text: 'New challenge loaded.' });
    } else if (res.code === 'EXPIRED') {
      setTask(null);
      setPhase('expired');
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  }, [phase, task, refreshing]);

  const canSubmit = Boolean(task) && selected.length >= task.minSelect && selected.length <= task.maxSelect;

  const submit = useCallback(() => {
    if (phase !== 'active' || !task || busy.current) return;
    if (!canSubmit) {
      setMessage({ type: 'error', text: task.maxSelect === 1 ? 'Pick one tile first.' : 'Select at least one tile first.' });
      setShake((n) => n + 1);
      return;
    }
    setPhase('submitting'); // blocks a second tap; the Verification page does the real check
    navigate('/captcha/verify', { state: { taskId: task.id, selection: selected, requestId: api.uid() } });
  }, [phase, task, canSubmit, selected, navigate]);

  return {
    phase, task, selected, toggle, clear, refresh, submit, start, canSubmit,
    message, secondsLeft, refreshing, shake, cooldownLeft, stats,
  };
}
