// DUMMY notifications for development only.
// Replace with real data from the backend later.
export const NOTIFICATIONS = [
  { id: 'bonus', type: 'bonus', title: 'Bonus VEs available', text: "Complete today's activities to preview extra VEs.", time: '2 min ago', to: '/bonus-ves', read: false },
  { id: 'refer', type: 'refer', title: 'A friend joined', text: 'Someone joined VELOOP Rewards with your referral code.', time: '1 hour ago', to: '/refer-earn', read: false },
  { id: 'captcha', type: 'captcha', title: 'New captcha tasks', text: 'Fresh captcha tasks are ready to solve.', time: '3 hours ago', to: '/captcha-tasks', read: false },
  { id: 'swap', type: 'swap', title: 'Swap Center', text: 'Preview a VE and SVE swap (demo rate).', time: 'Yesterday', to: '/swap-center', read: true },
];