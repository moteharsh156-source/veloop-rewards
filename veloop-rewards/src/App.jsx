import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import CaptchaTasksPage from './pages/CaptchaTasksPage';
import CaptchaChallengePage from './pages/CaptchaChallengePage';
import CaptchaVerifyPage from './pages/CaptchaVerifyPage';
import BonusVEsPage from './pages/BonusVEsPage';
import SwapCenterPage from './pages/SwapCenterPage';
import ExchangeCenterPage from './pages/ExchangeCenterPage';
import ReferEarnPage from './pages/ReferEarnPage';

export default function App() {
  const { pathname } = useLocation();

  // every page change starts at the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      {/* keyed by path, so each page fades and slides in */}
      <main key={pathname} className="page pageEnter">
        <Routes>
          <Route path="/" element={<Navigate to="/captcha-tasks" replace />} />

          {/* Captcha: overview (banner) > challenge > verification */}
          <Route path="/captcha-tasks" element={<CaptchaTasksPage />} />
          <Route path="/captcha" element={<CaptchaChallengePage />} />
          <Route path="/captcha/verify" element={<CaptchaVerifyPage />} />

          <Route path="/bonus-ves" element={<BonusVEsPage />} />
          <Route path="/swap-center" element={<SwapCenterPage />} />
          <Route path="/exchange-center" element={<ExchangeCenterPage />} />
          <Route path="/refer-earn" element={<ReferEarnPage />} />
          <Route path="*" element={<Navigate to="/captcha-tasks" replace />} />
        </Routes>
      </main>
    </>
  );
}
