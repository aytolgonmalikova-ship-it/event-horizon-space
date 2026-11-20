import { useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { anatomy, bhFacts, calcPresets, famousBlackHoles, formation, M_SUN } from '../data/blackHolesData';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import BlackHoleVisual from '../components/BlackHoleVisual';
import SpaceImage from '../components/SpaceImage';
import Sources from '../components/Sources';
import VideoShowcase from '../components/video/VideoShowcase';

const G = 6.674e-11;
const C = 299792458;
const AU = 1.496e11;

function AnatomyDiagram({ active, onSelect }) {
  const hi = (id) => (active === id ? 1 : 0.35);
  return (
    <svg viewBox="-200 -200 400 400" className="h-full w-full" role="img" aria-label="Black hole anatomy diagram">
      <defs>
        <radialGradient id="bh-disk-g">
          <stop offset="40%" stopColor="#ffe2a8" stopOpacity="0" />
          <stop offset="48%" stopColor="#ffe2a8" />
          <stop offset="70%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#7c2d12" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bh-jet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity=".9" />
        </linearGradient>
        <linearGradient id="bh-jet2" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#7dd3fc" stopOpacity="0" />
          <stop offset="100%" stopColor="#7dd3fc" stopOpacity=".9" />
        </linearGradient>
        <filter id="bh-blur"><feGaussianBlur stdDeviation="2.5" /></filter>
      </defs>
      {/* jets */}
      <g opacity={hi('jets')} className="cursor-pointer transition-opacity duration-500" onClick={() => onSelect('jets')}>
        <polygon points="-7,-30 7,-30 22,-195 -22,-195" fill="url(#bh-jet)" filter="url(#bh-blur)" />
        <polygon points="-7,30 7,30 22,195 -22,195" fill="url(#bh-jet2)" filter="url(#bh-blur)" />
      </g>
      {/* accretion disk */}
      <g opacity={hi('disk')} className="cursor-pointer transition-opacity duration-500" onClick={() => onSelect('disk')}>
        <ellipse cx="0" cy="0" rx="180" ry="38" fill="url(#bh-disk-g)" filter="url(#bh-blur)" />
      </g>
      {/* photon sphere */}
      <g opacity={hi('photon')} className="cursor-pointer transition-opacity duration-500" onClick={() => onSelect('photon')}>
        <circle r="48" fill="none" stroke="#fde68a" strokeWidth="3" strokeDasharray="5 4" />
        <circle r="48" fill="none" stroke="#fde68a" strokeWidth="10" opacity=".15" />
      </g>
      {/* event horizon */}
      <g className="cursor-pointer" onClick={() => onSelect('horizon')}>
        <circle r="32" fill="#000" stroke={active === 'horizon' ? '#a78bfa' : '#ffffff22'} strokeWidth={active === 'horizon' ? 3 : 1} />
      </g>
      {/* front of disk over the horizon */}
      <path d="M-180,0 A180,38 0 0 0 180,0" fill="none" stroke="#fb923c" strokeWidth="5" opacity={hi('disk') * 0.9} filter="url(#bh-blur)" className="pointer-events-none" />
      {/* singularity */}
      <g className="cursor-pointer" onClick={() => onSelect('singularity')}>
        <circle r="10" fill="transparent" />
        <circle r="3" fill="#fff" opacity={active === 'singularity' ? 1 : 0.5}>
          {active === 'singularity' && <animate attributeName="r" values="2;5;2" dur="1.6s" repeatCount="indefinite" />}
        </circle>
      </g>
    </svg>
  );
}

function sci(x, nf) {
  const exp = Math.floor(Math.log10(x));
  const mant = x / 10 ** exp;
  return `${nf(mant, { maximumFractionDigits: 2 })} × 10${toSup(exp)}`;
}

function formatLength(m, t, nf) {
  if (m < 1e-6) return `${sci(m, nf)} ${t('m')}`;
  if (m < 1e-2) return `${nf(m * 1000, { maximumFractionDigits: 2 })} ${t('mm')}`;
  if (m < 1000) return `${nf(m, { maximumFractionDigits: 2 })} ${t('m')}`;
  if (m < 1e9) return `${nf(m / 1000, { maximumFractionDigits: 2 })} ${t('km')}`;
  if (m < 0.5 * AU) return `${nf(m / 1e9, { maximumFractionDigits: 1 })} ${t('mkm')}`;
  return `${nf(m / AU, { maximumFractionDigits: 1 })} ${t('au')}`;
}
function toSup(exp) {
  const map = { '-': '⁻', '+': '', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  return String(exp)
    .split('')
    .map((c) => map[c] ?? c)
    .join('');
}

function Calculator() {
  const { t, tr, nf } = useLang();
  const [preset, setPreset] = useState('earth');
  const [custom, setCustom] = useState('');
  const customMass = parseFloat(String(custom).replace(',', '.'));
  const usingCustom = Number.isFinite(customMass) && customMass > 0;
  const massKg = usingCustom ? customMass * M_SUN : calcPresets.find((p) => p.id === preset).massKg;
  const rs = (2 * G * massKg) / (C * C);

  return (
    <div className="card overflow-hidden p-5 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-2xl font-bold sm:text-3xl">{t('calcTitle')}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">{t('calcLead')}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {calcPresets.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={!usingCustom && preset === p.id}
                onClick={() => {
                  setPreset(p.id);
                  setCustom('');
                }}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  !usingCustom && preset === p.id ? 'bg-white text-void shadow-glow' : 'border border-white/10 bg-white/5 text-slate-300 hover:text-white'
                }`}
              >
                {tr(p.name)}
              </button>
            ))}
          </div>
          <label htmlFor="custom-mass" className="mt-6 block text-sm text-slate-300">
            {t('calcCustom')}
          </label>
          <input
            id="custom-mass"
            type="text"
            inputMode="decimal"
            placeholder="10"
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
            className="mt-2 w-full max-w-xs rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 font-display text-lg text-white outline-none focus:border-violet-300/60"
          />
        </div>
        <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-900/30 via-abyss to-black p-8 text-center">
          <BlackHoleVisual className="pointer-events-none absolute -right-16 -top-16 w-56 opacity-40" />
          <p className="relative text-xs uppercase tracking-[0.25em] text-violet-200">{t('calcResult')}</p>
          <p key={rs} className="relative mt-4 animate-fade-up font-display text-4xl font-bold text-white sm:text-5xl">
            {formatLength(rs, t, nf)}
          </p>
          <p className="relative mt-4 font-mono text-xs text-slate-400">
            {t('mass2')}: {sci(massKg, nf)} {t('kg')}
          </p>
          <p className="relative mt-1 font-mono text-xs text-slate-500">r = 2GM / c²</p>
        </div>
      </div>
    </div>
  );
}

export default function BlackHoles() {
  const { t, tr, lang } = useLang();
  const [part, setPart] = useState('horizon');
  const current = anatomy.find((a) => a.id === part);
  const maxLog = Math.log10(Math.max(...famousBlackHoles.map((b) => b.massSun)));

  return (
    <>
      <PageHero imageKey="ngc1275" eyebrow={t('bhEyebrow')} title={t('bhTitle')} lead={t('bhLead')} />

      {/* Anatomy */}
      <section className="container-x py-20" aria-labelledby="anatomy-title">
        <SectionHeading id="anatomy-title" title={t('anatomyTitle')} lead={t('anatomyHint')} />
        <Reveal className="card grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-2">
          <div className="mx-auto aspect-square w-full max-w-[460px]">
            <AnatomyDiagram active={part} onSelect={setPart} />
          </div>
          <div>
            <div className="flex flex-wrap gap-2" role="tablist">
              {anatomy.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  role="tab"
                  aria-selected={part === a.id}
                  onClick={() => setPart(a.id)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
                    part === a.id ? 'bg-white text-void shadow-glow' : 'border border-white/10 bg-white/5 text-slate-300 hover:text-white'
                  }`}
                >
                  <span className="h-2.5 w-2.5 rounded-full border border-white/40" style={{ background: a.color }} />
                  {tr(a.name)}
                </button>
              ))}
            </div>
            <div key={part} className="mt-6 animate-fade-up" role="tabpanel">
              <h3 className="text-3xl font-bold">{tr(current.name)}</h3>
              <p className="mt-4 leading-relaxed text-slate-300">{tr(current.text)}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Formation */}
      <section className="container-x py-12" aria-labelledby="formation-title">
        <SectionHeading id="formation-title" title={t('formationTitle')} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {formation.map((f, i) => (
            <Reveal key={i} delay={i * 80} className="card card-hover p-6">
              <span className="text-4xl">{f.icon}</span>
              <h3 className="mt-4 text-lg font-semibold">{tr(f.name)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{tr(f.text)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <VideoShowcase category="blackHoles" />

      {/* Calculator */}
      <section className="container-x py-16">
        <Reveal>
          <Calculator />
        </Reveal>
      </section>

      {/* Famous */}
      <section className="container-x py-16" aria-labelledby="famous-bh-title">
        <SectionHeading id="famous-bh-title" title={t('famousBhTitle')} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {famousBlackHoles.map((b, i) => (
            <Reveal key={b.id} delay={(i % 3) * 80} className="card card-hover flex flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-2xl font-bold">{tr(b.name)}</h3>
                <div className="relative mt-1 h-8 w-8 shrink-0 rounded-full bg-black shadow-[0_0_14px_3px_rgba(255,190,120,.6)]" />
              </div>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{tr(b.text)}</p>
              <div className="mt-5">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>
                    {tr(b.massLabel)} {t('solarMasses')}
                  </span>
                  <span>{tr(b.distance)}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-amber-300"
                    style={{ width: `${Math.max(4, (Math.log10(b.massSun) / maxLog) * 100)}%` }}
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-3 text-right text-xs italic text-slate-500">{t('logScaleNote')}</p>
      </section>

      {/* Hubble image + facts */}
      <section className="container-x py-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <SpaceImage imageKey="ngc1275" alt="NGC 1275 — Perseus A" aspect="aspect-[4/3]" rounded="rounded-3xl" />
          </Reveal>
          <div>
            <SectionHeading title={t('didYouKnow')} />
            <ul className="space-y-3">
              {(bhFacts[lang] ?? bhFacts.en).map((f, i) => (
                <Reveal as="li" key={i} delay={i * 70} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-slate-300">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-400 shadow-glow" />
                  {f}
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Sources page="blackHoles" />
    </>
  );
}
