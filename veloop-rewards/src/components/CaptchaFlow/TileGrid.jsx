import { Check } from 'lucide-react';
import styles from './CaptchaFlow.module.css';

/** Tiles are plain images: the page never knows which ones are correct. */
export default function TileGrid({ tiles, columns = 3, selected, onToggle, disabled, loading, shake, label }) {
  const count = columns === 2 ? 4 : columns === 3 ? 9 : 6;

  if (loading) {
    return (
      <div className={styles.grid} style={{ '--cols': 3 }} aria-busy="true" aria-label="Loading challenge">
        {Array.from({ length: count }).map((_, i) => (
          <span key={i} className={styles.tileSkeleton} style={{ '--i': i }} />
        ))}
      </div>
    );
  }

  return (
    <div className={`${styles.grid} ${shake ? styles.shake : ''}`} style={{ '--cols': columns }} role="group" aria-label={label}>
      {tiles.map((tile, i) => {
        const on = selected.includes(tile.id);
        return (
          <button
            key={tile.id}
            type="button"
            className={`${styles.tile} ${on ? styles.tileOn : ''}`}
            style={{ '--i': i }}
            onClick={() => onToggle(tile.id)}
            disabled={disabled}
            aria-pressed={on}
            aria-label={`Tile ${i + 1}${on ? ', selected' : ''}`}
          >
            <img src={tile.image} alt="" draggable={false} className={styles.tileImg} />
            <span className={styles.tileCheck} aria-hidden="true"><Check size={16} strokeWidth={3} /></span>
          </button>
        );
      })}
    </div>
  );
}
