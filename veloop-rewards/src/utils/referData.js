import { Zap, Gift, ShieldCheck, Trophy } from 'lucide-react';

// DUMMY values for development only.
// Use the latest approved referral rules before showing these as official.
export const REFER_DEMO = {
  code: 'VELOOP123',
  earn: 500,
  friend: 200,
};

export const REFER_FEATURES = [
  { id: 'share', title: 'Easy to Share', text: 'Share your link or code in just one click.', icon: Zap, tone: 'blue' },
  { id: 'instant', title: 'Instant Rewards', text: 'Earn VEs instantly when friends join.', icon: Gift, tone: 'purple' },
  { id: 'secure', title: '100% Secure', text: 'Secure referrals and real reward tracking.', icon: ShieldCheck, tone: 'teal' },
  { id: 'unlimited', title: 'Unlimited Earning', text: 'Invite more friends and earn more VEs.', icon: Trophy, tone: 'gold' },
];

export const REFER_STEPS = [
  'Share your referral code or link with a friend.',
  'Your friend joins VELOOP Rewards and completes eligible activities.',
  'Rewards are added to both of you once the milestone is reached.',
];