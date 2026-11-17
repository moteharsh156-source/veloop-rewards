/**
 * Mock "server" for the CAPTCHA task. All rules are enforced HERE, never in components:
 *  - the correct answer never leaves this module (the UI only receives an image)
 *  - Gems are credited only inside submitAnswer, after the answer is verified
 *  - one open task at a time, 30 s lifetime, 3 attempts, 3 refreshes per task
 *  - a task can be rewarded once; duplicate / replayed submissions never pay twice
 *  - daily task limit and a cool-down after a failed task
 * Balances, progress and history are saved in the shared store (rewardsStore.js).
 */
import { ECONOMY } from './economy';
import { addLedger, applyDelta, mutate, pushHistory, resetAll } from './rewardsStore';
import { fail, latency, rand, uid } from './apiUtils';

export const CAPTCHA_RULES = ECONOMY.captcha;
const RULES = CAPTCHA_RULES;
export { uid };

const IMG_W = 260;
const IMG_H = 88;

/* ---------------- captcha image (the answer is only ever drawn, never sent) ---------------- */
function makeCode() {
  let out = '';
  for (let i = 0; i < RULES.codeLength; i += 1) {
    out += RULES.charset[Math.floor(Math.random() * RULES.charset.length)];
  }
  return out;
}

function renderImage(code) {
  const dpr = 2;
  const canvas = document.createElement('canvas');
  canvas.width = IMG_W * dpr;
  canvas.height = IMG_H * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const bg = ctx.createLinearGradient(0, 0, IMG_W, IMG_H);
  bg.addColorStop(0, '#e8e8f4');
  bg.addColorStop(1, '#cfcfe4');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, IMG_W, IMG_H);

  for (let i = 0; i < 120; i += 1) {
    ctx.fillStyle = `rgba(43,43,64,${rand(0.05, 0.3)})`;
    ctx.fillRect(rand(0, IMG_W), rand(0, IMG_H), rand(1, 2.5), rand(1, 2.5));
  }

  const colors = ['#2b2b40', '#3a2f6b', '#1f2a5c'];
  const step = IMG_W / (code.length + 1);
  [...code].forEach((ch, i) => {
    ctx.save();
    ctx.translate(step * (i + 1) + rand(-3, 3), IMG_H / 2 + rand(-7, 7));
    ctx.rotate(rand(-0.32, 0.32));
    ctx.transform(1, rand(-0.18, 0.18), rand(-0.18, 0.18), 1, 0, 0);
    ctx.font = `700 ${Math.round(rand(40, 48))}px Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = colors[i % colors.length];
    ctx.fillText(ch, 0, 0);
    ctx.restore();
  });

  ctx.lineWidth = 1.6;
  for (let i = 0; i < 4; i += 1) {
    ctx.strokeStyle = `rgba(43,43,64,${rand(0.35, 0.6)})`;
    ctx.beginPath();
    ctx.moveTo(rand(0, 30), rand(0, IMG_H));
    ctx.bezierCurveTo(rand(60, 110), rand(0, IMG_H), rand(150, 200), rand(0, IMG_H), IMG_W - rand(0, 30), rand(0, IMG_H));
    ctx.stroke();
  }
  return canvas.toDataURL('image/png');
}

/* ---------------- tasks (server memory, not saved) ---------------- */
const tasks = new Map();
let activeId = null;

function taskLifetimeMs() {
  if (import.meta.env.MODE === 'test' && typeof window !== 'undefined' && window.__captchaTest?.ttlMs) {
    return window.__captchaTest.ttlMs;
  }
  return RULES.ttlSeconds * 1000;
}

function publicTask(t) {
  return {
    id: t.id,
    image: t.image,
    expiresAt: t.expiresAt,
    attemptsLeft: RULES.maxAttempts - t.attempts,
    refreshesLeft: RULES.maxRefreshes - t.refreshes,
    length: RULES.codeLength,
  };
}

function createTask() {
  const code = makeCode();
  const t = {
    id: uid(),
    code,
    image: renderImage(code),
    expiresAt: Date.now() + taskLifetimeMs(),
    attempts: 0,
    refreshes: 0,
    lastRefreshAt: 0,
    busy: false,
    status: 'open',
    requests: new Map(), // requestId -> result (replay protection)
  };
  tasks.set(t.id, t);
  activeId = t.id;
  if (tasks.size > 25) tasks.delete(tasks.keys().next().value);
  return t;
}

function closeExpired(t) {
  if (t.status !== 'open') return;
  t.status = 'expired';
  if (activeId === t.id) activeId = null;
  mutate((d) => {
    pushHistory(d.captcha.history, { status: 'expired', gems: 0 }, RULES.historyMax);
    return { ok: true };
  });
}

/* ---------------- public API ---------------- */
export async function startTask() {
  await latency();

  const gate = mutate((d) => {
    if (d.captcha.completedToday >= RULES.dailyLimit) {
      return fail('DAILY_LIMIT', 'You have completed all captcha tasks for today.');
    }
    if (d.captcha.lockedUntil > Date.now()) {
      return fail('COOLDOWN', 'Please wait for the cool-down to finish.', { retryAt: d.captcha.lockedUntil });
    }
    return { ok: true };
  });
  if (!gate.ok) return gate;

  const now = Date.now();
  let t = activeId ? tasks.get(activeId) : null;
  if (t && t.status === 'open' && now < t.expiresAt) {
    return { ok: true, resumed: true, task: publicTask(t) }; // never two sessions at once
  }
  if (t && t.status === 'open') closeExpired(t);

  t = createTask();
  return { ok: true, resumed: false, task: publicTask(t) };
}

export async function refreshTask(taskId) {
  await latency(250, 500);
  const t = tasks.get(taskId);
  if (!t) return fail('NOT_FOUND', 'This task no longer exists. Start a new one.');
  if (t.status !== 'open') return fail('TASK_CLOSED', 'This task is closed. Start a new one.');
  if (Date.now() >= t.expiresAt) {
    closeExpired(t);
    return fail('EXPIRED', 'This task has expired.');
  }
  if (t.busy) return fail('BUSY', 'Your answer is being checked.');
  if (Date.now() - t.lastRefreshAt < RULES.refreshCooldownMs) {
    return fail('TOO_FAST', 'Please wait a moment before refreshing again.');
  }
  if (t.refreshes >= RULES.maxRefreshes) return fail('REFRESH_LIMIT', 'No refreshes left for this task.');

  t.code = makeCode();
  t.image = renderImage(t.code);
  t.refreshes += 1;
  t.lastRefreshAt = Date.now(); // refreshing never extends the timer
  return { ok: true, task: publicTask(t) };
}

export async function submitAnswer({ taskId, answer, requestId }) {
  const t = tasks.get(taskId);
  if (!t) {
    await latency(150, 300);
    return fail('NOT_FOUND', 'This task no longer exists. Start a new one.');
  }

  // replay: the same request id always returns the same result and never pays twice
  if (requestId && t.requests.has(requestId)) {
    await latency(150, 300);
    return t.requests.get(requestId);
  }
  if (t.busy) return fail('BUSY', 'Your previous answer is still being checked.');

  t.busy = true;
  try {
    await latency(500, 900);

    const value = String(answer ?? '').trim().toUpperCase();
    if (!value) return fail('EMPTY', 'Enter the characters shown in the image.');
    if (!/^[A-Z0-9]+$/.test(value)) return fail('INVALID_FORMAT', 'Only letters and numbers are allowed.');
    if (value.length !== RULES.codeLength) return fail('INVALID_LENGTH', `Enter all ${RULES.codeLength} characters.`);

    if (t.status === 'solved') {
      return fail('ALREADY_COMPLETED', 'This task was already completed. A reward can only be claimed once.');
    }
    if (t.status !== 'open') return fail('TASK_CLOSED', 'This task is closed. Start a new one.');
    if (Date.now() >= t.expiresAt) {
      closeExpired(t);
      return fail('EXPIRED', 'This task has expired. Start a new one.');
    }

    let result;
    if (value === t.code) {
      result = mutate((d) => {
        if (d.captcha.completedToday >= RULES.dailyLimit) {
          return fail('DAILY_LIMIT', 'You have completed all captcha tasks for today.');
        }
        applyDelta(d, { gems: RULES.gemsPerTask }); // the only place Gems are ever credited
        d.captcha.completedToday += 1;
        pushHistory(d.captcha.history, { status: 'success', gems: RULES.gemsPerTask }, RULES.historyMax);
        addLedger(d, { type: 'captcha', label: 'Captcha task completed', delta: { gems: RULES.gemsPerTask } });
        return { ok: true, code: 'SUCCESS', gems: RULES.gemsPerTask };
      });
      if (result.ok) {
        t.status = 'solved';
        if (activeId === t.id) activeId = null;
      }
    } else {
      t.attempts += 1;
      if (t.attempts >= RULES.maxAttempts) {
        t.status = 'failed';
        if (activeId === t.id) activeId = null;
        result = mutate(
          (d) => {
            d.captcha.lockedUntil = Date.now() + RULES.failCooldownSeconds * 1000;
            pushHistory(d.captcha.history, { status: 'failed', gems: 0 }, RULES.historyMax);
            return fail('LOCKED', 'Too many incorrect attempts.', { attemptsLeft: 0 });
          },
          { commitOnFail: true },
        );
      } else {
        result = fail('WRONG', 'Incorrect code.', { attemptsLeft: RULES.maxAttempts - t.attempts });
      }
    }

    if (requestId) t.requests.set(requestId, result);
    return result;
  } finally {
    t.busy = false;
  }
}

export async function expireTask(taskId) {
  await latency(100, 220);
  const t = tasks.get(taskId);
  if (t && t.status === 'open' && Date.now() >= t.expiresAt) closeExpired(t);
  return { ok: true };
}

/** Testing only: wipes the whole saved record (balances, history, referrals, ...). */
export async function resetAllData() {
  await latency(120, 240);
  tasks.clear();
  activeId = null;
  resetAll();
  return { ok: true };
}

/* Test helpers: exist ONLY in `vite build --mode test`, stripped from normal builds. */
if (import.meta.env.MODE === 'test' && typeof window !== 'undefined') {
  window.__captchaTest = window.__captchaTest || {};
  Object.assign(window.__captchaTest, {
    peek: () => (activeId ? tasks.get(activeId)?.code : null),
    expireNow: () => {
      const t = activeId ? tasks.get(activeId) : null;
      if (t) t.expiresAt = Date.now() - 1;
    },
  });
}
