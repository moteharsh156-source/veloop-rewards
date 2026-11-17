/** Smooth-scroll to an element (instant if the user prefers less motion), then focus a control inside it. */
export function scrollToElement(el, focusEl) {
  if (!el) return;
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  if (focusEl) setTimeout(() => focusEl.focus({ preventScroll: true }), reduce ? 0 : 450);
}
