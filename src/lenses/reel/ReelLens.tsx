import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EditionFooter } from '../../components/EditionFooter';
import { useLensTheme } from '../../hooks/useLensTheme';
import { useReducedMotion } from '../../hooks/useReducedMotion';
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
  quotes,
  reads,
  readsIntro,
  work,
} from '../../data/content';

const EASE = [0.16, 0.84, 0.24, 1] as const;

function Out({
  href,
  children,
  className = '',
  showArrow = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  showArrow?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`reel-link group inline-flex max-w-full items-baseline gap-[0.16em] ${
        showArrow ? '' : 'reel-link-no-arrow'
      } ${className}`}
    >
      <span className="min-w-0">{children}</span>
      {showArrow && (
        <span
          aria-hidden
          className="inline-block font-reel text-[0.48em] font-medium transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        >
          ↗
        </span>
      )}
    </a>
  );
}

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  objectPosition = '50% 50%',
  priority = false,
  amount = 5,
  grade = true,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  objectPosition?: string;
  priority?: boolean;
  amount?: number;
  grade?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={`group overflow-hidden ${className}`}>
      <motion.div
        className="h-[112%] w-full"
        style={reduced ? { marginTop: '-6%' } : { y, marginTop: '-6%' }}
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          style={{ objectPosition }}
          className={`h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025] ${
            grade ? 'reel-photo' : ''
          } ${imgClassName}`}
        />
      </motion.div>
    </div>
  );
}

