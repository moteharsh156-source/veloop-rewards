import { ClipboardCheck, Users, TrendingUp } from 'lucide-react';

// DUMMY values for development only.
// Do not present these as official reward amounts.
export const BONUS_ACTIVITIES = [
  { id: 'checkin', title: 'Daily Check-in', sub: 'Stay active', icon: ClipboardCheck, ve: 5 },
  { id: 'invite', title: 'Invite Friends', sub: 'Grow together', icon: Users, ve: 10 },
  { id: 'tasks', title: 'Complete Tasks', sub: 'Earn more', icon: TrendingUp, ve: 5 },
];