import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowLeftRight, Gift, Menu, RefreshCw, ShieldCheck, Users, X } from 'lucide-react';
import Logo from './Logo';
import NotificationMenu from './NotificationMenu';
import WalletBadge from './WalletBadge';
import styles from './Header.module.css';

// Add one entry here for every new banner page
const NAV_ITEMS = [
  { to: '/captcha-tasks', label: 'Captcha Tasks', icon: ShieldCheck },
  { to: '/bonus-ves', label: 'Bonus VEs', icon: Gift },
  { to: '/swap-center', label: 'Swap Center', icon: ArrowLeftRight },
  { to: '/exchange-center', label: 'Exchange Center', icon: RefreshCw },
  { to: '/refer-earn', label: 'Refer & Earn', icon: Users },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuBtnRef = useRef(null);
  const { pathname } = useLocation();
  // the Captcha tab stays lit on the challenge and verification pages too
  const isCaptchaSection = (to) => to === '/captcha-tasks' && pathname.startsWith('/captcha');

  // close the phone menu after navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // close on Escape or when tapping outside the header
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    const onPointer = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [menuOpen]);

  return (
    <header className={styles.header} ref={headerRef}>
      <div className={styles.inner}>
        <Logo />

        <div className={styles.actions}>
          <div className={styles.walletSlot}><WalletBadge /></div>

          <NotificationMenu />

          <button type="button" className={styles.avatar} aria-label="Open profile menu">V</button>

          <button
            ref={menuBtnRef}
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* tablet and desktop: tab row */}
      <nav className={styles.nav} aria-label="Banner pages">
        {NAV_ITEMS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => (isActive || isCaptchaSection(to) ? `${styles.navLink} ${styles.active}` : styles.navLink)}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      {/* phones: menu panel */}
      {menuOpen && (
        <nav id="mobile-nav" className={styles.mobileNav} aria-label="Banner pages">
          <WalletBadge variant="menu" />
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => (isActive || isCaptchaSection(to) ? `${styles.mobileLink} ${styles.mobileActive}` : styles.mobileLink)}
            >
              <Icon size={20} aria-hidden="true" /> {label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
