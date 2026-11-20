import { useEffect, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { famousStars, lifeCycles, spectralClasses } from '../data/starsData';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import SpaceImage from '../components/SpaceImage';
import StarSphere from '../components/StarSphere';
import Sources from '../components/Sources';
import VideoShowcase from '../components/video/VideoShowcase';

function SpectralExplorer() {
  const { t, tr, lang } = useLang();
  const [active, setActive] = useState(4); // G — the Sun
  const c = spectralClasses[active];
  return (
    <div className="card overflow-hidden p-4 sm:p-8">
      <div className="grid grid-cols-7 overflow-hidden rounded-2xl" role="tablist" aria-label={t('spectralTitle')}>
        {spectralClasses.map((s, i) => (
          <button
            key={s.cls}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`relative py-5 font-display text-xl font-bold transition sm:py-7 sm:text-3xl ${active === i ? 'z-10 scale-y-110' : 'opacity-75 hover:opacity-100'}`}
            style={{ background: s.color, color: '#0b0f1e', boxShadow: active === i ? `0 0 40px ${s.color}` : 'none' }}
          >
            {s.cls}
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[0.65rem] uppercase tracking-widest text-slate-500">
        <span>🔥 &gt; 30 000 K</span>
        <span>2 400 K ❄️</span>
      </div>

      <div className="mt-8 grid items-center gap-8 md:grid-cols-[auto_1fr]" role="tabpanel">
        <div className="flex justify-center px-10 py-6">
          <StarSphere key={c.cls} color={c.color} size={150} className="animate-fade-up" />
        </div>
        <div>
          <p className="eyebrow" style={{ color: c.color }}>
            {tr(c.colorName)}
          </p>
          <h3 className="mt-2 text-3xl font-bold">
            {t('spectralClass')} {c.cls}
          </h3>
          <p className="mt-3 leading-relaxed text-slate-300">{tr(c.note)}</p>
          <dl className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <dt className="text-[0.68rem] uppercase tracking-wider text-slate-400">{t('surfaceTemp')}</dt>
              <dd className="mt-1 font-display font-semibold text-white">{c.tempK} K</dd>
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <dt className="text-[0.68rem] uppercase tracking-wider text-slate-400">{t('shareOfStars')}</dt>
              <dd className="mt-1 font-display font-semibold text-white">{lang === 'en' ? c.shareEn : c.share}</dd>
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <dt className="text-[0.68rem] uppercase tracking-wider text-slate-400">{t('examples')}</dt>
              <dd className="mt-1 text-sm font-semibold text-white">{tr(c.examples)}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

const VISUAL_COLOR = { redgiant: '#ff7a3d', whitedwarf: '#e0f2fe', supergiant: '#ef4444', remnant: '#7dd3fc' };
const VISUAL_SIZE = { redgiant: 210, whitedwarf: 46, supergiant: 240, remnant: 34 };

function LifeCycle() {
  const { t, tr } = useLang();
  const [path, setPath] = useState('low');
  const [step, setStep] = useState(0);
  const stages = lifeCycles[path];
  const s = stages[step];

  const choose = (p) => {
    setPath(p);
    setStep(0);
  };

  return (
    <div className="card overflow-hidden p-4 sm:p-8">
      <div className="flex flex-wrap gap-2">
        {['low', 'high'].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => choose(p)}
            aria-pressed={path === p}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              path === p ? 'bg-white text-void shadow-glow' : 'border border-white/10 bg-white/5 text-slate-300 hover:text-white'
            }`}
          >
            {p === 'low' ? '☀️ ' + t('lowMass') : '💥 ' + t('highMass')}
          </button>
        ))}
      </div>

      {/* stepper */}
      <ol className="no-scrollbar mt-6 flex gap-2 overflow-x-auto pb-2">
        {stages.map((st, i) => (
          <li key={i} className="min-w-[120px] flex-1">
            <button type="button" onClick={() => setStep(i)} className="w-full text-left" aria-current={i === step ? 'step' : undefined}>
              <span
                className="block h-1.5 rounded-full transition-all duration-500"
                style={{ background: i <= step ? st.glow : 'rgba(255,255,255,.1)', boxShadow: i === step ? `0 0 14px ${st.glow}` : 'none' }}
              />
              <span className={`mt-2 block text-xs leading-tight ${i === step ? 'text-white' : 'text-slate-500'}`}>
                {i + 1}. {tr(st.name)}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div key={`${path}-${step}`} className="mt-6 grid animate-fade-up items-center gap-8 lg:grid-cols-2">
        <div>
          {s.image ? (
            <SpaceImage imageKey={s.image} alt={tr(s.name)} aspect="aspect-[4/3]" rounded="rounded-3xl" />
          ) : (
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,.04),transparent_70%)]">
              <StarSphere color={VISUAL_COLOR[s.visual]} size={VISUAL_SIZE[s.visual]} />
              {s.visual === 'remnant' && (
                <div className="absolute h-[70%] w-1 bg-gradient-to-b from-transparent via-sky-300/70 to-transparent blur-[1px]" />
              )}
            </div>
          )}
        </div>
        <div>
          <p className="eyebrow" style={{ color: s.glow }}>
            {t('stage')} {step + 1} / {stages.length} · {tr(s.time)}
          </p>
          <h3 className="mt-3 text-3xl font-bold sm:text-4xl">{tr(s.name)}</h3>
          <p className="mt-4 leading-relaxed text-slate-300">{tr(s.text)}</p>
          <div className="mt-6 flex gap-3">
            <button type="button" className="btn-ghost" disabled={step === 0} onClick={() => setStep((v) => Math.max(0, v - 1))}>
              ← {t('prev')}
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setStep((v) => (v + 1) % stages.length)}
            >
              {step === stages.length - 1 ? '↺' : `${t('next')} →`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SizeComparison() {
  const { t, tr, nf } = useLang();
  const [id, setId] = useState('betelgeuse');
  const star = famousStars.find((s) => s.id === id);
  const sun = famousStars[0];
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640);
  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const BIG = narrow ? 78 : 150;
  const ratio = star.radius;
  const rStar = ratio >= 1 ? BIG : BIG * ratio;
  const rSun = ratio >= 1 ? Math.max(BIG / ratio, 0.6) : BIG;

  return (
    <div className="card overflow-hidden p-4 sm:p-8">
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {famousStars.slice(1).map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setId(s.id)}
            aria-pressed={id === s.id}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
              id === s.id ? 'bg-white text-void' : 'border border-white/10 bg-white/5 text-slate-300 hover:text-white'
            }`}
          >
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
            {tr(s.name)}
          </button>
        ))}
      </div>
      <div className="relative mt-6 flex h-[340px] items-center justify-around overflow-hidden rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,.12),transparent_70%)]">
        {[
          { s: sun, r: rSun },
          { s: star, r: rStar },
        ].map(({ s, r }) => (
          <div key={s.id} className="flex flex-col items-center gap-4">
            <div className="flex h-[300px] items-center justify-center">
              <div
                className="rounded-full transition-all duration-700 ease-out"
                style={{
                  width: r * 2,
                  height: r * 2,
                  background: `radial-gradient(circle at 38% 34%, #fff, ${s.color} 40%, ${s.color}aa 75%)`,
                  boxShadow: `0 0 ${Math.max(r / 2, 8)}px ${s.color}`,
                }}
              />
            </div>
          </div>
        ))}
        <div className="absolute inset-x-0 bottom-3 flex justify-around text-center text-xs">
          <span className="text-slate-300">
            {tr(sun.name)} · 1 {t('solarRadii')}
          </span>
          <span className="text-white">
            {tr(star.name)} · ≈ {nf(star.radius)} {t('solarRadii')}
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm text-slate-400">{t('sizeCompareLead')}</p>
    </div>
  );
}

