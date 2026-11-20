import { useCallback, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import { planetsData, sunData } from '../data/planetsData';
import PlanetGlobe from '../components/planets/PlanetGlobe';
import PageHero from '../components/PageHero';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import Credit from '../components/Credit';
import Sources from '../components/Sources';
import OrbitMap from '../components/planets/OrbitMap';
import PlanetModal from '../components/planets/PlanetModal';
import ComparisonScales from '../components/planets/ComparisonScales';
import WeightCalculator from '../components/planets/WeightCalculator';
import VideoShowcase from '../components/video/VideoShowcase';

export default function SolarSystem() {
  const { t, tr, nf } = useLang();
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);

  return (
    <>
      <PageHero imageKey="saturn" eyebrow={t('solarEyebrow')} title={t('solarTitle')} lead={t('solarLead')} />

      {/* Orbit map + Sun */}
      <section className="container-x py-20" aria-labelledby="orbit-title">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="-m-4 overflow-hidden p-4">
            <OrbitMap onSelect={setSelected} />
          </Reveal>
          <div>
            <SectionHeading id="orbit-title" eyebrow={tr(sunData.type)} title={t('orbitTitle')} lead={t('orbitHint')} />
            <Reveal className="card flex gap-4 p-5">
              <PlanetGlobe imageKey="sun" alt={tr(sunData.name)} className="h-20 w-20 shrink-0 shadow-glow-amber" />
              <div>
                <h3 className="text-xl font-semibold">{tr(sunData.name)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{tr(sunData.description)}</p>
                <Credit imageKey="sun" className="mt-2" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Planet cards */}
      <section className="container-x py-12" aria-labelledby="planets-title">
        <SectionHeading id="planets-title" title={t('planetsTitle')} lead={t('clickToExplore')} />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {planetsData.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 80} className="flex flex-col">
              <button
                type="button"
                onClick={() => setSelected(p.id)}
                className="card card-hover group relative flex w-full flex-1 flex-col overflow-hidden p-5 text-left"
              >
                <div
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-25 blur-3xl transition group-hover:opacity-50"
                  style={{ background: p.color }}
                />
                <PlanetGlobe
                  imageKey={p.image}
                  alt={tr(p.name)}
                  glow={p.color}
                  className="relative mx-auto aspect-square w-3/4 transition duration-[1.2s] group-hover:rotate-6 group-hover:scale-105"
                />
                <p className="mt-5 text-xs font-semibold uppercase tracking-widest" style={{ color: p.color }}>
                  {tr(p.type)}
                </p>
                <h3 className="mt-1 text-2xl font-bold">{tr(p.name)}</h3>
                <p className="text-sm text-slate-400">{tr(p.tagline)}</p>
                <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-center">
                  <div>
                    <dt className="text-[0.62rem] uppercase tracking-wider text-slate-500">{t('diameter')}</dt>
                    <dd className="mt-0.5 text-xs font-semibold text-white">{nf(p.diameterKm)}</dd>
                  </div>
                  <div>
                    <dt className="text-[0.62rem] uppercase tracking-wider text-slate-500">{t('temperature')}</dt>
                    <dd className="mt-0.5 text-xs font-semibold text-white">{nf(p.temp.mean)}°</dd>
                  </div>
                  <div>
                    <dt className="text-[0.62rem] uppercase tracking-wider text-slate-500">{t('moons')}</dt>
                    <dd className="mt-0.5 text-xs font-semibold text-white">
                      {p.moons}
                      {p.moonsPlus ? '+' : ''}
                    </dd>
                  </div>
                </dl>
                <span className="mt-4 text-sm font-semibold text-amber-300">
                  {t('learnMore')} <span className="inline-block transition group-hover:translate-x-1">→</span>
                </span>
              </button>
              <Credit imageKey={p.image} className="mt-2" />
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-slate-500">* {t('moonsNote')}</p>
      </section>

      {/* Comparison scales */}
      <section className="container-x py-20" aria-labelledby="compare-title">
        <SectionHeading id="compare-title" title={t('compareTitle')} lead={t('compareLead')} />
        <Reveal>
          <ComparisonScales onSelect={setSelected} />
        </Reveal>
      </section>

      <section className="container-x py-8">
        <Reveal>
          <WeightCalculator />
        </Reveal>
      </section>

      <VideoShowcase category="planets" />

      {selected && <PlanetModal planetId={selected} onClose={close} onNavigate={setSelected} />}

      <Sources page="solar" />
    </>
  );
}
