import { useLang } from '../../i18n/LanguageContext';
import { planetsData } from '../../data/planetsData';
import Modal from '../Modal';
import SpaceImage from '../SpaceImage';

function Stat({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
      <p className="text-[0.68rem] uppercase tracking-wider text-slate-400">{label}</p>
      <p
        className={`mt-1 font-semibold text-white ${
          String(value).length > 16 ? 'text-[0.8rem] leading-snug' : 'font-display text-sm sm:text-base'
        }`}
      >
        {value}
      </p>
      {sub && <p className="mt-0.5 text-[0.7rem] text-slate-400">{sub}</p>}
    </div>
  );
}

export default function PlanetModal({ planetId, onClose, onNavigate }) {
  const { t, tr, nf, lang } = useLang();
  const idx = planetsData.findIndex((p) => p.id === planetId);
  const p = planetsData[idx];
  if (!p) return null;
  const prev = planetsData[(idx - 1 + planetsData.length) % planetsData.length];
  const next = planetsData[(idx + 1) % planetsData.length];
  const facts = p.facts[lang] ?? p.facts.en;

  return (
    <Modal open={!!p} onClose={onClose} labelledBy="planet-title" wide>
      <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_1.15fr]">
        <div className="relative p-5 sm:p-8 lg:sticky lg:top-0 lg:self-start">
          <div
            className="pointer-events-none absolute left-1/2 top-1/3 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
            style={{ background: p.color }}
          />
          <SpaceImage
            key={p.id}
            imageKey={p.image}
            alt={tr(p.name)}
            aspect="aspect-square"
            rounded="rounded-3xl"
            imgClassName="h-full w-full object-contain"
            large
            priority
          />
        </div>
        <div className="p-5 pt-0 sm:p-8 lg:pl-2">
          <p className="eyebrow" style={{ color: p.color }}>
            {tr(p.type)} · #{p.order}
          </p>
          <h2 id="planet-title" className="mt-2 text-4xl font-bold sm:text-5xl">
            {tr(p.name)}
          </h2>
          <p className="mt-1 text-lg text-slate-400">{tr(p.tagline)}</p>
          <p className="mt-5 leading-relaxed text-slate-300">{tr(p.description)}</p>

          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            <Stat label={t('diameter')} value={`${nf(p.diameterKm)} ${t('km')}`} />
            <Stat label={t('mass')} value={`${nf(p.massEarth)}`} sub={t('massEarths')} />
            <Stat label={t('distance')} value={`${nf(p.distanceMkm)} ${t('mkm')}`} sub={`${nf(p.distanceAU)} ${t('au')}`} />
            <Stat label={t('dayLength')} value={tr(p.day)} />
            <Stat label={t('yearLength')} value={tr(p.year)} />
            <Stat label={t('gravity')} value={`${nf(p.gravity)} ${t('ms2')}`} />
            <Stat
              label={t('temperature')}
              value={`${nf(p.temp.mean)} °C`}
              sub={`${nf(p.temp.min)} … ${nf(p.temp.max)} °C`}
            />
            <Stat label={t('moons')} value={`${p.moons}${p.moonsPlus ? '+' : ''}`} />
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">🌫️ {t('atmosphere')}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{tr(p.atmosphere)}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">🧪 {t('composition')}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{tr(p.composition)}</p>
            </div>
            {p.notableMoons.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">🌙 {t('notableMoons')}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {p.notableMoons.map((m) => (
                    <span key={m.en} className="chip">
                      {tr(m)}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">✨ {t('funFacts')}</h3>
              <ul className="mt-2 space-y-2">
                {facts.map((f, i) => (
                  <li key={i} className="flex gap-3 rounded-xl bg-white/[0.03] p-3 text-sm leading-relaxed text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.color }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {p.missions.map((m) => (
                <span key={m} className="chip border-sky-400/20 text-sky-200">
                  🛰 {m}
                </span>
              ))}
            </div>
            {p.moonsPlus && <p className="text-xs text-slate-500">* {t('moonsNote')}</p>}
          </div>

          <div className="mt-8 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
            <button type="button" className="btn-ghost" onClick={() => onNavigate(prev.id)}>
              ← {tr(prev.name)}
            </button>
            <button type="button" className="btn-ghost" onClick={() => onNavigate(next.id)}>
              {tr(next.name)} →
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
