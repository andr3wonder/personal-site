import { useRef } from 'react';
import { motion, useInView, useScroll, useSpring } from 'framer-motion';
import { EditionFooter } from '../../components/EditionFooter';
import { useActiveSection } from '../../hooks/useActiveSection';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { ItemList } from '../../components/ItemList';
import { useLensTheme } from '../../hooks/useLensTheme';
import {
  aboutFacts,
  channels,
  closing,
  communities,
  contentStat,
  guideNotes,
  guides,
  hobbies,
  identity,
  infoDietHref,
  mission,
  notebooks,
  notionHome,
  photos,
  priorities,
  products,
  reads,
  readsIntro,
  work,
  blazeMetrics,
} from '../../data/content';

const Out = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="rule-link text-jade-50 hover:text-cyanEdge"
  >
    {children}
  </a>
);

/**
 * The route, read chronologically rather than by category. This ordering is
 * unique to this lens: Taipei first, then Berkeley, then San Francisco.
 */
const stations = [
  { id: 'genz', code: 'ST 01', name: 'GenZ Taiwan', place: 'Taipei' },
  { id: 'clubs', code: 'ST 02', name: 'Rooms Built', place: 'Taipei · Berkeley' },
  { id: 'work', code: 'ST 03', name: 'Internships', place: 'Berkeley' },
  { id: 'blaze', code: 'ST 04', name: 'Blaze Messenger', place: 'Berkeley' },
  { id: 'feelable', code: 'ST 05', name: 'feelable.ai', place: 'San Francisco' },
  { id: 'priorities', code: 'ST 06', name: 'Priorities', place: 'Through-line' },
  { id: 'about', code: 'ST 07', name: 'About', place: 'San Francisco' },
  { id: 'reads', code: 'ST 08', name: 'Info Diet', place: 'Ongoing' },
  { id: 'hobbies', code: 'ST 09', name: 'Off the Line', place: 'Ongoing' },
  { id: 'content', code: 'ST 10', name: 'Published', place: 'Ongoing' },
];

const stationIds = stations.map((s) => s.id);

/** Split-flap heading. Characters settle in sequence, as on a departure board. */
/**
 * Station names settle once, as a whole word, on a single flap. Staggering the
 * characters made the headline unreadable while it arrived.
 */
function Flap({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.5 });

  if (reduced) return <span className={className}>{text}</span>;

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ rotateX: -34, opacity: 0 }}
      animate={inView ? { rotateX: 0, opacity: 1 } : undefined}
      transition={{ duration: 0.28, ease: [0.2, 0.85, 0.3, 1] }}
      style={{ display: 'inline-block', transformOrigin: 'center bottom' }}
    >
      {text}
    </motion.span>
  );
}

/** The route line. One dot size, one exact interval, one drawn progress fill. */
/**
 * The rail is a real position map: each node sits at the station's actual
 * offset in the document, so the line reports where you are rather than
 * decorating the edge with evenly spaced ticks.
 */
function RouteLine({ active }: { active: string }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  // Equal stop intervals: the founding rule of a schematic line diagram.
  const offsets = stationIds.map((_, i) => 8 + (i * 84) / (stationIds.length - 1));
  const idx = Math.max(0, stationIds.indexOf(active));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-y-0 left-8 z-30 hidden w-px lg:block">
      <span className="absolute inset-0 bg-jade-800" />
      {!reduced && (
        <motion.span
          className="absolute inset-x-0 top-0 h-full origin-top bg-cyanEdge/80"
          style={{ scaleY: draw }}
        />
      )}
      {offsets.map((top, i) => (
        <span
          key={stationIds[i]}
          className={[
            'absolute h-1.5 w-1.5 rounded-full transition-colors duration-300',
            i === idx ? '-left-[3.5px] h-2.5 w-2.5 bg-cyanEdge' : '-left-[2.5px]',
            i < idx ? 'bg-cyanEdge/70' : i > idx ? 'bg-jade-800' : '',
          ].join(' ')}
          style={{ top: `${top}%` }}
        />
      ))}
    </div>
  );
}

