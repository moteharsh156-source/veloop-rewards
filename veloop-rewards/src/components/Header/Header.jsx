import { NavLink } from 'react-router-dom';
import Logo from './Logo';
import NotificationMenu from './NotificationMenu';
import styles from './Header.module.css';

// Add one entry here for every new banner page
const NAV_ITEMS = [
  { to: '/captcha-tasks', label: 'Captcha Tasks' },
  { to: '/bonus-ves', label: 'Bonus VEs' },
  { to: '/swap-center', label: 'Swap Center' },
  { to: '/exchange-center', label: 'Exchange Center' },
  { to: '/refer-earn', label: 'Refer & Earn' },
];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Logo />

        <div className={styles.actions}>
          <span className={styles.status}>
            <span className={styles.dot} aria-hidden="true" />
            <span className={styles.statusText}>Rewards journey</span>
          </span>

          <NotificationMenu />

          <button type="button" className={styles.avatar} aria-label="Open profile menu">V</button>
        </div>
      </div>

      <nav className={styles.nav} aria-label="Banner pages">
        {NAV_ITEMS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => (isActive ? `${styles.navLink} ${styles.active}` : styles.navLink)}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}