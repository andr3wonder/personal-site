/** @type {import('tailwindcss').Config} */
/*
 * Palette, scale and rhythm are derived from the discovery seed. See
 * DESIGN-NOTES.md. The short version:
 *   - every hue window of the seed landed in 107-179deg, so the ground is
 *     jade -> cyan and never violet
 *   - letters:digits was 3.174, used as the body -> display type ratio
 *   - the digit-gap sequence gave the irregular vertical rhythm below
 */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // seed hue band
        jade: {
          50: 'hsl(150 30% 96%)',
          100: 'hsl(150 26% 88%)',
          300: 'hsl(147 32% 64%)',
          400: 'hsl(145 38% 50%)',
          500: 'hsl(141 46% 41%)',
          600: 'hsl(140 48% 33%)',
          800: 'hsl(150 40% 15%)',
          900: 'hsl(155 38% 10%)',
          950: 'hsl(160 34% 6%)',
        },
        cyanEdge: 'hsl(179 55% 46%)',
        limeEdge: 'hsl(107 42% 55%)',
        // warm counterpoint sampled from Andrew's own photographs
        amber: {
          300: 'hsl(38 88% 68%)',
          400: 'hsl(35 86% 58%)',
          500: 'hsl(28 82% 52%)',
        },
        ember: 'hsl(18 76% 54%)',
        // paper stock for the Volume lens
        paper: {
          50: 'hsl(42 34% 97%)',
          100: 'hsl(40 30% 94%)',
          200: 'hsl(38 24% 88%)',
          300: 'hsl(36 18% 78%)',
          700: 'hsl(30 12% 34%)',
          900: 'hsl(28 14% 14%)',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Oswald"', 'Impact', 'sans-serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Spectral"', '"Iowan Old Style"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        transit: ['"Barlow Condensed"', '"Inter"', 'sans-serif'],
        // weight-matched CJK, so the Chinese name is a peer of the Latin
        han: ['"Noto Sans TC"', '"PingFang TC"', 'sans-serif'],
        hanSerif: ['"Noto Serif TC"', '"Songti TC"', 'serif'],
      },
      fontSize: {
        // 18px body x 3.174 (letters:digits in the seed) = 57px display
        body: ['1.125rem', { lineHeight: '1.78' }],
        display: ['3.5625rem', { lineHeight: '0.94', letterSpacing: '-0.02em' }],
      },
      spacing: {
        // irregular rhythm from the seed's digit-gap sequence
        rhythm1: '0.75rem',
        rhythm2: '1.75rem',
        rhythm3: '3.5rem',
        rhythm4: '6.875rem',
        rhythm5: '11rem',
      },
      gridTemplateColumns: {
        // the 4-1-4 spine from the palindrome '414'
        spine: 'minmax(0,4fr) minmax(3.5rem,1fr) minmax(0,4fr)',
        spineTight: 'minmax(0,4fr) 2.5rem minmax(0,4fr)',
      },
      maxWidth: { measure: '34rem', reading: '42rem' },
    },
  },
  plugins: [],
};
