import { useMemo } from 'react';
import { ECONOMY } from '../services/economy';
import { endOfDay, useStore } from '../services/rewardsStore';

const R = ECONOMY.captcha;

/** Live captcha numbers from the shared store: the same on every page. */
export default function useCaptchaStats() {
  const captcha = useStore((s) => s.captcha);
  const gems = useStore((s) => s.wallet.gems);
  const lockedUntil = captcha.lockedUntil > Date.now() ? captcha.lockedUntil : 0;

  return useMemo(
    () => ({
      gems,
      completedToday: captcha.completedToday,
      dailyLimit: R.dailyLimit,
      gemsPerTask: R.gemsPerTask,
      ttlSeconds: R.ttlSeconds,
      maxAttempts: R.maxAttempts,
      maxRefreshes: R.maxRefreshes,
      resetsAt: endOfDay(),
      lockedUntil,
      history: captcha.history,
      limitReached: captcha.completedToday >= R.dailyLimit,
    }),
    [gems, captcha, lockedUntil],
  );
}