function Shot({
  src,
  alt,
  caption,
  fit = 'cover',
  grade = false,
}: {
  src: string;
  alt: string;
  caption: string;
  /** Photographs bleed to the plate edge; screen captures sit inside it. */
  fit?: 'cover' | 'contain';
  /** Pulls an off-palette photograph toward the page's colour world. */
  grade?: boolean;
}) {
  return (
    <figure className="m-0">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={[
          'aspect-[4/3] w-full border border-jade-800',
          fit === 'cover' ? 'object-cover object-top' : 'bg-[#f7f7f7] object-cover object-center',
          grade ? 'saturate-[0.55] contrast-[1.05] sepia-[0.18]' : '',
        ].join(' ')}
      />
      <figcaption className="mt-2.5 font-mono text-xs uppercase tracking-[0.14em] text-jade-100/65">
        {caption}
      </figcaption>
    </figure>
  );
}

/**
 * A station. Every station uses the same rigid three-part grid: manifest column
 * on the left (code, place, media), content on the right. No side-swapping, so
 * the page reads as one table rather than a zigzag.
 */
function Station({
  id,
  code,
  name,
  place,
  children,
  media,
}: {
  id: string;
  code: string;
  name: string;
  place: string;
  children: React.ReactNode;
  media?: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-name`}
      className="mx-auto w-full max-w-6xl px-5 py-rhythm3 sm:px-8 sm:py-rhythm4 lg:pl-24"
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 18 }}
        animate={inView && !reduced ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.48, ease: [0.18, 0.82, 0.26, 1] }}
      >
        <div className="mb-9 border-b border-jade-800 pb-4">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
            <span className="font-mono text-xs uppercase tracking-[0.16em] tabular-nums text-jade-100/60">
              {code}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-jade-100/60">
              {place}
            </span>
          </div>
          <h2
            id={`${id}-name`}
            className="mt-2 font-transit text-[clamp(1.7rem,4.2vw,2.8rem)] font-medium uppercase leading-[1.02] tracking-[0.015em] text-jade-50"
          >
            <Flap text={name} />
          </h2>
        </div>

        <div className="min-w-0">{children}</div>
        {media && <div className="mt-rhythm2 grid gap-6 sm:grid-cols-2">{media}</div>}
      </motion.div>
    </section>
  );
}

/** Full-measure row, used when there is no genuine label data to show. */
function Line({ children }: { children: React.ReactNode }) {
  return <div className="border-t border-jade-800 py-3.5 text-jade-100/90 last:border-b">{children}</div>;
}

/** Rigid two-column data row, the unit this whole lens is built from. */
function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 border-t border-jade-800 py-3.5 sm:grid-cols-[9rem_1fr] sm:gap-6">
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-jade-100/55">{label}</span>
      <span className="text-jade-100/90">{children}</span>
    </div>
  );
}

export function LineLens() {
  useLensTheme('hsl(160 34% 6%)', 'dark');
  const active = useActiveSection(stationIds);
  const heroRef = useRef<HTMLElement>(null);

  const blaze = products[0];
  const feelable = products[1];
  const genz = communities.find((c) => c.id === 'genz')!;
  const clubs = communities.filter((c) => c.id !== 'genz');
  const travel = hobbies.find((h) => h.id === 'travel')!;
  const cooking = hobbies.find((h) => h.id === 'cooking')!;
  const st = Object.fromEntries(stations.map((s) => [s.id, s]));

  return (
    <div className="min-h-screen bg-jade-950">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <RouteLine active={active} />

      <main id="main">
        {/* ------------------------------------------------------- departures */}
        {/* No photograph here. A departure board is type, rule and figure only;
            this is what separates this version from the cinematic one. */}
        <section
          id="open"
          ref={heroRef}
          aria-labelledby="hero-name"
          className="relative flex min-h-[100svh] items-center border-b border-jade-800 lg:pl-24"
        >
          <div className="mx-auto w-full max-w-6xl px-5 py-rhythm3 sm:px-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-jade-800 pb-3">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyanEdge">
                Departures
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-jade-100/60">
                Taipei to San Francisco
              </p>
            </div>

            <h1
              id="hero-name"
              className="mt-10 font-transit text-[clamp(3rem,11vw,8rem)] font-semibold uppercase leading-[0.9] tracking-[0.005em] text-jade-50"
            >
              Andrew Chuang
            </h1>
            <p className="mt-3 font-han text-[clamp(1.8rem,4.8vw,3.2rem)] font-bold leading-none tracking-[0.02em] text-jade-50">
              {identity.nameZh}
            </p>

            <table className="mt-12 w-full border-collapse text-left font-mono text-sm uppercase tracking-[0.08em] tabular-nums">
              <caption className="sr-only">Where Andrew has lived and studied</caption>
              <thead>
                <tr className="border-b border-jade-800 text-jade-100/50">
                  <th scope="col" className="w-24 py-2 pr-4 font-normal text-[0.7rem] tracking-[0.2em]">
                    Stop
                  </th>
                  <th scope="col" className="py-2 pr-4 font-normal text-[0.7rem] tracking-[0.2em]">
                    Place
                  </th>
                  <th scope="col" className="w-28 py-2 text-right font-normal text-[0.7rem] tracking-[0.2em]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['00', 'Taipei, Taiwan', 'Born'],
                  ['01', 'Berkeley, Computer Science', 'Studied'],
                  ['02', 'San Francisco', 'Now'],
                ].map(([stop, place, note]) => (
                  <tr key={stop} className="border-b border-jade-800">
                    <th scope="row" className="py-4 pr-4 font-medium text-cyanEdge">
                      {stop}
                    </th>
                    <td className="py-4 pr-4 text-jade-50">{place}</td>
                    <td className="py-4 text-right text-jade-100/60">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-12 max-w-xl text-lg leading-relaxed text-jade-100/85">
              {mission.headline}
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------- ST 01 */}
        <Station
          {...st.genz}
          media={
            <div className="space-y-6">
              <Shot src={genz.images![0].src} alt={genz.images![0].alt} caption="The room" />
              <Shot src={genz.images![1].src} alt={genz.images![1].alt} caption="Stage, before doors" />
            </div>
          }
        >
          <p className="max-w-measure text-jade-100/85">
            Founder. The first stop on this line: getting students across Taiwan into the same room.
          </p>
          <div className="mt-7">
            {genz.bullets!.map((b) => (
              <Line key={b.text}>{b.href ? <Out href={b.href}>{b.text}</Out> : b.text}</Line>
            ))}
            <Row label="Elsewhere">
              {genz.links!.map((l, i) => (
                <span key={l.href}>
                  {i > 0 && <span className="text-jade-100/30"> · </span>}
                  <Out href={l.href}>{l.label}</Out>
                </span>
              ))}
            </Row>
          </div>
        </Station>

        {/* ---------------------------------------------------------- ST 02 */}
        <Station
          {...st.clubs}
          media={<Shot src={genz.images![2].src} alt={genz.images![2].alt} caption="Defying Gravity" />}
        >
          {clubs.map((c) => (
            <Row key={c.id} label={c.role}>
              {c.href ? <Out href={c.href}>{c.name}</Out> : c.name}
            </Row>
          ))}
        </Station>

        {/* ---------------------------------------------------------- ST 03 */}
        <Station
          {...st.work}
          media={<Shot src={genz.images![3].src} alt={genz.images![3].alt} caption="Mid-session" />}
        >
          {work.map((w) => (
            <Row key={w.name} label={w.role}>
              <Out href={w.href}>{w.name}</Out>
              <span className="ml-2 text-jade-100/55">{w.note}</span>
            </Row>
          ))}
        </Station>

        {/* ---------------------------------------------------------- ST 04 */}
        <Station
          {...st.blaze}
          media={
            <Shot src={blaze.images[0].src} alt={blaze.images[0].alt} caption="Blaze on the wrist" fit="contain" />
          }
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-jade-100/55">
            {blaze.kicker}
          </p>
          <p className="mt-2 font-transit text-[clamp(2.4rem,6vw,3.8rem)] font-semibold uppercase leading-[0.9] text-jade-50">
            <span className="block">200k</span>
            <span className="block text-jade-100/40">users</span>
          </p>
          <table className="mt-8 w-full border-collapse text-left font-mono text-sm tabular-nums">
            <caption className="sr-only">Blaze Messenger results</caption>
            <thead>
              <tr className="border-b border-jade-800 text-[0.7rem] uppercase tracking-[0.18em] text-jade-100/50">
                <th scope="col" className="py-2 pr-4 font-normal">
                  Metric
                </th>
                <th scope="col" className="w-24 py-2 pr-4 text-right font-normal">
                  Value
                </th>
                <th scope="col" className="w-28 py-2 text-right font-normal">
                  Window
                </th>
              </tr>
            </thead>
            <tbody>
              {blazeMetrics.map((m) => (
                <tr key={m.metric} className="border-b border-jade-800">
                  <th scope="row" className="py-3.5 pr-4 font-normal text-jade-100/90">
                    {m.metric}
                  </th>
                  <td className="py-3.5 pr-4 text-right text-jade-50">{m.value}</td>
                  <td className="py-3.5 text-right text-jade-100/55">{m.window}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-6 font-mono text-sm">
            <Out href={blaze.href!}>Case notes</Out>
          </p>
          <p className="sr-only">
            {blaze.bullets.join('. ')}
          </p>
        </Station>

        {/* ---------------------------------------------------------- ST 05 */}
        <Station
          {...st.feelable}
          media={
            <div className="space-y-6">
              <Shot src={feelable.images[1].src} alt={feelable.images[1].alt} caption="Mood picker" fit="contain" />
              <Shot src={feelable.images[2].src} alt={feelable.images[2].alt} caption="Dashboard" fit="contain" />
            </div>
          }
        >
          <p className="max-w-measure text-jade-100/85">
            A mood journaling companion. A journal partner that remembers and grows with you.
          </p>
          <div className="mt-7">
            <Line>Vibecode Playground, for everything still half-built</Line>
            <Line>
              <Out href={feelable.href!}>feelable.ai</Out>
            </Line>
          </div>
        </Station>

        {/* ---------------------------------------------------------- ST 06 */}
        <Station
          {...st.priorities}
          media={<Shot src={photos.tunnel.src} alt={photos.tunnel.alt} caption="En route" grade />}
        >
          <p className="max-w-measure text-jade-100/85">
            Five, in order. <Out href={priorities.articleHref}>Written on a train to Strasbourg</Out>.
          </p>
          <div className="mt-7">
            {priorities.items.map((p, i) => (
              <Row key={p.label} label={String(i + 1).padStart(2, '0')}>
                <span className="text-jade-50">{p.label}</span>{' '}
                <span className="text-jade-100/60">{p.body}</span>
              </Row>
            ))}
          </div>
        </Station>

        {/* ---------------------------------------------------------- ST 07 */}
        <Station
          {...st.about}
          media={<Shot src={photos.portrait.src} alt={photos.portrait.alt} caption="Grand Canyon" />}
        >
          <p className="max-w-measure text-jade-100/85">
            {identity.tagline} {identity.taglineTail}
          </p>
          <p className="mt-5 max-w-measure text-jade-100/60">
            “Have the courage to become a novice again and again and be in a constant state of
            growing, changing, and reinventing yourself.”
          </p>
          <div className="mt-7">
            {aboutFacts.map((f, i) => (
              <Row key={f.text} label={['Based', 'Origin', 'Cares for'][i] ?? 'Note'}>
                {f.text}
              </Row>
            ))}
            <Row label="Also kept">
              {notebooks.map((n, i) => (
                <span key={n.href}>
                  {i > 0 && <span className="text-jade-100/30"> · </span>}
                  <Out href={n.href}>{n.label}</Out>
                </span>
              ))}
            </Row>
          </div>
        </Station>

        {/* ---------------------------------------------------------- ST 08 */}
        <Station {...st.reads}>
          <p className="max-w-measure text-jade-100/80">{readsIntro}</p>
          <p className="mt-5">
            <Out href={infoDietHref}>The full Info Diet, in Notion</Out>
          </p>
        </Station>

        <div className="mx-auto -mt-rhythm3 w-full max-w-6xl px-5 pb-rhythm4 sm:px-8 lg:pl-24">
          <dl className="grid gap-x-12 md:grid-cols-2">
            {reads.map((r) => (
              <div key={r.label} className="border-t border-jade-800 py-3.5">
                <dt className="font-mono text-xs uppercase tracking-[0.18em] text-cyanEdge">
                  {r.label}
                </dt>
                <dd className="m-0 mt-1.5 text-[0.94rem] leading-[1.7] text-jade-100/75">
                  <ItemList items={r.items} separatorClassName="text-jade-100/30" />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------------------------------------------------------- ST 09 */}
        <Station
          {...st.hobbies}
          media={
            <div className="space-y-6">
              <Shot src={travel.image!.src} alt={travel.image!.alt} caption="SF half marathon" />
              <Shot src={cooking.image!.src} alt={cooking.image!.alt} caption="Meal prep, allegedly" />
            </div>
          }
        >
          <p className="font-mono text-sm tracking-[0.06em] text-jade-100/80">{travel.note}</p>
          <div className="mt-6">
            {travel.bullets!.map((b) => (
              <Line key={b.text}>{b.href ? <Out href={b.href}>{b.text}</Out> : b.text}</Line>
            ))}
            {hobbies
              .filter((h) => h.id !== 'travel')
              .map((h) => (
                <Row key={h.id} label={h.label}>
                  {h.stat && <span className="text-cyanEdge">{h.stat}</span>}
                  {h.stat && h.note && <span className="text-jade-100/30"> · </span>}
                  {h.note && <span className="text-jade-100/70">{h.note}</span>}
                  {h.links?.map((l) => (
                    <span key={l.href}>
                      <span className="text-jade-100/30"> · </span>
                      <Out href={l.href}>{l.label}</Out>
                    </span>
                  ))}
                </Row>
              ))}
          </div>
        </Station>

        {/* ---------------------------------------------------------- ST 10 */}
        <Station
          {...st.content}
          media={
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-jade-100/60">
                Selected writing
              </p>
              <ul className="mt-4 list-none space-y-0 pl-0">
                {hobbies[0].essays!.map((e) => (
                  <li key={e.href} className="border-t border-jade-800 py-4 last:border-b">
                    <Out href={e.href}>{e.title}</Out>
                  </li>
                ))}
              </ul>
            </div>
          }
        >
          <p className="font-transit text-[clamp(2.4rem,6vw,3.8rem)] font-semibold uppercase leading-[0.9] text-jade-50">
            <span className="block">1M+</span>
            <span className="block text-jade-100/40">views</span>
          </p>
          <div className="mt-7">
            {guides.map((g) => (
              <Row key={g.href} label="Guide">
                <Out href={g.href}>{g.label}</Out>
                {guideNotes[g.label] && (
                  <span className="ml-2 text-jade-100/55">{guideNotes[g.label]}</span>
                )}
              </Row>
            ))}
            {channels.map((c) => (
              <Row key={c.href} label={c.label}>
                <Out href={c.href}>{c.handle}</Out>
                {c.meta && <span className="ml-2 text-jade-100/45">{c.meta}</span>}
              </Row>
            ))}
          </div>
          <p className="sr-only">{contentStat}</p>
        </Station>

        {/* --------------------------------------------------------- terminus */}
        <section
          id="close"
          aria-labelledby="close-title"
          className="mx-auto w-full max-w-6xl px-5 py-rhythm4 sm:px-8 lg:pl-24"
        >
          <p className="font-mono text-xs uppercase tracking-[0.34em] text-cyanEdge">Terminus</p>

          <blockquote className="m-0 mt-9 max-w-3xl">
            <p className="m-0 font-transit text-[clamp(1.9rem,5.4vw,3.4rem)] font-medium uppercase leading-[1.04] text-jade-50">
              Don’t follow your dreams, follow your curiosity!
            </p>
            <footer className="mt-4 text-sm text-jade-100/60">
              <Out href="https://substack.com/home/post/p-148637074">And find your style</Out>
            </footer>
          </blockquote>


          <h2
            id="close-title"
            className="mt-16 font-transit text-3xl font-semibold uppercase tracking-[0.02em] text-jade-50"
          >
            {closing.title}
          </h2>
          <p className="mt-3 max-w-xl text-jade-100/75">{closing.body}</p>
          <p className="mt-5 font-mono text-sm uppercase tracking-[0.16em]">
            {closing.links.map((l, i) => (
              <span key={l.href}>
                {i > 0 && <span className="text-jade-100/30"> · </span>}
                <Out href={l.href}>{l.label}</Out>
              </span>
            ))}
          </p>

          <p className="mt-20 font-mono text-xs uppercase tracking-[0.28em] text-jade-100/70">
            <a href={notionHome} target="_blank" rel="noreferrer" className="rule-link">
              The original, still on Notion
            </a>
          </p>
        </section>
      </main>

      <EditionFooter variant="line" />
    </div>
  );
}
