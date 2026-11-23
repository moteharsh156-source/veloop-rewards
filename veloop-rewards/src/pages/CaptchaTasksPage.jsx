import { useNavigate } from 'react-router-dom';
import CaptchaTasksBanner from '../components/CaptchaTasksBanner/CaptchaTasksBanner';
import { HistoryCard, HowItWorks, StatsCard } from '../components/CaptchaOverview/CaptchaOverview';
import overview from '../components/CaptchaOverview/CaptchaOverview.module.css';
import useCaptchaStats from '../hooks/useCaptchaStats';
import styles from './CaptchaTasksPage.module.css';

/** Banner page: promo hero + overview. The challenge itself lives on its own page (/captcha). */
export default function CaptchaTasksPage() {
  const navigate = useNavigate();
  const stats = useCaptchaStats();

  return (
    <div className={styles.stack}>
      <CaptchaTasksBanner stats={stats} onStart={() => navigate('/captcha')} />
      <HowItWorks />
      <div className={overview.row}>
        <StatsCard stats={stats} />
        <HistoryCard stats={stats} />
      </div>
    </div>
  );
}