export default function Stars() {
  const { t, tr } = useLang();

  return (
    <>
      <PageHero imageKey="pillarsWebb" eyebrow={t('starsEyebrow')} title={t('starsTitle')} lead={t('starsLead')} />

      <section className="container-x py-20" aria-labelledby="spectral-title">
        <SectionHeading id="spectral-title" title={t('spectralTitle')} lead={t('spectralLead')} />
        <Reveal>
          <SpectralExplorer />
        </Reveal>
      </section>

      <section className="container-x py-12" aria-labelledby="life-title">
        <SectionHeading id="life-title" title={t('lifeTitle')} lead={t('lifeLead')} />
        <Reveal>
          <LifeCycle />
        </Reveal>
      </section>

      <section className="container-x py-20" aria-labelledby="size-title">
        <SectionHeading id="size-title" title={t('sizeCompare')} />
        <Reveal>
          <SizeComparison />
        </Reveal>
      </section>

      <section className="container-x py-8" aria-labelledby="famous-title">
        <SectionHeading id="famous-title" title={t('famousStars')} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {famousStars.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 70} className="card card-hover relative overflow-hidden p-6">
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-30 blur-3xl" style={{ background: s.color }} />
              <StarSphere color={s.color} size={44} pulse={false} />
              <h3 className="mt-5 text-xl font-bold">{tr(s.name)}</h3>
              <p className="mt-1 font-mono text-xs text-slate-400">
                {s.cls} · {tr(s.constellation)}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{tr(s.text)}</p>
              <dl className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-3 text-xs">
                <div>
                  <dt className="text-slate-500">{t('distanceLy')}</dt>
                  <dd className="font-semibold text-white">{tr(s.distance)}</dd>
                </div>
                <div>
                  <dt className="text-slate-500">{t('radius')}</dt>
                  <dd className="font-semibold text-white">≈ {s.radius} R☉</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>
      </section>

      <VideoShowcase category="stars" />

      <Sources page="stars" />
    </>
  );
}
