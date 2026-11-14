import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, Bell, CheckCheck, Gift, ShieldCheck, Users } from 'lucide-react';
import { NOTIFICATIONS } from '../../utils/notificationsData';
import header from './Header.module.css';
import styles from './NotificationMenu.module.css';

const ICONS = { bonus: Gift, refer: Users, captcha: ShieldCheck, swap: ArrowLeftRight };

export default function NotificationMenu() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(NOTIFICATIONS);
  const wrapRef = useRef(null);
  const btnRef = useRef(null);
  const navigate = useNavigate();

  const unread = items.filter((i) => !i.read).length;

  // close on Escape or when clicking outside
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

  const markAll = () => setItems((list) => list.map((i) => ({ ...i, read: true })));

  const openItem = (item) => {
    setItems((list) => list.map((i) => (i.id === item.id ? { ...i, read: true } : i)));
    setOpen(false);
    navigate(item.to);
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
        {unread > 0 && <span className={header.badge} aria-hidden="true">{unread}</span>}
      </button>

      {open && (
        <div id="notification-panel" role="dialog" aria-label="Notifications" className={styles.panel}>
          <div className={styles.head}>
            <h2 className={styles.title}>Notifications</h2>
            <button type="button" className={styles.markAll} onClick={markAll} disabled={unread === 0}>
              <CheckCheck size={15} aria-hidden="true" /> Mark all as read
            </button>
          </div>

          {items.length === 0 ? (
            <p className={styles.empty}>You are all caught up.</p>
          ) : (
            <ul className={styles.list}>
              {items.map((item) => {
                const Icon = ICONS[item.type] || Bell;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      className={`${styles.item} ${item.read ? '' : styles.unread}`}
                      onClick={() => openItem(item)}
                    >
                      <span className={styles.icon}><Icon size={18} aria-hidden="true" /></span>
                      <span className={styles.text}>
                        <span className={styles.itemTitle}>{item.title}</span>
                        <span className={styles.itemText}>{item.text}</span>
                        <span className={styles.time}>{item.time}</span>
                      </span>
                      {!item.read && <span className={styles.dot} aria-label="Unread" />}
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