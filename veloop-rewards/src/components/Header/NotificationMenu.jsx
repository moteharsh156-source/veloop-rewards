import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, Bell, CheckCheck, Gift, RefreshCw, ShieldCheck, Users } from 'lucide-react';
import { markNotificationsRead, useStore } from '../../services/rewardsStore';
import { formatDelta, formatWhen } from '../../utils/format';
import header from './Header.module.css';
import styles from './NotificationMenu.module.css';

const ICONS = { captcha: ShieldCheck, bonus: Gift, referral: Users, swap: ArrowLeftRight, exchange: RefreshCw };
const PAGES = {
  captcha: '/captcha-tasks',
  bonus: '/bonus-ves',
  referral: '/refer-earn',
  swap: '/swap-center',
  exchange: '/exchange-center',
};

/** Notifications are built from the real activity ledger: nothing is made up. */
export default function NotificationMenu() {
  const ledger = useStore((s) => s.ledger);
  const readAt = useStore((s) => s.notifReadAt);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const wasOpen = useRef(false);
  const navigate = useNavigate();

  const items = ledger.slice(0, 8);
  const unread = ledger.filter((e) => e.at > readAt).length;
  const unreadLabel = unread > 9 ? '9+' : String(unread);

  // opening shows what is new; closing marks it as read
  useEffect(() => {
    if (wasOpen.current && !open) markNotificationsRead();
    wasOpen.current = open;
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onPointer = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onPointer);
    };
  }, [open]);

  const openItem = (entry) => {
    setOpen(false);
    navigate(PAGES[entry.type] || '/captcha-tasks');
  };

  return (
    <div className={styles.wrap} ref={wrapRef}>
      <button
        ref={btnRef}
        type="button"
        className={header.iconBtn}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="notification-panel"
        aria-label={unread > 0 ? `Notifications, ${unread} unread` : 'Notifications, none unread'}
      >
        <Bell size={18} aria-hidden="true" />
        {unread > 0 && <span className={header.badge} aria-hidden="true">{unreadLabel}</span>}
      </button>

      {open && (
        <div id="notification-panel" role="dialog" aria-label="Notifications" className={styles.panel}>
          <div className={styles.head}>
            <h2 className={styles.title}>Notifications</h2>
            <button type="button" className={styles.markAll} onClick={() => markNotificationsRead()} disabled={unread === 0}>
              <CheckCheck size={15} aria-hidden="true" /> Mark all as read
            </button>
          </div>

          {items.length === 0 ? (
            <p className={styles.empty}>No activity yet. Solve a captcha to earn your first Gems and it will show up here.</p>
          ) : (
            <ul className={styles.list}>
              {items.map((item) => {
                const Icon = ICONS[item.type] || Bell;
                const isNew = item.at > readAt;
                return (
                  <li key={item.id}>
                    <button type="button" className={`${styles.item} ${isNew ? styles.unread : ''}`} onClick={() => openItem(item)}>
                      <span className={styles.icon}><Icon size={18} aria-hidden="true" /></span>
                      <span className={styles.text}>
                        <span className={styles.itemTitle}>{item.label}</span>
                        {formatDelta(item.delta) && <span className={styles.itemText}>{formatDelta(item.delta)}</span>}
                        <span className={styles.time}>{formatWhen(item.at)}</span>
                      </span>
                      {isNew && <span className={styles.dot} aria-label="New" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
