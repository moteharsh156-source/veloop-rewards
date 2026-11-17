import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeftRight, CheckCircle2, History, Info, Loader2 } from 'lucide-react';
import { useStore } from '../../services/rewardsStore';
import { ECONOMY } from '../../services/economy';
import { receiveFor, swap } from '../../services/swapApi';
import { uid } from '../../services/apiUtils';
import { formatWhen } from '../../utils/format';
import ui from '../shared/Panels.module.css';

const R = ECONOMY.swap;
const MSG_ICON = { success: CheckCircle2, error: AlertCircle, info: Info };

export default function SwapPanel({ direction, onFlip, panelRef, inputRef }) {
  const wallet = useStore((s) => s.wallet);
  const countToday = useStore((s) => s.swap.countToday);
  const history = useStore((s) => s.swap.history);

  const [raw, setRaw] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const [from, to] = direction === 'sve-ve' ? ['sve', 've'] : ['ve', 'sve'];
  const F = from.toUpperCase();
  const T = to.toUpperCase();
  const balance = wallet[from];
  const swapsLeft = Math.max(0, R.dailyLimit - countToday);
  const maxAmount = Math.min(balance, R.maxPerSwap);

  const amount = raw === '' ? NaN : Number(raw);
  const whole = Number.isInteger(amount);
  const inRange = whole && amount >= R.minAmount && amount <= R.maxPerSwap;
  const tooMuch = inRange && amount > balance;
  const receive = inRange ? receiveFor(from, to, amount) : 0;

  let help = `Enter how many ${F} to swap.`;
  if (raw !== '' && !whole) help = 'Enter a whole number.';
  else if (raw !== '' && amount < R.minAmount) help = `The minimum swap is ${R.minAmount}.`;
  else if (raw !== '' && amount > R.maxPerSwap) help = `The maximum is ${R.maxPerSwap} per swap.`;
  else if (tooMuch) help = `You only have ${balance} ${F}.`;
  else if (inRange) help = `You will receive ${receive} ${T}.`;
  const helpError = raw !== '' && (!inRange || tooMuch);

  const onSwap = async () => {
    if (busy) return;
    if (swapsLeft === 0) {
      setMessage({ type: 'error', text: `You reached the limit of ${R.dailyLimit} swaps today. Try again tomorrow.` });
      return;
    }
    if (!inRange || tooMuch) {
      setMessage({ type: 'error', text: raw === '' ? `Enter how many ${F} to swap.` : help });
      return;
    }
    setBusy(true);
    setMessage(null);
    const res = await swap({ from, to, amount, requestId: uid() });
    setBusy(false);
    if (res.ok) {
      setMessage({ type: 'success', text: `Swapped ${res.amount} ${F} for ${res.received} ${T}.` });
      setRaw('');
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  const MsgIcon = message ? MSG_ICON[message.type] || Info : null;

  return (
    <div className={ui.grid} ref={panelRef} id="swap-panel">
      <div className={ui.main}>
        <section className={ui.card} aria-labelledby="sw-title">
          <header className={ui.head}>
            <div>
              <p className={ui.eyebrow}>SWAP</p>
              <h2 id="sw-title" className={ui.title}>Swap {F} for {T}</h2>
            </div>
            <span className={`${ui.pill} ${swapsLeft === 0 ? ui.pill_muted : ui.pill_blue}`}>{swapsLeft} of {R.dailyLimit} swaps left today</span>
          </header>

          <div className={ui.tiles}>
            <div className={ui.tile}>
              <span className={`${ui.tileIcon} ${ui.icVe}`} aria-hidden="true">VE</span>
              <div><p className={ui.tileLabel}>Your VE</p><p className={ui.tileValue}>{wallet.ve.toLocaleString()}</p></div>
            </div>
            <div className={ui.tile}>
              <span className={`${ui.tileIcon} ${ui.icSve}`} aria-hidden="true">SVE</span>
              <div><p className={ui.tileLabel}>Your SVE</p><p className={ui.tileValue}>{wallet.sve.toLocaleString()}</p></div>
            </div>
          </div>

          <div className={ui.dirRow}>
            <div className={ui.dirBox}><span>From</span><strong>{F}</strong></div>
            <button type="button" className={ui.dirFlip} onClick={() => { onFlip(); setRaw(''); setMessage(null); }} disabled={busy} aria-label={`Switch direction. Now swapping ${F} to ${T}`}>
              <ArrowLeftRight size={20} aria-hidden="true" />
            </button>
            <div className={ui.dirBox}><span>To</span><strong>{T}</strong></div>
          </div>

          {balance === 0 && (
            <div className={ui.notice}>
              {from === 've' ? (
                <>
                  <p>You have no VE to swap yet. Convert your Gems into VE first.</p>
                  <Link to="/exchange-center" className={ui.ghost}>Go to Exchange Center</Link>
                </>
              ) : (
                <>
                  <p>You have no SVE to swap back yet. Swap some VE into SVE first.</p>
                  <button type="button" className={ui.ghost} onClick={onFlip}>Switch to VE → SVE</button>
                </>
              )}
            </div>
          )}

          <div className={ui.field}>
            <label htmlFor="sw-amount" className={ui.label}>Amount of {F}</label>
            <div className={ui.stepRow}>
              <input
                id="sw-amount"
                ref={inputRef}
                className={ui.numInput}
                value={raw}
                onChange={(e) => setRaw(e.target.value.replace(/\D/g, '').slice(0, 6))}
                inputMode="numeric"
                placeholder="0"
                autoComplete="off"
                readOnly={busy}
                aria-invalid={helpError}
                aria-describedby="sw-help"
              />
            </div>
            <div className={ui.quick}>
              {[10, 50, 100].map((n) => (
                <button key={n} type="button" className={ui.chipBtn} onClick={() => setRaw(String(n))} disabled={busy || n > balance}>{n}</button>
              ))}
              <button type="button" className={ui.chipBtn} onClick={() => setRaw(String(maxAmount))} disabled={busy || balance < 1}>Max ({maxAmount})</button>
            </div>
            <p id="sw-help" className={ui.help} data-error={helpError}>{help}</p>
          </div>

          <div className={ui.quote}>
            <div className={ui.quoteRow}><span>Rate</span><strong>1 {F} = {receiveFor(from, to, 1)} {T}</strong></div>
            <div className={ui.quoteRow}><span>You send</span><strong>{inRange ? amount.toLocaleString() : 0} {F}</strong></div>
            <div className={ui.quoteRow}><span>You receive</span><strong className={ui.gain}>{receive.toLocaleString()} {T}</strong></div>
          </div>

          <button type="button" className={ui.primary} onClick={onSwap} disabled={busy || swapsLeft === 0}>
            {busy ? <><Loader2 size={18} className={ui.spin} aria-hidden="true" /> Swapping…</> : <><ArrowLeftRight size={18} aria-hidden="true" /> Confirm swap</>}
          </button>

          <div className={ui.messageWrap} aria-live="polite">
            {message && (
              <p className={ui.message} data-type={message.type} role={message.type === 'error' ? 'alert' : 'status'}>
                <MsgIcon size={16} aria-hidden="true" /> <span>{message.text}</span>
              </p>
            )}
          </div>
        </section>
      </div>

      <div className={ui.side}>
        <section className={ui.card} aria-labelledby="sw-history">
          <header className={ui.head}>
            <h2 id="sw-history" className={ui.subTitle}><History size={18} aria-hidden="true" /> Swap history</h2>
            <span className={ui.hint}>Last {history.length}</span>
          </header>
          {history.length === 0 ? (
            <p className={ui.empty}>No swaps yet. Your swaps will appear here.</p>
          ) : (
            <ul className={ui.hList}>
              {history.map((h) => (
                <li key={h.id} className={ui.hItem}>
                  <span className={ui.hIcon} aria-hidden="true"><ArrowLeftRight size={18} /></span>
                  <span className={ui.hText}>
                    <span className={ui.hLabel}>{h.amount} {h.from.toUpperCase()} → {h.received} {h.to.toUpperCase()}</span>
                    <span className={ui.hTime}>{formatWhen(h.at)}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
