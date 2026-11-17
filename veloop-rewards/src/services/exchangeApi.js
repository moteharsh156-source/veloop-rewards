/**
 * Exchange Center "server": turns Gems into VE.
 * It re-checks the REAL Gem balance at the moment of conversion, deducts the Gems and
 * adds the VE in one all-or-nothing step. Nothing is ever refilled.
 */
import { ECONOMY } from './economy';
import { addLedger, applyDelta, mutate, pushHistory } from './rewardsStore';
import { fail, latency } from './apiUtils';

const R = ECONOMY.exchange;
const done = new Map(); // requestId -> result (replay protection)
let busy = false;

export const costFor = (ve) => ve * R.gemsPerVe;

export async function convert({ ve, requestId }) {
  if (requestId && done.has(requestId)) {
    await latency(150, 300);
    return done.get(requestId);
  }
  if (busy) return fail('BUSY', 'Another conversion is still being processed.');

  busy = true;
  try {
    await latency(500, 900);

    const amount = Number(ve);
    if (!Number.isInteger(amount)) return fail('INVALID_AMOUNT', 'Enter a whole number of VE.');
    if (amount < R.minVe) return fail('BELOW_MIN', `The minimum is ${R.minVe} VE.`);
    if (amount > R.maxVePerTransaction) {
      return fail('ABOVE_MAX', `You can convert at most ${R.maxVePerTransaction} VE at a time.`);
    }

    const result = mutate((d) => {
      const cost = costFor(amount);
      if (d.wallet.gems < cost) {
        return fail('INSUFFICIENT_GEMS', `You need ${cost} Gems but only have ${d.wallet.gems}.`, {
          needed: cost,
          have: d.wallet.gems,
        });
      }
      applyDelta(d, { gems: -cost, ve: amount });
      pushHistory(d.exchange.history, { gems: cost, ve: amount });
      addLedger(d, { type: 'exchange', label: `Exchanged ${cost} Gems for ${amount} VE`, delta: { gems: -cost, ve: amount } });
      return { ok: true, gems: cost, ve: amount };
    });

    if (requestId) done.set(requestId, result);
    return result;
  } finally {
    busy = false;
  }
}

/* Test helper: exists ONLY in `vite build --mode test`, stripped from normal builds. */
if (import.meta.env.MODE === 'test' && typeof window !== 'undefined') {
  window.__apiTest = Object.assign(window.__apiTest || {}, { convert });
}
