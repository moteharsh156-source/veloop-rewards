/**
 * Mock "server" for the picture CAPTCHA. All rules are enforced HERE, never in components:
 *  - the challenge is sent as opaque images, so the page never receives which tiles are correct
 *  - Gems are credited only inside submitAnswer, after the selection is verified
 *  - one open task at a time, 30 s lifetime, 3 attempts, 3 refreshes per task
 *  - a wrong selection issues a brand-new challenge (the same grid can never be guessed twice)
 *  - a task can be rewarded once; duplicate / replayed submissions never pay twice
 *  - daily task limit and a cool-down after a failed task
 * Balances, progress and history are saved in the shared store (rewardsStore.js).
 *
 * Demo-grade: this runs in the browser. For real rewards, move it to a server.
 */
import { ECONOMY } from './economy';
import { addLedger, applyDelta, mutate, pushHistory, resetAll } from './rewardsStore';
import { fail, latency, rand, uid } from './apiUtils';

export const CAPTCHA_RULES = ECONOMY.captcha;
const RULES = CAPTCHA_RULES;
export { uid };

/* ---------------- drawing the tiles ---------------- */
const TILE = 140;
const PALETTES = [
  { l: '#d6c8ff', m: '#9079f0', d: '#6d52d6', o: '#4a35a8' }, // purple
  { l: '#bcd6ff', m: '#6f9bff', d: '#3f68e0', o: '#2a469f' }, // blue
  { l: '#fbe6a0', m: '#e0ae45', d: '#a87a1c', o: '#7a5510' }, // gold
  { l: '#a6efe4', m: '#3fc6b4', d: '#1f8f84', o: '#14665e' }, // teal
  { l: '#ffc4de', m: '#f07ab8', d: '#c14a8a', o: '#8c2f63' }, // rose
];

function poly(ctx, pts, fill) {
  ctx.beginPath();
  pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
}

function drawGem(ctx, p) {
  poly(ctx, [[0, -36], [31, -17], [0, -5], [-31, -17]], p.l);
  poly(ctx, [[-31, -17], [0, -5], [-21, 24]], p.m);
  poly(ctx, [[31, -17], [0, -5], [21, 24]], p.d);
  poly(ctx, [[-21, 24], [0, -5], [21, 24], [0, 38]], p.o);
  ctx.strokeStyle = 'rgba(255,255,255,.55)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  [[-31, -17], [0, -36], [31, -17], [21, 24], [0, 38], [-21, 24]].forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
  ctx.closePath();
  ctx.stroke();
}

function drawCoin(ctx, p) {
  const g = ctx.createRadialGradient(-10, -10, 4, 0, 0, 34);
  g.addColorStop(0, p.l);
  g.addColorStop(0.6, p.m);
  g.addColorStop(1, p.d);
  ctx.beginPath();
  ctx.arc(0, 0, 34, 0, Math.PI * 2);
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = p.o;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 25, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(255,255,255,.6)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = p.o;
  ctx.font = '700 28px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('V', 0, 2);
}

function drawShield(ctx, p) {
  const g = ctx.createLinearGradient(-28, -34, 28, 38);
  g.addColorStop(0, p.l);
  g.addColorStop(0.5, p.m);
  g.addColorStop(1, p.d);
  ctx.beginPath();
  ctx.moveTo(0, -36);
  ctx.lineTo(29, -25);
  ctx.lineTo(29, 3);
  ctx.bezierCurveTo(29, 22, 13, 32, 0, 39);
  ctx.bezierCurveTo(-13, 32, -29, 22, -29, 3);
  ctx.lineTo(-29, -25);
  ctx.closePath();
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = p.o;
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.strokeStyle = 'rgba(255,255,255,.9)';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(-12, 2);
  ctx.lineTo(-3, 12);
  ctx.lineTo(14, -10);
  ctx.stroke();
}

function drawStar(ctx, p) {
  const g = ctx.createRadialGradient(-8, -10, 4, 0, 0, 40);
  g.addColorStop(0, p.l);
  g.addColorStop(0.6, p.m);
  g.addColorStop(1, p.d);
  ctx.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const r = i % 2 === 0 ? 38 : 16;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.closePath();
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = p.o;
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.stroke();
}

