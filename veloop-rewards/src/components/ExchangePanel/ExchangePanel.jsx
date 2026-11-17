import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Coins, Gem, History, Info, Loader2, Minus, Plus, RefreshCw } from 'lucide-react';
import { useStore } from '../../services/rewardsStore';
import { ECONOMY } from '../../services/economy';
import { convert, costFor } from '../../services/exchangeApi';
import { uid } from '../../services/apiUtils';
import { formatWhen } from '../../utils/format';
import ui from '../shared/Panels.module.css';

const R = ECONOMY.exchange;
const MSG_ICON = { success: CheckCircle2, error: AlertCircle, info: Info };

export default function ExchangePanel({ panelRef, inputRef }) {
  const wallet = useStore((s) => s.wallet);
  const history = useStore((s) => s.exchange.history);

  const [raw, setRaw] = useState('1');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  const maxAffordable = Math.min(Math.floor(wallet.gems / R.gemsPerVe), R.maxVePerTransaction);
  const minNeeded = R.minVe * R.gemsPerVe;
  const amount = raw === '' ? NaN : Number(raw);
  const inRange = Number.isInteger(amount) && amount >= R.minVe && amount <= R.maxVePerTransaction;
  const cost = inRange ? costFor(amount) : 0;
  const tooMuch = inRange && cost > wallet.gems;

  let help = 'Enter how many VE you want to receive.';
  if (raw !== '' && !Number.isInteger(amount)) help = 'Enter a whole number.';
  else if (raw !== '' && amount < R.minVe) help = `The minimum is ${R.minVe} VE.`;
  else if (raw !== '' && amount > R.maxVePerTransaction) help = `The maximum is ${R.maxVePerTransaction} VE at a time.`;
  else if (tooMuch) help = `You need ${cost} Gems but only have ${wallet.gems}.`;
  else if (inRange) help = `You will pay ${cost} Gems.`;
  const helpError = raw !== '' && (!inRange || tooMuch);

  const setAmount = (v) => setRaw(String(v).replace(/\D/g, '').slice(0, 3));
  const step = (d) => setRaw(String(Math.max(R.minVe, Math.min(R.maxVePerTransaction, (inRange ? amount : R.minVe) + d))));

  const onConvert = async () => {
    if (busy) return;
    if (!inRange || tooMuch) {
      setMessage({ type: 'error', text: helpError ? help : 'Enter how many VE you want.' });
      return;
    }
    setBusy(true);
    setMessage(null);
    const res = await convert({ ve: amount, requestId: uid() });
    setBusy(false);
    if (res.ok) {
      setMessage({ type: 'success', text: `Converted ${res.gems} Gems into ${res.ve} VE.` });
      const left = Math.floor((wallet.gems - res.gems) / R.gemsPerVe);
      setRaw(String(Math.max(R.minVe, Math.min(amount, left))));
    } else {
      setMessage({ type: 'error', text: res.message });
    }
  };

  const MsgIcon = message ? MSG_ICON[message.type] || Info : null;
  const noGems = wallet.gems < minNeeded;

  return (
    <div className={ui.grid} ref={panelRef} id="exchange-panel">
      <div className={ui.main}>
        <section className={ui.card} aria-labelledby="ex-title">
          <header className={ui.head}>
            <div>
              <p className={ui.eyebrow}>EXCHANGE</p>
              <h2 id="ex-title" className={ui.title}>Convert Gems to VE</h2>
            </div>
            <span className={`${ui.pill} ${ui.pill_gold}`}>{R.gemsPerVe} Gems = 1 VE</span>
          </header>

          <div className={ui.tiles}>
            <div className={ui.tile}>
              <span className={`${ui.tileIcon} ${ui.icGem}`}><Gem size={22} aria-hidden="true" /></span>
              <div><p className={ui.tileLabel}>Your Gems</p><p className={ui.tileValue}>{wallet.gems.toLocaleString()}</p></div>
            </div>
            <div className={ui.tile}>
              <span className={`${ui.tileIcon} ${ui.icVe}`}><Coins size={22} aria-hidden="true" /></span>
              <div><p className={ui.tileLabel}>Your VE</p><p className={ui.tileValue}>{wallet.ve.toLocaleString()}</p></div>
            </div>
          </div>

          {noGems && (
            <div className={ui.notice}>
              <p>You need at least {minNeeded} Gems to exchange. You have {wallet.gems}. Earn Gems by solving captcha tasks.</p>
              <Link to="/captcha-tasks" className={ui.ghost}>Go to Captcha Tasks</Link>
            </div>
          )}

          <div className={ui.field}>
            <label htmlFor="ex-amount" className={ui.label}>VE you want to receive</label>
            <div className={ui.stepRow}>
              <button type="button" className={ui.stepBtn} onClick={() => step(-1)} disabled={busy || noGems} aria-label="One less VE">
                <Minus size={20} aria-hidden="true" />
              </button>
              <input
                id="ex-amount"
                ref={inputRef}
                className={ui.numInput}
                value={raw}
                onChange={(e) => setAmount(e.target.value)}
                inputMode="numeric"
                autoComplete="off"
                readOnly={busy}
                aria-invalid={helpError}
                aria-describedby="ex-help"
              />
              <button type="button" className={ui.stepBtn} onClick={() => step(1)} disabled={busy || noGems} aria-label="One more VE">
                <Plus size={20} aria-hidden="true" />
              </button>
            </div>
            <div className={ui.quick}>
              {[1, 5, 10].map((n) => (
                <button key={n} type="button" className={ui.chipBtn} onClick={() => setRaw(String(n))} disabled={busy || n > maxAffordable}>{n} VE</button>
              ))}
              <button type="button" className={ui.chipBtn} onClick={() => setRaw(String(maxAffordable))} disabled={busy || maxAffordable < 1}>Max ({maxAffordable})</button>
            </div>
            <p id="ex-help" className={ui.help} data-error={helpError}>{help}</p>
          </div>

          <div className={ui.quote}>
            <div className={ui.quoteRow}><span>You pay</span><strong>{cost.toLocaleString()} Gems</strong></div>
            <div className={ui.quoteRow}><span>You receive</span><strong className={ui.gain}>{inRange ? amount : 0} VE</strong></div>
            <div className={ui.quoteRow}><span>Gems left after</span><strong>{Math.max(0, wallet.gems - cost).toLocaleString()}</strong></div>
          </div>

          <button type="button" className={ui.primary} onClick={onConvert} disabled={busy || noGems}>
            {busy ? <><Loader2 size={18} className={ui.spin} aria-hidden="true" /> Converting…</> : <><RefreshCw size={18} aria-hidden="true" /> Convert now</>}
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
        <section className={ui.card} aria-labelledby="ex-history">
          <header className={ui.head}>
            <h2 id="ex-history" className={ui.subTitle}><History size={18} aria-hidden="true" /> Exchange history</h2>
            <span className={ui.hint}>Last {history.length}</span>
          </header>
          {history.length === 0 ? (
            <p className={ui.empty}>No exchanges yet. Your conversions will appear here.</p>
          ) : (
            <ul className={ui.hList}>
              {history.map((h) => (
                <li key={h.id} className={ui.hItem}>
                  <span className={ui.hIcon} aria-hidden="true"><RefreshCw size={18} /></span>
                  <span className={ui.hText}>
                    <span className={ui.hLabel}>{h.gems} Gems → {h.ve} VE</span>
                    <span className={ui.hTime}>{formatWhen(h.at)}</span>
                  </span>
                  <span className={ui.hAmt}>+{h.ve} VE</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
