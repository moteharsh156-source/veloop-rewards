import { Zap, Gift, ShieldCheck, Trophy } from 'lucide-react';

// Static content for the Refer & Earn banner (no balances or demo values live here).
export const REFER_FEATURES = [
  { id: 'share', title: 'Easy to Share', text: 'Share your link or code in just one click.', icon: Zap, tone: 'blue' },
  { id: 'instant', title: 'Instant Rewards', text: 'Earn VEs as soon as a friend is verified.', icon: Gift, tone: 'purple' },
  { id: 'secure', title: '100% Secure', text: 'Every referral is checked before it pays.', icon: ShieldCheck, tone: 'teal' },
  { id: 'unlimited', title: 'Keep Earning', text: 'Invite more friends and earn more VEs.', icon: Trophy, tone: 'gold' },
];

export const REFER_STEPS = [
  'Share your referral code with a friend.',
  'Your friend joins VELOOP Rewards with your code.',
  'When they complete their first task, the server verifies it and pays your reward.',
];
