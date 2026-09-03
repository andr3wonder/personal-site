import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EditionFooter } from '../../components/EditionFooter';
import { ItemList } from '../../components/ItemList';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useLensTheme } from '../../hooks/useLensTheme';
import { Card, Figure, Frame, Plate, Roll, Sub } from './parts';
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
} from '../../data/content';

const Out = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noreferrer" className="rule-link text-jade-50 hover:text-amber-300">
    {children}
  </a>
);

export function ReelLens() {
  useLensTheme('hsl(160 34% 6%)', 'dark');
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroP } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroP, [0, 1], ['0%', '14%']);

  const blaze = products[0];
  const feelable = products[1];
  const genz = communities.find((c) => c.id === 'genz')!;
  const clubs = communities.filter((c) => c.id !== 'genz');
  const travel = hobbies.find((h) => h.id === 'travel')!;
  const cooking = hobbies.find((h) => h.id === 'cooking')!;

  return (
    <div className="grain relative bg-jade-950 font-reel">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <main id="main">
        {/* 01 ---------------------------------------------------- opening */}
        <section
          id="open"
          ref={heroRef}
          aria-labelledby="hero-name"
          className="relative flex h-[100svh] flex-col justify-end overflow-hidden"
        >
          <motion.div aria-hidden className="absolute inset-0" style={reduced ? undefined : { y: heroY }}>
            <img
              src={photos.hero.src}
              alt=""
              fetchPriority="high"
              decoding="async"
              className="h-[114%] w-full object-cover object-[72%_40%] sm:object-[58%_36%] lg:object-[50%_36%]"
            />
            <div className="absolute inset-x-0 bottom-0 h-[78%] bg-[linear-gradient(to_top,hsl(160_34%_6%)_0%,hsl(160_34%_6%/0.92)_18%,hsl(160_34%_6%/0.72)_36%,hsl(160_34%_6%/0.42)_58%,hsl(160_34%_6%/0.16)_78%,transparent_100%)]" />
          </motion.div>

          <div className="relative z-10 mx-auto w-full max-w-5xl px-5 pb-16 text-center sm:px-8 sm:pb-20">
            <motion.h1
              id="hero-name"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 0.84, 0.24, 1] }}
              className="font-display text-[clamp(4.4rem,17vw,13rem)] uppercase leading-[0.8] tracking-[-0.035em] text-jade-50"
            >
              Andrew Chuang
            </motion.h1>

            <motion.p
              lang="zh-Hant"
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="mt-3 font-han text-[clamp(1.8rem,5vw,3.6rem)] font-black leading-none tracking-[0.03em] text-jade-50"
            >
              {identity.nameZh}
            </motion.p>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ delay: 0.36, duration: 0.55 }}
              className="mx-auto mt-8 max-w-2xl text-[clamp(1.1rem,2.2vw,1.6rem)] leading-snug text-jade-50/85"
            >
              {mission.headline}
            </motion.p>

            <motion.p
              initial={reduced ? false : { opacity: 0 }}
              animate={reduced ? undefined : { opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 text-[0.95rem] text-jade-50/60"
            >
              Taipei · Berkeley · San Francisco
            </motion.p>
          </div>

          <img src={photos.hero.src} alt={photos.hero.alt} className="sr-only" />
        </section>

        {/* 02 ------------------------------------------------- title card */}
        <Card
          id="priorities"
         
          title="Five things, in order"
          sub={<Out href={priorities.articleHref}>Written on a train to Strasbourg.</Out>}
        >
          <ol className="max-w-3xl list-none space-y-9 pl-0">
            {priorities.items.map((p, i) => (
              <li key={p.label} className="grid grid-cols-[2.6rem_1fr] gap-5">
                <span className="pt-2.5 font-mono text-[11px] tabular-nums text-amber-400/85">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block font-display text-[clamp(1.5rem,3vw,2.4rem)] uppercase leading-[1.02] tracking-[-0.015em] text-jade-50">
                    {p.label}
                  </span>
                  <span className="mt-2 block text-[1.05rem] leading-relaxed text-jade-100/65">
                    {p.body}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Card>

        {/* 03 ------------------------------------------------------ frame */}
        <Frame
          id="about"
         
          image={photos.portrait}
          focal="50% 20%"
          title="The dance of tech, art & people"
        >
          <p className="text-[clamp(1.05rem,2vw,1.4rem)] leading-snug text-jade-50/85">
            {identity.taglineTail}
          </p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-jade-100/70">
            {aboutFacts.map((f) => f.text).join('. ')}.
          </p>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {notebooks.map((n) => (
              <a
                key={n.href}
                href={n.href}
                target="_blank"
                rel="noreferrer"
                className="rule-link font-mono text-[11px] uppercase tracking-[0.12em] text-jade-50/75 hover:text-amber-300"
              >
                {n.label}
              </a>
            ))}
          </p>
        </Frame>

        {/* 04 ------------------------------------------------- title card */}
        <Card
          id="blaze"
         
          title={<Out href={blaze.href!}>Blaze Messenger</Out>}
          sub={<>An AI voice messenger.</>}
        >
          <Figure value="200k" unit="users" />
          <p className="mt-3 text-[1.05rem] text-jade-100/70">110k of them in the first month.</p>

          <ul className="mt-12 grid max-w-4xl list-none gap-x-14 gap-y-8 pl-0 sm:grid-cols-2">
            {blaze.bullets.map((b) => (
              <li key={b} className="text-[1.05rem] leading-[1.55] text-jade-100/85">
                {b}
              </li>
            ))}
          </ul>
        </Card>

        {/* cut to white ------------------------------------------------- */}
        <Plate images={blaze.images} caption="Blaze Messenger, voice message playback on watch" />

        {/* 05 ------------------------------------------------- title card */}
        <Card
          id="feelable"
         
          title={<Out href={feelable.href!}>feelable.ai</Out>}
          sub={
            <>
              A journal partner that remembers and grows with you. Alongside it, a Vibecode
              Playground, the shelf where the half-built things sit.
            </>
          }
        >
          <ul className="grid max-w-3xl list-none gap-x-14 gap-y-8 pl-0 sm:grid-cols-2">
            {work.map((w) => (
              <li key={w.name}>
                <span className="block font-display text-[clamp(1.3rem,2.4vw,1.9rem)] uppercase leading-[1.05] text-jade-50">
                  <Out href={w.href}>{w.name}</Out>
                </span>
                <span className="mt-1.5 block text-[0.95rem] text-jade-100/65">{w.note}</span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-amber-400/85">
                  {w.role}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        {/* cut to white ------------------------------------------------- */}
        <Plate
          images={[feelable.images[1], feelable.images[2]]}
          caption="feelable.ai, the mood picker and the dashboard"
        />

        {/* 06 ------------------------------------------------------ frame */}
        <Frame
          id="genz"
         
          image={genz.images![0]}
          focal="50% 38%"
          title="GenZ Taiwan"
        >
          <p className="text-[clamp(1.05rem,2vw,1.4rem)] leading-snug text-jade-50/85">
            Before the products, this. Getting students across Taiwan into the same room.
          </p>
          <ul className="mt-5 list-none space-y-2 pl-0 text-[0.95rem] leading-relaxed text-jade-100/80">
            {genz.bullets!.map((b) => (
              <li key={b.text}>{b.href ? <Out href={b.href}>{b.text}</Out> : b.text}</li>
            ))}
          </ul>
          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {genz.links!.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="rule-link font-mono text-[11px] uppercase tracking-[0.12em] text-jade-50/75 hover:text-amber-300"
              >
                {l.label}
              </a>
            ))}
          </p>
        </Frame>

        {/* 07 ------------------------------------------------------ frame */}
        <Frame
          id="clubs"
         
          image={genz.images![1]}
          focal="50% 45%"
          title="And three more rooms"
        >
          <ul className="flex list-none flex-wrap gap-x-10 gap-y-5 pl-0">
            {clubs.map((c) => (
              <li key={c.id}>
                <span className="block font-display text-[clamp(1.2rem,2.2vw,1.6rem)] uppercase leading-[1.05] text-jade-50">
                  {c.href ? <Out href={c.href}>{c.name}</Out> : c.name}
                </span>
                <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-amber-400/85">
                  {c.role}
                </span>
              </li>
            ))}
          </ul>
        </Frame>

        {/* 08 ------------------------------------------------------ frame */}
        <Frame
          id="hobbies"
         
          image={travel.image!}
          focal="50% 28%"
          title="Curiosity, unpaid"
        >
          <p className="text-[0.95rem] leading-relaxed text-jade-50/80">{travel.note}</p>
          <ul className="mt-4 list-none space-y-1.5 pl-0 text-[0.95rem] leading-relaxed text-jade-100/80">
            {travel.bullets!.map((b) => (
              <li key={b.text}>{b.href ? <Out href={b.href}>{b.text}</Out> : b.text}</li>
            ))}
          </ul>
        </Frame>

        {/* cut to white ------------------------------------------------- */}
        <Plate images={[cooking.image!]} caption="Cooking, or as Andrew puts it, meal prep" />

        {/* 09 ------------------------------------------------ end credits */}
        <section
          id="credits"
          aria-labelledby="credits-title"
          className="relative bg-jade-950 py-rhythm4"
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.08 }}
            transition={{ duration: 0.5, ease: [0.16, 0.84, 0.24, 1] }}
            className="mx-auto w-full max-w-3xl px-5 sm:px-8"
          >
            <h2
              id="credits-title"
              className="font-display text-[clamp(2rem,5vw,3.4rem)] uppercase leading-[0.9] tracking-[-0.02em] text-jade-50"
            >
              Everything else
            </h2>
            <Sub>{readsIntro}</Sub>

            <dl className="mt-16 text-left">
              {reads.map((r) => (
                <Roll key={r.label} role={r.label}>
                  <ItemList items={r.items} separatorClassName="text-jade-100/30" />
                </Roll>
              ))}
              <Roll role="Full list">
                <Out href={infoDietHref}>The Info Diet, in Notion</Out>
              </Roll>
            </dl>

            <dl className="mt-12 border-t border-jade-800 pt-8 text-left">
              {hobbies
                .filter((h) => h.id !== 'travel')
                .map((h) => (
                  <Roll key={h.id} role={h.label}>
                    {h.stat && <span className="text-amber-300">{h.stat}</span>}
                    {h.stat && (h.note || h.links) && <span className="text-jade-100/30"> · </span>}
                    {h.note && <span className="text-jade-100/80">{h.note}</span>}
                    {h.links?.map((l) => (
                      <span key={l.href}>
                        <span className="text-jade-100/30"> · </span>
                        <Out href={l.href}>{l.label}</Out>
                      </span>
                    ))}
                  </Roll>
                ))}
            </dl>

            <dl className="mt-12 border-t border-jade-800 pt-8 text-left">
              <Roll role="Published">
                <span className="text-amber-300">{contentStat}</span>
              </Roll>
              {guides.map((g) => (
                <Roll key={g.href} role="Guide">
                  <Out href={g.href}>{g.label}</Out>
                  {guideNotes[g.label] && (
                    <span className="ml-2 text-jade-100/55">{guideNotes[g.label]}</span>
                  )}
                </Roll>
              ))}
              {channels.map((c) => (
                <Roll key={c.href} role={c.label}>
                  <Out href={c.href}>{c.handle}</Out>
                  {c.meta && <span className="ml-2 text-jade-100/45">{c.meta}</span>}
                </Roll>
              ))}
            </dl>
          </motion.div>
        </section>

        {/* 10 -------------------------------------------------- end card */}
        <section
          id="close"
          aria-labelledby="close-title"
          className="relative flex min-h-[100svh] items-center bg-jade-950"
        >
          <div className="mx-auto w-full max-w-5xl px-5 py-rhythm3 sm:px-8">
            <blockquote className="m-0">
              <p className="m-0 font-display text-[clamp(2.8rem,9.5vw,8rem)] uppercase leading-[0.84] tracking-[-0.035em] text-jade-50">
                Don’t follow
                <br />
                your dreams,
                <br />
                follow your
                <br />
                curiosity!
              </p>
              <footer className="mt-8 text-[clamp(1rem,1.8vw,1.3rem)] text-jade-100/65">
                <Out href="https://substack.com/home/post/p-148637074">And find your style.</Out>
              </footer>
            </blockquote>

            <div className="mt-20 max-w-xl border-t border-jade-800 pt-10">
              <h2
                id="close-title"
                className="font-display text-[clamp(1.6rem,3.4vw,2.4rem)] uppercase tracking-[-0.02em] text-jade-50"
              >
                {closing.title}
              </h2>
              <p className="mt-3 text-jade-100/75">{closing.body}</p>
              <p className="mt-6 flex flex-wrap gap-x-7 gap-y-3 font-mono text-xs uppercase tracking-[0.12em]">
                {closing.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rule-link text-amber-300 hover:text-amber-200"
                  >
                    {l.label}
                  </a>
                ))}
                <a
                  href={notionHome}
                  target="_blank"
                  rel="noreferrer"
                  className="rule-link text-amber-300 hover:text-amber-200"
                >
                  The original, on Notion
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <EditionFooter variant="reel" />
    </div>
  );
}
