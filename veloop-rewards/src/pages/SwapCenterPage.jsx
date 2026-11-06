import { useNavigate } from 'react-router-dom';
import SwapCenterBanner from '../components/SwapCenterBanner/SwapCenterBanner';

export default function SwapCenterPage() {
  const navigate = useNavigate();
  return <SwapCenterBanner onOpen={() => navigate('/swap')} />;
}