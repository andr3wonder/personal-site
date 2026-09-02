import { useEffect, useRef, useState } from 'react';

/**
 * Reports which of the given section ids is currently the dominant one in the
 * viewport. Used by all three lenses to drive their chapter indicator.
 */
export function useActiveSection(ids: string[], rootMargin = '-45% 0px -45% 0px') {
  const [active, setActive] = useState(ids[0] ?? '');
  const ratios = useRef(new Map<string, number>());

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) ratios.current.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        let best = '';
        let bestRatio = -1;
        for (const id of ids) {
          const r = ratios.current.get(id) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        }
        if (best && bestRatio > 0) setActive(best);
      },
      { rootMargin, threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [ids, rootMargin]);

  return active;
}
