import { useState } from 'react';
import { planetsData } from '../../data/planetsData';
import PlanetGlobe from './PlanetGlobe';
import { useLang } from '../../i18n/LanguageContext';

const METRICS = ['size', 'distance', 'temp', 'gravity', 'year'];
const LABEL = { size: 'metricSize', distance: 'metricDistance', temp: 'metricTemp', gravity: 'metricGravity', year: 'metricYear' };

function SizeView({ onSelect }) {
  const { tr, nf, t } = useLang();
  const max = Math.max(...planetsData.map((p) => p.diameterKm));
  return (
    <div className="no-scrollbar sm:-mx-4 sm:overflow-x-auto sm:px-4">
      <div className="grid grid-cols-4 items-end gap-x-2 gap-y-6 pb-2 pt-6 sm:flex sm:min-w-[560px] sm:justify-between">
        {planetsData.map((p) => {
          const pct = (p.diameterKm / max) * 100;
          return (
            <button key={p.id} type="button" onClick={() => onSelect(p.id)} className="group flex flex-1 flex-col items-center gap-3">
              <div className="flex h-24 w-full items-end justify-center sm:h-[180px]">
                <div style={{ width: `${Math.max(pct, 2.2)}%`, maxWidth: 180, minWidth: 6 }} className="aspect-square">
                  <PlanetGlobe
                    imageKey={p.image}
                    glow={p.color}
                    ringWidth="205%"
                    className="h-full w-full transition duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-white sm:text-sm">{tr(p.name)}</p>
                <p className="text-[0.65rem] text-slate-400 sm:text-xs">
                  {nf(p.diameterKm)} {t('km')}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Bars({ values, format, log = false, onSelect, note }) {
  const { tr } = useLang();
  const vals = values.map((v) => v.value);
  const tf = log ? (x) => Math.log10(x) : (x) => x;
  const lo = log ? Math.min(...vals.map(tf)) - 0.3 : 0;
  const hi = Math.max(...vals.map(tf));
  return (
    <div className="space-y-2.5 pt-4">
      {values.map(({ p, value }, i) => {
        const pct = ((tf(value) - lo) / (hi - lo)) * 100;
        return (
          <button key={p.id} type="button" onClick={() => onSelect(p.id)} className="group grid w-full grid-cols-[88px_1fr] items-center gap-3 text-left sm:grid-cols-[120px_1fr]">
            <span className="truncate text-sm text-slate-300 group-hover:text-white">{tr(p.name)}</span>
            <span className="relative h-8 overflow-hidden rounded-full bg-white/[0.04]">
              <span
                className="absolute inset-y-0 left-0 flex items-center justify-end rounded-full pr-3 text-xs font-semibold text-void transition-all duration-1000 ease-out"
                style={{
                  width: `${Math.max(pct, 10)}%`,
                  background: `linear-gradient(90deg, ${p.color}55, ${p.color})`,
                  boxShadow: `0 0 20px -4px ${p.color}`,
                  transitionDelay: `${i * 50}ms`,
                }}
              >
                <span className="whitespace-nowrap">{format(value)}</span>
              </span>
            </span>
          </button>
        );
      })}
      {note && <p className="pt-2 text-right text-xs italic text-slate-500">{note}</p>}
    </div>
  );
}

function TempView({ onSelect }) {
  const { tr, nf } = useLang();
  const MIN = -240;
  const MAX = 500;
  const pos = (v) => ((v - MIN) / (MAX - MIN)) * 100;
  return (
    <div className="pt-4">
      <div className="relative mb-2 ml-[100px] h-5 text-[0.65rem] text-slate-500 sm:ml-[132px]">
        {[-200, -100, 0, 100, 200, 300, 400].map((v) => (
          <span key={v} className="absolute -translate-x-1/2" style={{ left: `${pos(v)}%` }}>
            {v}°
          </span>
        ))}
      </div>
      <div className="space-y-2.5">
        {planetsData.map((p) => (
          <button key={p.id} type="button" onClick={() => onSelect(p.id)} className="group grid w-full grid-cols-[88px_1fr] items-center gap-3 text-left sm:grid-cols-[120px_1fr]">
            <span className="truncate text-sm text-slate-300 group-hover:text-white">{tr(p.name)}</span>
            <span className="relative h-8 rounded-full bg-gradient-to-r from-sky-500/15 via-white/[0.03] to-orange-500/20">
              <span className="absolute inset-y-0 w-px bg-white/30" style={{ left: `${pos(0)}%` }} />
              <span
                className="absolute inset-y-2 rounded-full opacity-70"
                style={{
                  left: `${pos(p.temp.min)}%`,
                  width: `${Math.max(pos(p.temp.max) - pos(p.temp.min), 1.2)}%`,
                  background: `linear-gradient(90deg, #60a5fa, ${p.color}, #fb923c)`,
                }}
              />
              <span
                className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
                style={{ left: `${pos(p.temp.mean)}%`, background: p.color, boxShadow: `0 0 12px ${p.color}` }}
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap text-[0.7rem] font-semibold text-white"
                style={p.temp.mean > 250 ? { right: `${100 - pos(p.temp.mean) + 3}%` } : { left: `${pos(p.temp.mean) + 3}%` }}
              >
                {nf(p.temp.mean)} °C
              </span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ComparisonScales({ onSelect }) {
  const { t, nf } = useLang();
  const [metric, setMetric] = useState('size');

  return (
    <div className="card p-4 sm:p-8">
      <div role="tablist" aria-label={t('compareTitle')} className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        {METRICS.map((m) => (
          <button
            key={m}
            role="tab"
            type="button"
            aria-selected={metric === m}
            onClick={() => setMetric(m)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
              metric === m ? 'bg-white text-void shadow-glow' : 'border border-white/10 bg-white/5 text-slate-300 hover:text-white'
            }`}
          >
            {t(LABEL[m])}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-4 min-h-[300px]">
        {metric === 'size' && <SizeView onSelect={onSelect} />}
        {metric === 'distance' && (
          <Bars
            onSelect={onSelect}
            log
            note={t('logScaleNote')}
            values={planetsData.map((p) => ({ p, value: p.distanceAU }))}
            format={(v) => `${nf(v)} ${t('au')}`}
          />
        )}
        {metric === 'temp' && <TempView onSelect={onSelect} />}
        {metric === 'gravity' && (
          <Bars onSelect={onSelect} values={planetsData.map((p) => ({ p, value: p.gravity }))} format={(v) => `${nf(v)} ${t('ms2')}`} />
        )}
        {metric === 'year' && (
          <Bars
            onSelect={onSelect}
            log
            note={t('logScaleNote')}
            values={planetsData.map((p) => ({ p, value: p.yearDays }))}
            format={(v) => (v > 1000 ? `${nf(v / 365.25, { maximumFractionDigits: 1 })} ${t('years')}` : `${nf(v)} ${t('days')}`)}
          />
        )}
      </div>
    </div>
  );
}
