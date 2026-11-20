import { useState } from 'react';
import { planetsData } from '../../data/planetsData';
import { useLang } from '../../i18n/LanguageContext';

const G_EARTH = 9.81;

export default function WeightCalculator() {
  const { t, tr, nf } = useLang();
  const [weight, setWeight] = useState(60);
  const w = Number.isFinite(weight) ? Math.max(0, Math.min(weight, 1000)) : 0;
  const max = Math.max(...planetsData.map((p) => p.gravity));

  return (
    <div className="card overflow-hidden p-5 sm:p-8">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h3 className="text-2xl font-bold sm:text-3xl">{t('weightTitle')}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">{t('weightLead')}</p>
          <label className="mt-6 block text-sm font-medium text-slate-300" htmlFor="weight">
            {t('weightLabel')}
          </label>
          <div className="mt-2 flex items-center gap-4">
            <input
              id="weight"
              type="number"
              inputMode="decimal"
              min="1"
              max="1000"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="w-28 rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 font-display text-xl text-white outline-none focus:border-amber-300/60"
            />
            <input
              type="range"
              min="5"
              max="200"
              value={w}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              aria-label={t('weightLabel')}
              className="flex-1 accent-amber-300"
            />
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {planetsData.map((p) => {
            const value = (w * p.gravity) / G_EARTH;
            return (
              <li key={p.id} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">
                <span
                  className="absolute inset-x-0 bottom-0 transition-all duration-500"
                  style={{ height: `${(p.gravity / max) * 100}%`, background: `linear-gradient(to top, ${p.color}33, transparent)` }}
                />
                <p className="relative text-xs text-slate-400">{tr(p.name)}</p>
                <p className="relative mt-1 font-display text-xl font-semibold text-white">
                  {nf(value, { maximumFractionDigits: 1 })}
                  <span className="ml-1 text-xs font-normal text-slate-400">{t('kg')}</span>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
