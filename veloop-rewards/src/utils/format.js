const NAMES = { gems: 'Gems', ve: 'VE', sve: 'SVE' };

export function formatWhen(at) {
  const diff = Date.now() - at;
  if (diff < 60000) return 'Just now';
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
  return new Date(at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

/** { gems: -30, ve: 3 } -> "-30 Gems  +3 VE" */
export function formatDelta(delta = {}) {
  return ['gems', 've', 'sve']
    .filter((k) => delta[k])
    .map((k) => `${delta[k] > 0 ? '+' : '-'}${Math.abs(delta[k]).toLocaleString()} ${NAMES[k]}`)
    .join('  ');
}

export function formatDuration(ms) {
  const totalMin = Math.max(0, Math.floor(ms / 60000));
  const h = Math.floor(totalMin / 60);
  return h > 0 ? `${h}h ${totalMin % 60}m` : `${totalMin}m`;
}