function StoryHeader() {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-50 text-[#f0eadc]">
      <nav
        aria-label="Reel chapters"
        className="mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-4 font-reel text-[10px] font-medium uppercase tracking-[0.1em] sm:px-7 sm:py-5"
      >
        <a href="#open" className="pointer-events-auto transition-opacity hover:opacity-60">
          Andrew Chuang
        </a>
        <div className="pointer-events-auto hidden items-center gap-7 md:flex">
          <a href="#taipei" className="transition-opacity hover:opacity-60">
            Story
          </a>
          <a href="#build" className="transition-opacity hover:opacity-60">
            Work
          </a>
          <a href="#archive" className="transition-opacity hover:opacity-60">
            Index
          </a>
          <a href="#close" className="transition-opacity hover:opacity-60">
            Contact
          </a>
        </div>
        <a
          href="#archive"
          className="pointer-events-auto transition-opacity hover:opacity-60 md:hidden"
        >
          Index
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.13]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '9%']);
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.78], [1, 0]);

  return (
    <section
      id="open"
      ref={ref}
      aria-labelledby="hero-title"
      className="relative h-[118svh] bg-[#07130f] md:h-[132svh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.img
          src={photos.hero.src}
          alt={photos.hero.alt}
          decoding="async"
          style={reduced ? undefined : { scale: imageScale, y: imageY }}
          className="absolute inset-0 h-full w-full object-cover object-[80%_42%] md:object-[50%_42%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,13,10,0.7)_0%,rgba(4,13,10,0.2)_60%,rgba(4,13,10,0.04)_100%)] md:bg-[linear-gradient(90deg,rgba(4,13,10,0.76)_0%,rgba(4,13,10,0.28)_48%,rgba(4,13,10,0.02)_78%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#07130f]/90 to-transparent" />

        <motion.div
          style={reduced ? undefined : { y: copyY, opacity: copyOpacity }}
          className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[1600px] px-4 pb-20 sm:px-7 sm:pb-20 md:pb-24"
        >
          <h1
            id="hero-title"
            className="max-w-[7ch] font-display text-[clamp(4.8rem,20vw,6rem)] uppercase leading-[0.8] tracking-[-0.02em] text-[#f4f0e7] md:text-[clamp(5rem,14vw,13rem)]"
          >
            Andrew
            <br />
            Chuang
            <span
              lang="zh-Hant"
              className="mt-3 block font-han text-base font-bold tracking-[0.1em] md:text-xl"
            >
              {identity.fullNameZh}
            </span>
          </h1>
          <div className="mt-7 max-w-4xl border-t border-white/35 pt-5 text-[#f4f0e7]">
            <p className="max-w-xl text-[clamp(1.15rem,2vw,1.55rem)] leading-snug">
              {mission.headline}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MissionCut() {
  return (
    <section className="relative overflow-hidden bg-[#ef5a40] px-5 pt-24 text-[#0b1813] sm:px-8 md:min-h-[100svh] md:px-[5vw] md:py-[10vh]">
      <div className="relative z-10 mx-auto max-w-[1600px]">
        <Reveal>
          <h2 className="mt-10 max-w-[11ch] font-serif text-[clamp(3.4rem,6vw,6rem)] font-light leading-[0.92] tracking-[-0.05em]">
            My mission is to foster joy for humanity.
          </h2>
          <p className="mt-14 max-w-xl border-t border-[#0b1813]/40 pt-7 text-[clamp(1.15rem,1.8vw,1.45rem)] leading-relaxed md:mt-20 md:w-[42vw]">
            {mission.paragraphs[0]}
            <span className="mt-5 block">{identity.tagline}</span>
          </p>
        </Reveal>

        <ParallaxImage
          src={photos.portrait.src}
          alt={photos.portrait.alt}
          objectPosition="50% 24%"
          className="mt-14 h-[68svh] md:absolute md:bottom-[-10vh] md:right-0 md:mt-0 md:h-[76vh] md:w-[32vw] md:max-w-[500px]"
          amount={3}
        />
      </div>
    </section>
  );
}

function TaipeiChapter() {
  const genz = communities.find((community) => community.id === 'genz')!;

  return (
    <section id="taipei" aria-labelledby="taipei-title" className="bg-[#f0eadc] text-[#101713]">
      <div className="relative min-h-[100svh] overflow-hidden bg-[#07130f]">
        <ParallaxImage
          src={genz.images![0].src}
          alt={genz.images![0].alt}
          className="absolute inset-0 h-full"
          objectPosition="50% 50%"
          amount={4}
        />
        <div className="absolute inset-0 bg-black/20" />
        <Reveal className="absolute inset-x-0 bottom-0">
          <div className="w-full bg-[#f0eadc] px-5 py-8 sm:w-[84%] sm:px-8 sm:py-10 md:w-[68%] md:px-[5vw] md:py-[7vh]">
            <p className="font-reel text-xs font-medium uppercase tracking-[0.08em] text-[#101713]/70">
              01 · Gather · Taipei
            </p>
            <h2
              id="taipei-title"
              className="mt-5 max-w-[11ch] font-serif text-[clamp(3rem,5.8vw,5.8rem)] font-light leading-[0.92] tracking-[-0.045em]"
            >
              Put people in the same room.
            </h2>
            <p className="mt-6 max-w-2xl text-[clamp(1.05rem,1.5vw,1.25rem)] leading-relaxed">
              Before the products, GenZ Taiwan. Connecting students across Taiwan to do
              passion projects together.
            </p>
            <p className="mt-4 font-reel text-[10px] font-medium uppercase leading-relaxed tracking-[0.1em] text-[#101713]/55">
              Nonprofit founder · 100-person cross-school TEDx · 2k followers
            </p>
          </div>
        </Reveal>
      </div>

      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-16 sm:px-8 md:px-[5vw] md:pb-16 md:pt-20">
        <div className="grid grid-cols-6 gap-3 sm:gap-5 md:h-[760px] md:grid-cols-12 md:grid-rows-2">
          <figure className="col-span-3 md:col-span-5 md:row-span-2">
            <ParallaxImage
              src={genz.images![3].src}
              alt={genz.images![3].alt}
              className="aspect-[3/4] md:h-full md:aspect-auto"
              objectPosition="63% 50%"
              amount={7}
            />
          </figure>

          <figure className="col-span-3 md:col-span-3 md:col-start-6 md:row-start-1">
            <div className="aspect-[3/4] overflow-hidden md:h-full md:aspect-auto">
              <img
                src={genz.images![4].src}
                alt={genz.images![4].alt}
                loading="lazy"
                decoding="async"
                className="reel-photo h-full w-full object-cover"
              />
            </div>
          </figure>

          <figure className="col-span-6 md:col-span-4 md:col-start-9 md:row-start-1">
            <ParallaxImage
              src={genz.images![1].src}
              alt={genz.images![1].alt}
              className="aspect-[16/9] md:h-full md:aspect-auto"
              objectPosition="50% 52%"
              amount={6}
            />
          </figure>

          <figure className="col-span-6 md:col-span-7 md:col-start-6 md:row-start-2">
            <ParallaxImage
              src={genz.images![2].src}
              alt={genz.images![2].alt}
              className="aspect-[16/9] md:h-full md:aspect-auto"
              objectPosition="50% 44%"
              amount={3}
            />
          </figure>
        </div>

        <div className="mt-20 grid border-t border-[#101713]/30 py-10 md:mt-28 md:grid-cols-12 md:gap-10 md:py-14">
          <h3 className="font-display text-4xl uppercase leading-none md:col-span-3">
            What the room held
          </h3>
          <ul className="mt-9 grid list-none gap-x-10 gap-y-5 pl-0 md:col-span-6 md:mt-0 md:grid-cols-2">
            {genz.bullets!.map((bullet) => (
              <li key={bullet.text} className="border-t border-[#101713]/20 pt-4 leading-relaxed">
                {bullet.href ? (
                  <Out href={bullet.href} className="hover:text-[#bd341f]">
                    {bullet.text}
                  </Out>
                ) : (
                  bullet.text
                )}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-wrap content-start gap-x-5 gap-y-3 font-reel text-[10px] font-medium uppercase tracking-[0.1em] md:col-span-3 md:mt-0">
            {genz.links!.map((link) => (
              <Out key={link.href} href={link.href} className="hover:text-[#bd341f]">
                {link.label}
              </Out>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BerkeleyBridge() {
  const clubs = communities.filter((community) => community.id !== 'genz');

  return (
    <section
      id="berkeley"
      aria-labelledby="berkeley-title"
      className="relative overflow-hidden bg-[#ef5a40] px-5 py-20 text-[#0b1813] sm:px-8 md:px-[5vw] md:py-16"
    >
      <Reveal className="relative z-10 grid gap-10 md:grid-cols-12">
        <p className="font-reel text-xs font-medium uppercase tracking-[0.08em] md:col-span-3">
          02 · Build · Berkeley
        </p>
        <h2
          id="berkeley-title"
          className="max-w-[17ch] font-serif text-[clamp(2.8rem,4.7vw,4.8rem)] font-light leading-[1] tracking-[-0.04em] md:col-span-9"
        >
          At UC Berkeley, I found my passion in building products.
        </h2>
      </Reveal>

      <Reveal className="relative z-10 mt-16 grid gap-8 border-t border-[#0b1813]/35 pt-8 md:mt-24 md:grid-cols-12">
        <p className="max-w-md text-[clamp(1.2rem,2vw,1.6rem)] leading-relaxed md:col-span-4">
          AI Voice Messenger. Then more products, teams, and rooms to learn from.
        </p>
        <div className="md:col-span-8 md:grid md:grid-cols-3">
          {clubs.map((club) => (
            <div
              key={club.id}
              className="border-b border-[#0b1813]/35 py-6 md:border-b-0 md:border-l md:px-6 md:first:pl-6"
            >
              <p className="font-display text-[clamp(1.3rem,1.8vw,1.8rem)] uppercase leading-[1.02]">
                {club.href ? (
                  <Out href={club.href} className="hover:text-[#f0eadc]">
                    {club.name}
                  </Out>
                ) : (
                  club.name
                )}
              </p>
              <p className="mt-3 font-reel text-[10px] font-medium uppercase tracking-[0.1em]">
                {club.role}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function BlazeChapter() {
  const blaze = products[0];

  return (
    <section id="build" aria-labelledby="blaze-title" className="bg-[#f0eadc] text-[#101713]">
      <div className="bg-[#f4f3f0]">
        <div className="mx-auto grid max-w-[1600px] md:grid-cols-12">
          <Reveal className="px-5 pb-14 pt-24 sm:px-8 md:col-span-8 md:px-[5vw] md:pb-20 md:pt-32">
            <h2
              id="blaze-title"
              className="max-w-[9ch] font-display text-[clamp(3.5rem,15vw,7.2rem)] uppercase leading-[0.82] tracking-[-0.025em] md:text-[clamp(4.5rem,7.2vw,7.2rem)]"
            >
              <Out href={blaze.href!} className="hover:text-[#bd341f]" showArrow={false}>
                {blaze.name}
              </Out>
            </h2>
            <p className="mt-8 max-w-xl text-[clamp(1.1rem,1.7vw,1.4rem)] leading-relaxed text-[#101713]/70">
              {blaze.kicker}. An LLM-powered messaging agent that messages for you by
              voice.
            </p>
          </Reveal>
          <Reveal className="flex flex-col justify-end bg-[#ef5a40] px-5 py-12 sm:px-8 md:col-span-4 md:px-[3vw] md:py-20 md:text-right">
            <p className="font-display text-[clamp(5.5rem,9vw,9rem)] leading-[0.7] tracking-[-0.025em] text-[#101713]">
              200k
            </p>
            <p className="mt-5 font-reel text-[10px] font-medium uppercase tracking-[0.1em] text-[#101713]/70">
              Users · 110k in the first month
            </p>
          </Reveal>
        </div>

        <div className="flex h-[62svh] items-center justify-center overflow-hidden bg-[#07130f] md:h-[68svh]">
          <figure className="h-full overflow-hidden">
            <img
              src="/img/blaze-watch-cutout.png"
              alt="Blaze Messenger on Apple Watch, showing a voice message with transcription and playback controls."
              loading="lazy"
              decoding="async"
              className="h-full w-auto object-contain"
            />
          </figure>
        </div>
      </div>

      <div className="px-5 py-20 sm:px-8 md:px-[5vw] md:py-20">
        <Reveal className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <h3 className="max-w-[10ch] font-serif text-[clamp(2.3rem,4.4vw,4.4rem)] font-light leading-[0.98] tracking-[-0.04em]">
              What it took to launch.
            </h3>
          </div>
          <ul className="grid list-none gap-x-12 gap-y-7 pl-0 md:col-span-8 md:grid-cols-2">
            {blaze.bullets.map((bullet, index) => (
              <li key={bullet} className="border-t border-[#101713]/25 pt-5">
                <span className="font-reel text-[9px] font-medium tracking-[0.1em] text-[#bd341f]">
                  0{index + 1}
                </span>
                <p className="mt-3 text-[1.05rem] leading-relaxed">{bullet}</p>
              </li>
            ))}
          </ul>
        </Reveal>

      </div>
    </section>
  );
}

function FeelableChapter() {
  const feelable = products[1];
  const vibecode = products[2];

  return (
    <section aria-labelledby="feelable-title" className="bg-[#f0eadc] text-[#101713]">
      <div className="mx-auto max-w-[1600px] px-5 pb-24 pt-24 sm:px-8 md:px-[5vw] md:pb-40 md:pt-32">
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end">
          <h2
            id="feelable-title"
            className="font-serif text-[clamp(3.6rem,7.5vw,7.5rem)] font-light lowercase leading-[0.8] tracking-[-0.055em] md:col-span-8"
          >
            <Out href={feelable.href!} className="hover:text-[#bd341f]" showArrow={false}>
              {feelable.name}
            </Out>
          </h2>
          <div className="border-t border-[#101713]/30 pt-5 md:col-span-4">
            <p className="text-[clamp(1.15rem,1.7vw,1.4rem)] leading-relaxed">
              A mood journaling companion.
            </p>
            <p className="mt-4 text-sm text-[#101713]/55">
              Also building: {vibecode.name}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-5 md:mt-24 md:grid-cols-12 md:items-start">
          <figure className="reel-product-frame h-[58svh] md:col-span-7 md:h-auto">
            <img
              src={feelable.images[0].src}
              alt={feelable.images[0].alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-[50%_42%] md:h-auto md:object-contain"
            />
          </figure>

          <div className="grid gap-5 md:col-span-5">
            <figure className="reel-product-frame h-[40svh] md:h-auto">
              <img
                src={feelable.images[2].src}
                alt={feelable.images[2].alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top md:h-auto md:object-contain"
              />
            </figure>

            <figure className="reel-product-frame h-[55svh] md:h-auto">
              <img
                src={feelable.images[1].src}
                alt={feelable.images[1].alt}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-top md:h-auto md:object-contain"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

function NowChapter() {
  const travel = hobbies.find((hobby) => hobby.id === 'travel')!;

  return (
    <section id="now" aria-labelledby="now-title" className="bg-[#07130f] text-[#f0eadc]">
      <div className="relative h-[100svh] overflow-hidden">
        <ParallaxImage
          src={travel.image!.src}
          alt={travel.image!.alt}
          className="absolute inset-0 h-full"
          objectPosition="50% 54%"
          amount={4}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,12,9,0.84)_0%,rgba(3,12,9,0.26)_58%,rgba(3,12,9,0.08)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#07130f] to-transparent" />

        <Reveal className="absolute inset-x-0 bottom-0 z-10 mx-auto w-full max-w-[1600px] px-5 pb-10 sm:px-8 md:px-[5vw] md:pb-14">
          <p className="font-reel text-xs font-medium uppercase tracking-[0.08em] text-[#f0eadc]/70">
            03 · Live · San Francisco
          </p>
          <h2
            id="now-title"
            className="mt-6 max-w-[9ch] font-serif text-[clamp(3.6rem,6vw,6rem)] font-light leading-[0.88] tracking-[-0.05em]"
          >
            Still curious.
          </h2>
        </Reveal>
      </div>

      <div className="bg-[#ef5a40] px-5 py-10 text-[#0b1813] sm:px-8 md:px-[5vw] md:py-12">
        <div className="mx-auto grid max-w-[1500px] gap-7 md:grid-cols-2 md:items-end">
          <p className="max-w-xl text-[clamp(1.2rem,2vw,1.6rem)] leading-relaxed">
            Now, I’m part of the{' '}
            <Out
              href={mission.inlineLinks.productBuilders}
              className="hover:text-[#f0eadc]"
            >
              {identity.cohort}
            </Out>
            .
          </p>
          <p className="font-reel text-[10px] font-medium uppercase leading-relaxed tracking-[0.1em] text-[#0b1813]/65 md:text-right">
            {aboutFacts[2].text}
          </p>
        </div>
      </div>

      <div className="bg-[#f0eadc] px-5 py-20 text-[#101713] sm:px-8 md:px-[5vw] md:py-20">
        <Reveal className="mx-auto max-w-[1500px]">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <h3 className="max-w-[11ch] font-serif text-[clamp(3.2rem,4.8vw,4.8rem)] font-light leading-[0.92] tracking-[-0.045em]">
                Five things, in order.
              </h3>
            </div>
            <p className="md:col-span-5 md:pb-2">
              <Out href={priorities.articleHref} className="text-lg hover:text-[#bd341f]">
                Written on a train to Strasbourg
              </Out>
            </p>
          </div>

          <ol className="mt-16 grid list-none gap-10 border-t border-[#101713]/30 pl-0 md:grid-cols-5 md:gap-6">
            {priorities.items.map((priority, index) => (
              <li
                key={priority.label}
                className="reel-priority relative border-b border-[#101713]/25 pb-8 pt-14 md:min-h-[13rem] md:border-b-0 md:pt-20"
              >
                <span className="absolute left-0 top-7 font-reel text-xs font-medium tracking-[0.1em] text-[#bd341f] md:top-12">
                  0{index + 1}
                </span>
                <span className="block min-h-[3.5rem] font-display text-[clamp(1.55rem,1.9vw,2rem)] uppercase leading-[0.95]">
                  {priority.label}
                </span>
                <span className="mt-4 block max-w-md leading-relaxed text-[#101713]/65">
                  {priority.body}
                </span>
              </li>
            ))}
          </ol>
          <blockquote className="mt-16 max-w-5xl border-t border-[#101713]/30 pt-10 font-serif text-[clamp(1.8rem,3.5vw,3.4rem)] font-light italic leading-tight text-[#101713]/75 md:mt-8">
            {quotes[1].text}
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}

function ArchiveSection({
  index,
  title,
  note,
  children,
}: {
  index: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-t border-[#f0eadc]/25">
      <summary className="grid cursor-pointer list-none grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-7 marker:content-none sm:grid-cols-[4rem_1fr_auto] sm:py-9">
        <span className="font-reel text-[9px] font-medium tracking-[0.1em] text-[#ef5a40]">{index}</span>
        <span>
          <span className="block font-display text-[clamp(2rem,4vw,4rem)] uppercase leading-none">
            {title}
          </span>
          <span className="mt-2 block text-sm leading-relaxed text-[#f0eadc]/50">{note}</span>
        </span>
        <span
          aria-hidden
          className="archive-plus text-3xl font-light transition-transform duration-300 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pb-14 pl-[2.5rem] sm:pl-16">{children}</div>
    </details>
  );
}

function Archive() {
  const clubs = communities.filter((community) => community.id !== 'genz');
  const writing = hobbies.find((hobby) => hobby.id === 'writing');

  return (
    <section
      id="archive"
      aria-labelledby="archive-title"
      className="reel-archive bg-[#07130f] px-5 py-20 text-[#f0eadc] sm:px-8 md:px-[5vw] md:py-24"
    >
      <div className="mx-auto max-w-[1500px]">
        <Reveal className="grid gap-8 border-b border-[#f0eadc]/25 pb-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <h2
              id="archive-title"
              className="font-display text-[clamp(2.8rem,4.5vw,4.5rem)] uppercase leading-[0.85] tracking-[-0.025em]"
            >
              The full index.
            </h2>
          </div>
          <div className="md:col-span-7 md:grid md:grid-cols-[1fr_auto] md:items-end md:gap-10">
            <p className="max-w-2xl text-[1.05rem] leading-relaxed text-[#f0eadc]/65">
              {readsIntro}
            </p>
            <p className="mt-5 md:mt-0">
              <Out href={infoDietHref} className="hover:text-[#ef5a40]">
                Complete Info Diet
              </Out>
            </p>
          </div>
        </Reveal>

        <div className="border-b border-[#f0eadc]/25">
          <ArchiveSection
            index="01"
            title="Books, podcasts, ideas"
            note="Naval · Book of Joy · Sapiens · 3 Body Problem · more"
          >
            <div className="grid gap-x-10 gap-y-10 md:grid-cols-3">
              {reads.map((category) => (
                <div key={category.label}>
                  <h3 className="font-reel text-[10px] font-medium uppercase tracking-[0.1em] text-[#ef5a40]">
                    {category.label}
                  </h3>
                  <p className="mt-4 leading-relaxed text-[#f0eadc]/72">
                    {category.items.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </ArchiveSection>

          <ArchiveSection
            index="02"
            title="Life outside work"
            note="650+ films · 200+ books · 300k+ reads · travel · salsa"
          >
            <p className="mb-10 max-w-xl text-xl italic leading-relaxed text-[#f0eadc]/70">
              {identity.taglineTail}
            </p>
            <div className="grid border-t border-[#f0eadc]/20 md:grid-cols-2">
              {hobbies.map((hobby) => (
                <div
                  key={hobby.id}
                  className="border-b border-[#f0eadc]/20 py-6 md:px-6 md:odd:border-r md:odd:pl-0"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl uppercase leading-none">{hobby.label}</h3>
                    {hobby.stat && (
                      <span className="font-reel text-[9px] font-medium uppercase tracking-[0.1em] text-[#ef5a40]">
                        {hobby.stat}
                      </span>
                    )}
                  </div>
                  {hobby.note && (
                    <p className="mt-3 leading-relaxed text-[#f0eadc]/65">{hobby.note}</p>
                  )}
                  {hobby.links && (
                    <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                      {hobby.links.map((link) => (
                        <Out key={link.href} href={link.href} className="hover:text-[#ef5a40]">
                          {link.label}
                        </Out>
                      ))}
                    </p>
                  )}
                  {hobby.bullets && (
                    <ul className="mt-4 list-none space-y-2 pl-0 text-sm text-[#f0eadc]/65">
                      {hobby.bullets.map((bullet) => (
                        <li key={bullet.text}>
                          {bullet.href ? (
                            <Out href={bullet.href} className="hover:text-[#ef5a40]">
                              {bullet.text}
                            </Out>
                          ) : (
                            bullet.text
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </ArchiveSection>

          <ArchiveSection
            index="03"
            title="Writing and field notes"
            note={`${contentStat} · Threads · Medium · Substack · guides · field notes`}
          >
            <div className="grid gap-12 md:grid-cols-3">
              <div>
                <h3 className="font-reel text-[10px] font-medium uppercase tracking-[0.1em] text-[#ef5a40]">
                  Notebooks
                </h3>
                <div className="mt-4 flex flex-col items-start gap-3">
                  {notebooks.map((notebook) => (
                    <Out
                      key={notebook.href}
                      href={notebook.href}
                      className="hover:text-[#ef5a40]"
                    >
                      {notebook.label}
                    </Out>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-reel text-[10px] font-medium uppercase tracking-[0.1em] text-[#ef5a40]">
                  Essays
                </h3>
                <div className="mt-4 flex flex-col items-start gap-3">
                  {writing?.essays?.map((essay) => (
                    <Out key={essay.href} href={essay.href} className="hover:text-[#ef5a40]">
                      {essay.title}
                    </Out>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-reel text-[10px] font-medium uppercase tracking-[0.1em] text-[#ef5a40]">
                  Guides
                </h3>
                <div className="mt-4 flex flex-col items-start gap-3">
                  {guides.map((guide) => (
                    <div key={guide.href}>
                      <Out href={guide.href} className="hover:text-[#ef5a40]">
                        {guide.label}
                      </Out>
                      {guideNotes[guide.label] && (
                        <span className="mt-1 block text-sm text-[#f0eadc]/45">
                          {guideNotes[guide.label]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-4 border-t border-[#f0eadc]/20 pt-7">
              {channels.map((channel) => (
                <Out key={channel.href} href={channel.href} className="hover:text-[#ef5a40]">
                  {channel.label} · {channel.handle}
                  {channel.meta ? ` · ${channel.meta}` : ''}
                </Out>
              ))}
            </div>
          </ArchiveSection>

          <ArchiveSection
            index="04"
            title="Work and communities"
            note="LinkedIn · HPE · ZEISS · GenZ Taiwan · Berkeley"
          >
            <div className="grid gap-8 md:grid-cols-2">
              {[...work, ...clubs].map((item) => (
                <div key={item.name} className="border-t border-[#f0eadc]/20 pt-5">
                  <h3 className="font-display text-2xl uppercase">
                    {'href' in item && item.href ? (
                      <Out href={item.href} className="hover:text-[#ef5a40]">
                        {item.name}
                      </Out>
                    ) : (
                      item.name
                    )}
                  </h3>
                  <p className="mt-2 text-sm text-[#f0eadc]/60">
                    {'note' in item ? `${item.note} · ${item.role}` : item.role}
                  </p>
                </div>
              ))}
            </div>
          </ArchiveSection>
        </div>
      </div>
    </section>
  );
}

function ClosingFrame() {
  return (
    <section
      id="close"
      aria-labelledby="close-title"
      className="relative h-[100svh] overflow-hidden bg-[#050b09] text-[#f0eadc]"
    >
      <ParallaxImage
        src={photos.tunnel.src}
        alt={photos.tunnel.alt}
        className="absolute inset-0 h-full"
        objectPosition="50% 46%"
        amount={3}
      />
      <div className="absolute inset-0 bg-[#050b09]/45" />

      <Reveal className="absolute inset-x-0 bottom-[17rem] mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:bottom-[13rem] md:right-auto md:mx-0 md:w-[50vw] md:max-w-none md:px-0 md:pl-[5vw]">
        <blockquote>
          <p className="font-serif text-[clamp(2.8rem,5.2vw,5.2rem)] font-light leading-[0.9] tracking-[-0.045em]">
            <span className="block">Don’t follow</span>
            <span className="block">your dreams,</span>
            <span className="block">follow your</span>
            <span className="block">curiosity.</span>
          </p>
          <footer className="mt-4 text-base text-[#f0eadc]/70">
            <Out href={quotes[0].href} className="hover:text-[#ef5a40]">
              And find your style
            </Out>
          </footer>
        </blockquote>
      </Reveal>

      <div className="absolute inset-x-0 bottom-0 bg-[#f0eadc] px-5 py-6 text-[#101713] sm:px-8 md:px-[5vw] md:py-7">
        <div className="mx-auto grid max-w-[1500px] gap-4 sm:grid-cols-[0.32fr_0.68fr] sm:items-start">
          <h2 id="close-title" className="font-display text-3xl uppercase">
            {closing.title}
          </h2>
          <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:gap-8">
            <div>
              <p className="max-w-xl leading-relaxed text-[#101713]/70">{closing.body}</p>
              <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {closing.links.map((link) => (
                  <Out key={link.href} href={link.href} className="hover:text-[#bd341f]">
                    {link.label}
                  </Out>
                ))}
                <Out href={notionHome} className="hover:text-[#bd341f]">
                  Original Notion site
                </Out>
              </p>
            </div>
            <p className="max-w-xs text-sm text-[#bd341f] sm:text-right">
              {mission.paragraphs[2]}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ReelLens() {
  useLensTheme('#07130f', 'dark');

  return (
    <div className="relative overflow-x-clip bg-[#07130f] font-serif">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div aria-hidden className="reel-noise" />
      <StoryHeader />

      <main id="main">
        <Hero />
        <MissionCut />
        <TaipeiChapter />
        <BerkeleyBridge />
        <BlazeChapter />
        <FeelableChapter />
        <NowChapter />
        <ClosingFrame />
        <Archive />
      </main>

      <EditionFooter variant="reel" />
    </div>
  );
}