function drawCrown(ctx, p) {
  const g = ctx.createLinearGradient(0, -30, 0, 26);
  g.addColorStop(0, p.l);
  g.addColorStop(0.5, p.m);
  g.addColorStop(1, p.d);
  ctx.beginPath();
  ctx.moveTo(-34, 24);
  ctx.lineTo(-34, -16);
  ctx.lineTo(-17, 2);
  ctx.lineTo(0, -28);
  ctx.lineTo(17, 2);
  ctx.lineTo(34, -16);
  ctx.lineTo(34, 24);
  ctx.closePath();
  ctx.fillStyle = g;
  ctx.fill();
  ctx.strokeStyle = p.o;
  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.stroke();
  ['#fff', '#fff', '#fff'].forEach((c, i) => {
    ctx.beginPath();
    ctx.arc(-18 + i * 18, 12, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,.85)';
    ctx.fill();
  });
}

const CATEGORIES = [
  { id: 'gem', label: 'gems', draw: drawGem },
  { id: 'coin', label: 'coins', draw: drawCoin },
  { id: 'shield', label: 'shields', draw: drawShield },
  { id: 'star', label: 'stars', draw: drawStar },
  { id: 'crown', label: 'crowns', draw: drawCrown },
];

const pick = (list) => list[Math.floor(Math.random() * list.length)];
function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function newCanvas() {
  const dpr = 2;
  const canvas = document.createElement('canvas');
  canvas.width = TILE * dpr;
  canvas.height = TILE * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  const bg = ctx.createLinearGradient(0, 0, TILE, TILE);
  bg.addColorStop(0, '#262d78');
  bg.addColorStop(1, '#10143f');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, TILE, TILE);
  const glow = ctx.createRadialGradient(TILE / 2, TILE / 2, 6, TILE / 2, TILE / 2, TILE * 0.7);
  glow.addColorStop(0, 'rgba(140,155,255,.22)');
  glow.addColorStop(1, 'rgba(140,155,255,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, TILE, TILE);
  for (let i = 0; i < 26; i += 1) {
    ctx.fillStyle = `rgba(255,255,255,${rand(0.03, 0.14)})`;
    ctx.fillRect(rand(0, TILE), rand(0, TILE), rand(1, 2.2), rand(1, 2.2));
  }
  return { canvas, ctx };
}

function renderIconTile(category, palette) {
  const { canvas, ctx } = newCanvas();
  ctx.save();
  ctx.translate(TILE / 2 + rand(-7, 7), TILE / 2 + rand(-6, 6));
  ctx.rotate(rand(-0.4, 0.4));
  const s = 1.2 * rand(0.86, 1.06);
  ctx.scale(s, s);
  category.draw(ctx, palette);
  ctx.restore();
  return canvas.toDataURL('image/png');
}

function renderCountTile(n, palette) {
  const { canvas, ctx } = newCanvas();
  const cells = shuffle([[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]]).slice(0, n);
  cells.forEach(([cx, cy]) => {
    ctx.save();
    ctx.translate(26 + cx * 44 + rand(-4, 4), 46 + cy * 48 + rand(-4, 4));
    ctx.rotate(rand(-0.3, 0.3));
    ctx.scale(0.5, 0.5);
    drawCoin(ctx, palette);
    ctx.restore();
  });
  return canvas.toDataURL('image/png');
}

/* ---------------- challenge builders ---------------- */
function buildSelect() {
  const target = pick(CATEGORIES);
  const others = CATEGORIES.filter((c) => c.id !== target.id);
  const k = 2 + Math.floor(Math.random() * 3); // 2 to 4 targets
  const flags = shuffle(Array.from({ length: 9 }, (_, i) => i < k));
  const tiles = flags.map((isTarget) => ({
    id: uid(),
    isTarget,
    image: renderIconTile(isTarget ? target : pick(others), pick(PALETTES)),
  }));
  return {
    type: 'select',
    prompt: `Select all ${target.label}`,
    hint: 'Tap every tile that matches, then verify.',
    columns: 3,
    minSelect: 1,
    maxSelect: 9,
    tiles,
    correct: new Set(tiles.filter((t) => t.isTarget).map((t) => t.id)),
  };
}

function buildOdd() {
  const a = pick(CATEGORIES);
  const b = pick(CATEGORIES.filter((c) => c.id !== a.id));
  const oddIndex = Math.floor(Math.random() * 6);
  const tiles = Array.from({ length: 6 }, (_, i) => ({
    id: uid(),
    isTarget: i === oddIndex,
    image: renderIconTile(i === oddIndex ? b : a, pick(PALETTES)),
  }));
  return {
    type: 'odd',
    prompt: 'Find the odd one out',
    hint: 'Tap the one tile whose shape is different.',
    columns: 3,
    minSelect: 1,
    maxSelect: 1,
    tiles,
    correct: new Set(tiles.filter((t) => t.isTarget).map((t) => t.id)),
  };
}

