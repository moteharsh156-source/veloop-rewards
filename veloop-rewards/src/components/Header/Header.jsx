import { NavLink } from 'react-router-dom';
import { Bell } from 'lucide-react';
import Logo from './Logo';
import styles from './Header.module.css';

// Dummy data for development only
const NOTIFICATION_COUNT = 3;

// Add one entry here for every new banner page
const NAV_ITEMS = [
  { to: '/captcha-tasks', label: 'Captcha Tasks' },
  { to: '/bonus-ves', label: 'Bonus VEs' },
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

          <button type="button" className={styles.iconBtn} aria-label={`Notifications, ${NOTIFICATION_COUNT} new`}>
            <Bell size={18} aria-hidden="true" />
            <span className={styles.badge} aria-hidden="true">{NOTIFICATION_COUNT}</span>
          </button>

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