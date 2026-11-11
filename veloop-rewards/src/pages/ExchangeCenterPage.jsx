import { useNavigate } from 'react-router-dom';
import ExchangeCenterBanner from '../components/ExchangeCenterBanner/ExchangeCenterBanner';

export default function ExchangeCenterPage() {
  const navigate = useNavigate();
  return <ExchangeCenterBanner onOpen={() => navigate('/exchange')} />;
}