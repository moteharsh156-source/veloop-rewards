import { useSyncExternalStore } from 'react';
import { ECONOMY } from './economy';
import { uid } from './apiUtils';

/**
 * The single saved record behind every page: wallet, captcha progress, bonus claims,
 * swaps, exchanges, referrals and a ledger of everything that changed a balance.
 * Pages READ it live with useStore(); only the API files WRITE it, through mutate().
 * A mutation is all-or-nothing: if a check fails, nothing is saved.
 * Saved data is signed, so edited data is detected and reset.
 *
 * Demo-grade: this lives in the browser. A real product keeps this on a server.
 */

const STORAGE_KEY = 'veloop.rewards.v3';
const SIGN_SALT = 'veloop-rewards-v3';
const REF_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export function dayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
export function endOfDay() {
  const d = new Date();
  d.setHours(24, 0, 0, 0);
  return d.getTime();
}

function hash(str) {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i += 1) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}
const sign = (data) => hash(SIGN_SALT + JSON.stringify(data));
const clone = (obj) => JSON.parse(JSON.stringify(obj));

function makeReferralCode() {
  let out = 'VEL-';
  for (let i = 0; i < 6; i += 1) out += REF_CHARS[Math.floor(Math.random() * REF_CHARS.length)];
  return out;
}

function freshState() {
  return {
    v: 3,
    userId: uid(),
    day: dayKey(),
    wallet: { gems: 0, ve: 0, sve: 0 },
    captcha: { completedToday: 0, lockedUntil: 0, history: [] },
    bonus: { claimed: { checkin: false, tasks: false }, claimedFriends: [], earnedToday: 0, history: [] },
    swap: { countToday: 0, history: [] },
    exchange: { history: [] },
    referral: { code: makeReferralCode(), friends: [], history: [] },
    ledger: [],
    notifReadAt: 0,
  };
}

const isCount = (n) => Number.isInteger(n) && n >= 0;
function isValid(d) {
  try {
    return Boolean(
      d && d.v === 3 && typeof d.userId === 'string' && typeof d.day === 'string' &&
      isCount(d.wallet.gems) && isCount(d.wallet.ve) && isCount(d.wallet.sve) &&
      isCount(d.captcha.completedToday) && Number.isFinite(d.captcha.lockedUntil) && Array.isArray(d.captcha.history) &&
      d.bonus.claimed && Array.isArray(d.bonus.claimedFriends) && isCount(d.bonus.earnedToday) && Array.isArray(d.bonus.history) &&
      isCount(d.swap.countToday) && Array.isArray(d.swap.history) &&
      Array.isArray(d.exchange.history) &&
      typeof d.referral.code === 'string' && Array.isArray(d.referral.friends) && Array.isArray(d.referral.history) &&
      Array.isArray(d.ledger) && Number.isFinite(d.notifReadAt),
    );
  } catch {
    return false;
  }
}

function rollDay(d) {
  const today = dayKey();
  if (d.day === today) return false;
  d.day = today;
  d.captcha.completedToday = 0;
  d.bonus.claimed = { checkin: false, tasks: false };
  d.bonus.earnedToday = 0;
  d.swap.countToday = 0;
  return true;
}

/* ---------------- store core ---------------- */
let state = null;
let tampered = false;
const listeners = new Set();

function readSaved() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { status: 'none' };
    const parsed = JSON.parse(raw);
    if (parsed && isValid(parsed.data) && parsed.sig === sign(parsed.data)) return { status: 'ok', data: parsed.data };
    return { status: 'bad' };
  } catch {
    return { status: 'bad' };
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ data: state, sig: sign(state) }));
  } catch {
    /* storage blocked: the app keeps working for this visit */
  }
}

function emit() {
  listeners.forEach((fn) => fn());
}

function ensure() {
  if (state) return state;
  const saved = readSaved();
  if (saved.status === 'ok') {
    state = saved.data;
    if (rollDay(state)) persist();
  } else {
    if (saved.status === 'bad') tampered = true;
    state = freshState();
    persist();
  }
  return state;
}

export function getState() {
  return ensure();
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * Run a change atomically. fn receives a draft copy; return { ok: true, ... } to save it,
 * or { ok: false, ... } to discard every change (unless commitOnFail is set).
 */
export function mutate(fn, { commitOnFail = false } = {}) {
  ensure();
  const draft = clone(state);
  rollDay(draft);
  const result = fn(draft);
  if (result && result.ok === false && !commitOnFail) return result;
  state = draft;
  persist();
  emit();
  return result;
}

export function useStore(selector = (s) => s) {
  return useSyncExternalStore(subscribe, () => selector(getState()));
}

/* ---------------- helpers used by the API files ---------------- */
export function applyDelta(draft, { gems = 0, ve = 0, sve = 0 }) {
  const next = { gems: draft.wallet.gems + gems, ve: draft.wallet.ve + ve, sve: draft.wallet.sve + sve };
  if (next.gems < 0 || next.ve < 0 || next.sve < 0) return false; // a balance can never go below zero
  draft.wallet = next;
  return true;
}

export function addLedger(draft, { type, label, delta = {} }) {
  draft.ledger.unshift({ id: uid(), at: Date.now(), type, label, delta });
  draft.ledger.length = Math.min(draft.ledger.length, ECONOMY.ledgerMax);
}

export function pushHistory(list, entry, max = 20) {
  list.unshift({ id: uid(), at: Date.now(), ...entry });
  list.length = Math.min(list.length, max);
}

export function consumeTampered() {
  const t = tampered;
  tampered = false;
  return t;
}

export function resetAll() {
  state = freshState();
  persist();
  emit();
}

export function markNotificationsRead() {
  mutate((d) => {
    d.notifReadAt = Date.now();
    return { ok: true };
  });
}

// keep several open tabs in sync
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key !== STORAGE_KEY) return;
    const saved = readSaved();
    if (saved.status === 'ok') {
      state = saved.data;
      emit();
    }
  });
}

if (import.meta.env.MODE === 'test' && typeof window !== 'undefined') {
  window.__rewardsTest = { state: () => getState(), reset: resetAll };
}
