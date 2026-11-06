import { useNavigate } from 'react-router-dom';
import BonusVEsBanner from '../components/BonusVEsBanner/BonusVEsBanner';

export default function BonusVEsPage() {
  const navigate = useNavigate();
  return <BonusVEsBanner onExplore={() => navigate('/bonuses')} />;
}