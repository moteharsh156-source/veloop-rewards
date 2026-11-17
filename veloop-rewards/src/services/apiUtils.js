export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export const rand = (a, b) => a + Math.random() * (b - a);
export const latency = (min = 350, max = 750) => sleep(rand(min, max));

export function uid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/** Every API call resolves with { ok, code, message, ... } so the UI never needs try/catch. */
export const fail = (code, message, extra = {}) => ({ ok: false, code, message, ...extra });
