import { Navigate, Route, Routes } from 'react-router-dom';
import { ArrowLeftRight, Gift, RefreshCw, Users } from 'lucide-react';
import Header from './components/Header/Header';
import CaptchaTasksPage from './pages/CaptchaTasksPage';
import BonusVEsPage from './pages/BonusVEsPage';
import SwapCenterPage from './pages/SwapCenterPage';
import ExchangeCenterPage from './pages/ExchangeCenterPage';
import ReferEarnPage from './pages/ReferEarnPage';
import FeaturePage from './pages/FeaturePage';

export default function App() {
  return (
    <>
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<Navigate to="/captcha-tasks" replace />} />

          {/* Banner pages */}
          <Route path="/captcha-tasks" element={<CaptchaTasksPage />} />
          <Route path="/bonus-ves" element={<BonusVEsPage />} />
          <Route path="/swap-center" element={<SwapCenterPage />} />
          <Route path="/exchange-center" element={<ExchangeCenterPage />} />
          <Route path="/refer-earn" element={<ReferEarnPage />} />

          {/* Destinations of the banner buttons (placeholders for now) */}
          <Route
            path="/swap"
            element={
              <FeaturePage
                title="Swap Center"
                description="Convert eligible reward balances between supported currencies."
                backTo="/swap-center"
                backLabel="Back to Swap banner"
                icon={ArrowLeftRight}
                accent="blue"
              />
            }
          />
          <Route
            path="/bonuses"
            element={
              <FeaturePage
                title="Bonus VEs"
                description="Explore bonus opportunities and unlock additional VEs through eligible activities."
                backTo="/bonus-ves"
                backLabel="Back to Bonus banner"
                icon={Gift}
                accent="gold"
              />
            }
          />

          <Route
            path="/exchange"
            element={
              <FeaturePage
                title="Exchange Center"
                description="Exchange eligible Gems into VEs and grow your VE balance."
                backTo="/exchange-center"
                backLabel="Back to Exchange banner"
                icon={RefreshCw}
                accent="purple"
              />
            }
          />

          <Route
            path="/refer"
            element={
              <FeaturePage
                title="Refer & Earn"
                description="Invite your friends to VELOOP Rewards and earn exciting rewards together."
                backTo="/refer-earn"
                backLabel="Back to Refer banner"
                icon={Users}
                accent="blue"
              />
            }
          />

          <Route path="*" element={<Navigate to="/captcha-tasks" replace />} />
        </Routes>
      </main>
    </>
  );
}