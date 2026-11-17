/**
 * Business rules for the whole rewards system (one place to change them).
 * These are working rules for development: replace them with the approved values
 * before presenting them as official.
 */
export const ECONOMY = {
  captcha: {
    codeLength: 5,
    charset: 'ABCDEFGHJKMNPQRSTUVWXYZ23456789', // no 0/O/1/I/L: easy to mix up
    ttlSeconds: 30,
    maxAttempts: 3,
    maxRefreshes: 3,
    refreshCooldownMs: 1500,
    failCooldownSeconds: 15,
    dailyLimit: 10,
    gemsPerTask: 5,
    historyMax: 20,
  },
  exchange: { gemsPerVe: 10, minVe: 1, maxVePerTransaction: 100 },
  swap: {
    minAmount: 1,
    maxPerSwap: 10000,
    dailyLimit: 5,
    rates: { 've>sve': 1, 'sve>ve': 1 },
  },
  bonus: {
    checkin: { ve: 2 },
    tasks: { required: 3, ve: 5 },
    invite: { required: 1, ve: 10 },
  },
  referral: { referrerVe: 20, friendVe: 10, maxFriends: 10 },
  ledgerMax: 100,
};
