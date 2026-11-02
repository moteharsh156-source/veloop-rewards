import { useEffect, useRef, useState } from 'react';

// Animates a number from its previous value to `target`.
// Jumps straight to the value if the user prefers reduced motion.
export default function useCountUp(target, duration = 600) {
  const [value, setValue] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce || from.current === target) {
      from.current = target;
      setValue(target);
      return undefined;
    }

    const begin = from.current;
    const start = performance.now();
    let raf;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(begin + (target - begin) * eased));
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        from.current = target;
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}