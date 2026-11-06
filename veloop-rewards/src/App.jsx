import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import CaptchaTasksPage from './pages/CaptchaTasksPage';
import BonusVEsPage from './pages/BonusVEsPage';
import SwapCenterPage from './pages/SwapCenterPage';
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

          {/* Destinations of the banner buttons (placeholders for now) */}
          <Route
            path="/swap"
            element={
              <FeaturePage
                title="Swap Center"
                description="Convert eligible reward balances between supported currencies."
                backTo="/swap-center"
                backLabel="Back to Swap banner"
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
              />
            }
          />

          <Route path="*" element={<Navigate to="/captcha-tasks" replace />} />
        </Routes>
      </main>
    </>
  );
}