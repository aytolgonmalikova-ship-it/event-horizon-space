import { useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { composition, mysteries, scaleLadder, timeline } from '../data/universeData';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import SpaceImage from '../components/SpaceImage';
import Sources from '../components/Sources';
import VideoShowcase from '../components/video/VideoShowcase';

function ScaleLadder() {
  const { t, tr } = useLang();
  const [i, setI] = useState(0);
  const s = scaleLadder[i];
  return (
    <div className="card overflow-hidden p-5 sm:p-8">
      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div key={i} className="animate-fade-up">
          <SpaceImage imageKey={s.image} alt={tr(s.name)} aspect="aspect-[4/3]" rounded="rounded-3xl" />
        </div>
        <div>
          <p className="eyebrow">
            {i + 1} / {scaleLadder.length}
          </p>
          <h3 key={`h${i}`} className="mt-2 animate-fade-up text-3xl font-bold sm:text-4xl">
            {tr(s.name)}
          </h3>
          <dl className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <dt className="text-[0.68rem] uppercase tracking-wider text-slate-400">{t('size')}</dt>
              <dd className="mt-1 font-display text-sm font-semibold text-white sm:text-base">{tr(s.size)}</dd>
            </div>
            <div className="rounded-2xl bg-white/[0.04] p-3">
              <dt className="text-[0.68rem] uppercase tracking-wider text-slate-400">{t('lightTravel')}</dt>
              <dd className="mt-1 font-display text-sm font-semibold text-white sm:text-base">{tr(s.light)}</dd>
            </div>
          </dl>
          <p key={`p${i}`} className="mt-5 animate-fade-up leading-relaxed text-slate-300">
            {tr(s.text)}
          </p>
          <div className="mt-7">
            <input
              type="range"
              min="0"
              max={scaleLadder.length - 1}
              value={i}
              onChange={(e) => setI(Number(e.target.value))}
              aria-label={t('scaleTitle')}
              aria-valuetext={tr(s.name)}
              className="w-full accent-violet-400"
            />
            <div className="mt-2 flex justify-between">
              {scaleLadder.map((x, k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setI(k)}
                  aria-label={tr(x.name)}
                  className={`h-2.5 w-2.5 rounded-full transition ${k <= i ? 'bg-violet-300 shadow-glow' : 'bg-white/15'}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-6 flex gap-3">
            <button type="button" className="btn-ghost" disabled={i === 0} onClick={() => setI((v) => Math.max(0, v - 1))}>
              ← {t('prev')}
            </button>
            <button type="button" className="btn-primary" disabled={i === scaleLadder.length - 1} onClick={() => setI((v) => Math.min(scaleLadder.length - 1, v + 1))}>
              {t('next')} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompositionDonut() {
  const { tr } = useLang();
  const [active, setActive] = useState('de');
  const R = 80;
  const C = 2 * Math.PI * R;
  const offsets = composition.map((_, k) => composition.slice(0, k).reduce((sum, c) => sum + (c.pct / 100) * C, 0));
  const cur = composition.find((c) => c.id === active);
  return (
    <div className="card grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-[auto_1fr]">
      <div className="relative mx-auto h-64 w-64 sm:h-72 sm:w-72">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          {composition.map((c, k) => {
            const len = (c.pct / 100) * C;
            return (
              <circle
                key={c.id}
                cx="100"
                cy="100"
                r={R}
                fill="none"
                stroke={c.color}
                strokeWidth={active === c.id ? 30 : 22}
                strokeDasharray={`${len - 2} ${C - len + 2}`}
                strokeDashoffset={-offsets[k]}
                className="cursor-pointer transition-all duration-500"
                style={{ filter: active === c.id ? `drop-shadow(0 0 10px ${c.color})` : 'none', opacity: active === c.id ? 1 : 0.55 }}
                onClick={() => setActive(c.id)}
              />
            );
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="font-display text-5xl font-bold text-white">{cur.pct}%</span>
          <span className="mt-1 max-w-[9rem] text-xs text-slate-400">{tr(cur.name)}</span>
        </div>
      </div>
      <div>
        <div className="flex flex-wrap gap-2">
          {composition.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={active === c.id}
              onClick={() => setActive(c.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                active === c.id ? 'bg-white text-void' : 'border border-white/10 bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: c.color }} />
              {tr(c.name)} · {c.pct}%
            </button>
          ))}
        </div>
        <div key={active} className="mt-6 animate-fade-up">
          <h3 className="text-2xl font-bold" style={{ color: cur.color }}>
            {tr(cur.name)}
          </h3>
          <p className="mt-3 leading-relaxed text-slate-300">{tr(cur.text)}</p>
        </div>
      </div>
    </div>
  );
}

export default function Universe() {
  const { t, tr } = useLang();
  return (
    <>
      <PageHero imageKey="deepField" eyebrow={t('uniEyebrow')} title={t('uniTitle')} lead={t('uniLead')} />

      <section className="container-x py-20" aria-labelledby="scale-title">
        <SectionHeading id="scale-title" title={t('scaleTitle')} lead={t('scaleLead')} />
        <Reveal>
          <ScaleLadder />
        </Reveal>
      </section>

      <section className="container-x py-16" aria-labelledby="timeline-title">
        <SectionHeading id="timeline-title" title={t('timelineTitle')} center />
        <ol className="relative mx-auto max-w-4xl">
          <span className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-amber-300 via-violet-400 to-sky-400 md:left-1/2" aria-hidden="true" />
          {timeline.map((e, i) => (
            <Reveal
              as="li"
              key={i}
              delay={60}
              className={`relative mb-8 pl-12 md:w-1/2 md:pl-0 ${i % 2 ? 'md:ml-auto md:pl-10' : 'md:pr-10 md:text-right'}`}
            >
              <span
                className={`absolute left-4 top-2 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 border-void bg-amber-300 shadow-glow-amber ${
                  i % 2 ? 'md:left-0' : 'md:left-full'
                }`}
                aria-hidden="true"
              />
              <p className="font-mono text-sm text-amber-300">{tr(e.time)}</p>
              <h3 className="mt-1 text-xl font-semibold">{tr(e.name)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{tr(e.text)}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-x py-16" aria-labelledby="comp-title">
        <SectionHeading id="comp-title" title={t('compositionTitle')} lead={t('compositionLead')} />
        <Reveal>
          <CompositionDonut />
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <Reveal>
            <SpaceImage imageKey="pandora" alt="Pandora’s Cluster (Abell 2744)" aspect="aspect-[16/10]" rounded="rounded-3xl" />
          </Reveal>
          <Reveal delay={100}>
            <SpaceImage imageKey="hudf" alt="Hubble Ultra Deep Field" aspect="aspect-[16/10]" rounded="rounded-3xl" />
          </Reveal>
        </div>
      </section>

      <VideoShowcase category="cosmos" />

      <section className="container-x py-16" aria-labelledby="myst-title">
        <SectionHeading id="myst-title" title={t('mysteriesTitle')} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {mysteries.map((m, i) => (
            <Reveal key={i} delay={(i % 3) * 80} className="card card-hover p-6">
              <span className="text-3xl">{m.icon}</span>
              <h3 className="mt-4 text-lg font-semibold">{tr(m.name)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{tr(m.text)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <Sources page="universe" />
    </>
  );
}
