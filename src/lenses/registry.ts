export type LensId = 'reel' | 'volume' | 'line';

export type LensMeta = {
  id: LensId;
  path: string;
  name: string;
  /** One line, shown in the switcher. */
  blurb: string;
};

export const lenses: LensMeta[] = [
  { id: 'reel', path: '/reel', name: 'Reel', blurb: 'Cut like a film' },
  { id: 'volume', path: '/volume', name: 'Volume', blurb: 'Set like a book' },
  { id: 'line', path: '/line', name: 'Line', blurb: 'Read like a timetable' },
];
