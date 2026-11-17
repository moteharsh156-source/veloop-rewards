/**
 * Swap Center "server": moves value between VE and SVE.
 * Checks the real balance, the whole-number amount and the daily swap limit,
 * then deducts and credits in one all-or-nothing step.
 */
import { ECONOMY } from './economy';
import { addLedger, applyDelta, mutate, pushHistory } from './rewardsStore';
import { fail, latency } from './apiUtils';

const R = ECONOMY.swap;
const CURRENCIES = ['ve', 'sve'];
const done = new Map();
let busy = false;

export const receiveFor = (from, to, amount) => Math.floor(amount * (R.rates[`${from}>${to}`] || 0));

export async function swap({ from, to, amount, requestId }) {
  if (requestId && done.has(requestId)) {
    await latency(150, 300);
    return done.get(requestId);
  }
  if (busy) return fail('BUSY', 'Another swap is still being processed.');

  busy = true;
  try {
    await latency(500, 900);

    const value = Number(amount);
    if (!CURRENCIES.includes(from) || !CURRENCIES.includes(to) || from === to) {
      return fail('INVALID_PAIR', 'Choose VE to SVE or SVE to VE.');
    }
    if (!Number.isInteger(value)) return fail('INVALID_AMOUNT', 'Enter a whole number.');
    if (value < R.minAmount) return fail('BELOW_MIN', `The minimum swap is ${R.minAmount}.`);
    if (value > R.maxPerSwap) return fail('ABOVE_MAX', `You can swap at most ${R.maxPerSwap} at a time.`);

    const result = mutate((d) => {
      if (d.swap.countToday >= R.dailyLimit) {
        return fail('DAILY_LIMIT', `You reached the limit of ${R.dailyLimit} swaps today. Try again tomorrow.`);
      }
      if (d.wallet[from] < value) {
        return fail('INSUFFICIENT_BALANCE', `You only have ${d.wallet[from]} ${from.toUpperCase()}.`, { have: d.wallet[from] });
      }
      const received = receiveFor(from, to, value);
      applyDelta(d, { [from]: -value, [to]: received });
      d.swap.countToday += 1;
      pushHistory(d.swap.history, { from, to, amount: value, received });
      addLedger(d, {
        type: 'swap',
        label: `Swapped ${value} ${from.toUpperCase()} for ${received} ${to.toUpperCase()}`,
        delta: { [from]: -value, [to]: received },
      });
      return { ok: true, from, to, amount: value, received };
    });

    if (requestId) done.set(requestId, result);
    return result;
  } finally {
    busy = false;
  }
}

/* Test helper: exists ONLY in `vite build --mode test`, stripped from normal builds. */
if (import.meta.env.MODE === 'test' && typeof window !== 'undefined') {
  window.__apiTest = Object.assign(window.__apiTest || {}, { swap });
}
