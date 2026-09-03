import { useEffect } from 'react';

/**
 * Paints the document background to match the active lens. Without this the
 * dark default shows through overscroll on the paper lens, and browser UI
 * (scrollbars, form controls) stays in the wrong scheme.
 */
export function useLensTheme(background: string, scheme: 'dark' | 'light') {
  useEffect(() => {
    const root = document.documentElement;
    const prevBg = root.style.background;
    const prevScheme = root.style.colorScheme;
    const meta = document.querySelector('meta[name="theme-color"]');
    const prevTheme = meta?.getAttribute('content') ?? null;

    root.style.background = background;
    root.style.colorScheme = scheme;
    meta?.setAttribute('content', background);

    return () => {
      root.style.background = prevBg;
      root.style.colorScheme = prevScheme;
      if (prevTheme !== null) meta?.setAttribute('content', prevTheme);
    };
  }, [background, scheme]);
}
