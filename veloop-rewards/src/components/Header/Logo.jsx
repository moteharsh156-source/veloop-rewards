import styles from './Header.module.css';
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className={styles.logo} aria-label="VELOOP Rewards home">
      <span className={styles.logoMark} aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M5 6l7 13 7-13" stroke="#161827" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={styles.logoText}>
        VELOOP <span className={styles.logoAccent}>Rewards</span>
      </span>
    </Link>
  );
}