function buildCount() {
  const n = 2 + Math.floor(Math.random() * 4); // 2 to 5
  const counts = new Set([n]);
  while (counts.size < 4) counts.add(1 + Math.floor(Math.random() * 6));
  const palette = pick(PALETTES);
  const tiles = shuffle([...counts]).map((c) => ({ id: uid(), isTarget: c === n, image: renderCountTile(c, palette) }));
  return {
    type: 'count',
    prompt: `Which tile shows exactly ${n} coins?`,
    hint: 'Count carefully, then tap the matching tile.',
    columns: 2,
    minSelect: 1,
    maxSelect: 1,
    tiles,
    correct: new Set(tiles.filter((t) => t.isTarget).map((t) => t.id)),
  };
}

function buildChallenge() {
  let type;
  if (import.meta.env.MODE === 'test' && typeof window !== 'undefined' && window.__captchaTest?.forceType) {
    type = window.__captchaTest.forceType;
  } else {
    const roll = Math.random();
    type = roll < 0.5 ? 'select' : roll < 0.8 ? 'odd' : 'count';
  }
  if (type === 'odd') return buildOdd();
  if (type === 'count') return buildCount();
  return buildSelect();
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
  const c = t.challenge;
  return {
    id: t.id,
    type: c.type,
    prompt: c.prompt,
    hint: c.hint,
    columns: c.columns,
    minSelect: c.minSelect,
    maxSelect: c.maxSelect,
    tiles: c.tiles.map(({ id, image }) => ({ id, image })), // never includes which tiles are correct
    expiresAt: t.expiresAt,
    totalSeconds: RULES.ttlSeconds,
    attemptsLeft: RULES.maxAttempts - t.attempts,
    refreshesLeft: RULES.maxRefreshes - t.refreshes,
  };
}

function createTask() {
  const t = {
    id: uid(),
    challenge: buildChallenge(),
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

  t.challenge = buildChallenge();
  t.refreshes += 1;
  t.lastRefreshAt = Date.now(); // refreshing never extends the timer
  return { ok: true, task: publicTask(t) };
}

export async function submitAnswer({ taskId, selection, requestId }) {
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

    // input validation: a real list of known, unique tile ids within the allowed count
    const c = t.challenge;
    const ids = Array.isArray(selection) ? selection : null;
    const known = new Set(c.tiles.map((x) => x.id));
    if (!ids || ids.some((id) => typeof id !== 'string' || !known.has(id)) || new Set(ids).size !== ids.length) {
      return fail('INVALID_SELECTION', 'That selection is not valid for this challenge.');
    }
    if (ids.length < c.minSelect) return fail('INVALID_SELECTION', 'Select at least one tile first.');
    if (ids.length > c.maxSelect) return fail('INVALID_SELECTION', 'You selected too many tiles.');

    if (t.status === 'solved') {
      return fail('ALREADY_COMPLETED', 'This task was already completed. A reward can only be claimed once.');
    }
    if (t.status !== 'open') return fail('TASK_CLOSED', 'This task is closed. Start a new one.');
    if (Date.now() >= t.expiresAt) {
      closeExpired(t);
      return fail('EXPIRED', 'This task has expired. Start a new one.');
    }

    const isCorrect = ids.length === c.correct.size && ids.every((id) => c.correct.has(id));
    let result;

    if (isCorrect) {
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
        t.challenge = buildChallenge(); // a wrong pick always brings a brand-new challenge
        result = fail('WRONG', 'That was not the right selection.', { attemptsLeft: RULES.maxAttempts - t.attempts });
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
    peek: () => {
      const t = activeId ? tasks.get(activeId) : null;
      if (!t) return null;
      return {
        taskId: t.id,
        type: t.challenge.type,
        correct: [...t.challenge.correct],
        order: t.challenge.tiles.map((x) => ({ id: x.id, correct: t.challenge.correct.has(x.id) })),
      };
    },
    submit: submitAnswer,
    expireNow: () => {
      const t = activeId ? tasks.get(activeId) : null;
      if (t) t.expiresAt = Date.now() - 1;
    },
  });
}
