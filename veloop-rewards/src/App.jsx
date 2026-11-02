import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import CaptchaTasksPage from './pages/CaptchaTasksPage';
import BonusVEsPage from './pages/BonusVEsPage';
 
export default function App() {
  return (
    <>
      <Header />
      <main className="page">
        <Routes>
          <Route path="/" element={<Navigate to="/captcha-tasks" replace />} />
          <Route path="/captcha-tasks" element={<CaptchaTasksPage />} />
          <Route path="/bonus-ves" element={<BonusVEsPage />} />
          <Route path="*" element={<Navigate to="/captcha-tasks" replace />} />
        </Routes>
      </main>
    </>
  );
}
