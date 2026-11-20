import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';
import { mindBlowingFacts, sectionsOverview, stats } from '../data/homeData';
import { images } from '../data/images';
import ApodSection from '../components/ApodSection';
import BlackHoleVisual from '../components/BlackHoleVisual';
import Credit from '../components/Credit';
import Reveal from '../components/Reveal';
import SectionHeading from '../components/SectionHeading';
import Sources from '../components/Sources';
import CinemaSection from '../components/video/CinemaSection';

function Counter({ value, decimals = 0, prefix = '' }) {
  const { nf } = useLang();
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1800;
      const tick = (now) => {
        const p = Math.min(1, (now - start) / dur);
        setN(value * (1 - Math.pow(1 - p, 4)));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);
  return (
    <span ref={ref}>
      {prefix}
      {nf(n, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}

function FlipCard({ fact, index }) {
  const { tr, t } = useLang();
  const [flipped, setFlipped] = useState(false);
  return (
    <Reveal delay={index * 70}>
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        className="group h-60 w-full text-left [perspective:1200px]"
      >
        <div
          className={`relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] ${
            flipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          <div className="card card-hover absolute inset-0 flex flex-col justify-between p-6 [backface-visibility:hidden]">
            <span className="text-4xl">{fact.icon}</span>
            <div>
              <h3 className="text-lg font-semibold leading-snug">{tr(fact.q)}</h3>
              <p className="mt-2 text-xs uppercase tracking-widest text-amber-300/80">{t('flipHint')} ↻</p>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center rounded-3xl border border-amber-300/25 bg-gradient-to-br from-amber-500/15 via-abyss to-violet-900/30 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-sm leading-relaxed text-slate-200 sm:text-[0.95rem]">{tr(fact.a)}</p>
          </div>
        </div>
      </button>
    </Reveal>
  );
}

export default function Home() {
  const { t, tr } = useLang();

  return (
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24">
        <img
          src={images.cosmicCliffs.hero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full animate-drift object-cover opacity-45"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-void/60 via-void/50 to-void" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_45%,transparent_0%,rgba(3,4,10,.85)_65%)]" />

        <div className="container-x grid items-center gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div className="relative z-10">
            <p className="eyebrow animate-fade-up">{t('heroEyebrow')}</p>
            <h1 className="mt-5 animate-fade-up text-[2.6rem] font-extrabold leading-[0.98] [animation-delay:120ms] sm:text-7xl xl:text-8xl">
              <span className="text-gradient drop-shadow-[0_0_35px_rgba(255,170,90,.35)]">{t('siteName')}</span>
            </h1>
            <p className="mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-slate-300 [animation-delay:240ms] sm:text-lg">
              {t('heroLead')}
            </p>
            <div className="mt-9 flex animate-fade-up flex-wrap gap-3 [animation-delay:360ms]">
              <Link to="/solar-system" className="btn-primary px-6 py-3 text-base">
                🚀 {t('heroCta')}
              </Link>
              <a href="#apod" className="btn-ghost px-6 py-3 text-base">
                🔭 {t('heroCta2')}
              </a>
            </div>
          </div>
          <div className="relative mx-auto w-[min(88vw,520px)] animate-fade-up [animation-delay:200ms] lg:w-full">
            <BlackHoleVisual className="animate-float" />
          </div>
        </div>

        <a href="#stats" className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400 sm:flex">
          {t('scrollDown')}
          <span className="h-10 w-px animate-pulse bg-gradient-to-b from-amber-300 to-transparent" />
        </a>
        <div className="absolute bottom-3 right-4 max-w-[70%] text-right">
          <Credit imageKey="cosmicCliffs" className="rounded-lg bg-void/60 px-2 py-1 backdrop-blur" />
        </div>
      </section>

      {/* STATS */}
      <section id="stats" className="container-x scroll-mt-24 py-16" aria-label={t('statsTitle')}>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 80} className="card p-5 sm:p-7">
              <p className="font-display text-2xl font-bold text-white sm:text-4xl">
                <Counter value={s.value} decimals={s.decimals} prefix={s.prefix} />
              </p>
              <p className="mt-1 text-sm font-medium text-amber-200">{tr(s.unit)}</p>
              <p className="mt-2 text-xs leading-snug text-slate-400 sm:text-sm">{tr(s.label)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <ApodSection />

      {/* SECTIONS OVERVIEW */}
      <section className="container-x py-20" aria-labelledby="overview-title">
        <SectionHeading id="overview-title" eyebrow={t('overviewEyebrow')} title={t('overviewTitle')} lead={t('overviewLead')} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {sectionsOverview.map((s, i) => (
            <Reveal key={s.to} delay={i * 80} className={`flex flex-col ${i < 2 ? 'lg:col-span-3' : 'lg:col-span-2'} ${i === sectionsOverview.length - 1 && sectionsOverview.length % 2 ? 'md:col-span-2 lg:col-span-2' : ''}`}>
              <Link
                to={s.to}
                className="group relative flex min-h-[300px] flex-1 flex-col justify-end sm:min-h-[340px] overflow-hidden rounded-3xl border border-white/10 transition duration-500 hover:border-white/25 hover:shadow-glow"
              >
                <img
                  src={images[s.image].src}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition duration-[1.4s] group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${s.accent} via-void/70 to-void/10`} />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/60 to-transparent" />
                <div className="relative p-6 sm:p-7">
                  <span className="chip font-mono">{tr(s.scale)}</span>
                  <h3 className="mt-3 text-2xl font-bold">{t(s.navKey)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">{tr(s.text)}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-300">
                    {t('explore')} <span className="transition group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
              <Credit imageKey={s.image} className="mt-2" />
            </Reveal>
          ))}
        </div>
      </section>

      <CinemaSection />

      {/* FACTS */}
      <section className="container-x py-20" aria-labelledby="facts-title">
        <SectionHeading id="facts-title" eyebrow={t('factsEyebrow')} title={t('factsTitle')} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mindBlowingFacts.map((f, i) => (
            <FlipCard key={i} fact={f} index={i} />
          ))}
        </div>
      </section>

      <Sources page="home" />
    </>
  );
}
