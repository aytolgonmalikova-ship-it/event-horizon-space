import { useState } from 'react';
import { planetsData, sunData } from '../../data/planetsData';
import PlanetGlobe from './PlanetGlobe';
import { useLang } from '../../i18n/LanguageContext';

// Visual sizes (px at desktop) — exaggerated, not to scale.
const DOT = { mercury: 10, venus: 15, earth: 16, mars: 12, jupiter: 34, saturn: 28, uranus: 21, neptune: 20 };

export default function OrbitMap({ onSelect }) {
  const { tr } = useLang();
  const [paused, setPaused] = useState(false);

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[720px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Sun */}
      <div className="absolute left-1/2 top-1/2 z-10 h-[13%] w-[13%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute -inset-1/2 animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(255,180,70,.75),transparent_65%)]" />
        <PlanetGlobe imageKey="sun" alt={tr(sunData.name)} className="relative h-full w-full shadow-glow-amber" />
      </div>

      {planetsData.map((p, i) => {
        const radius = 13 + i * 5.3; // % of container
        const duration = 10 * Math.pow(p.yearDays / 88, 0.42); // compressed Kepler-ish timing
        const size = DOT[p.id];
        return (
          <div key={p.id}>
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.08]"
              style={{ width: `${radius * 2}%`, height: `${radius * 2}%` }}
            />
            <div
              className="pointer-events-none absolute left-1/2 top-1/2"
              style={{
                width: `${radius * 2}%`,
                height: `${radius * 2}%`,
                transform: 'translate(-50%,-50%)',
              }}
            >
              <div
                className="h-full w-full"
                style={{
                  animation: `orbit ${duration}s linear infinite`,
                  animationDelay: `-${(i * 7.3) % duration}s`,
                  animationPlayState: paused ? 'paused' : 'running',
                }}
              >
                <button
                  type="button"
                  onClick={() => onSelect(p.id)}
                  aria-label={tr(p.name)}
                  className="group pointer-events-auto absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full p-2"
                >
                  <span
                    className="relative block"
                    style={{
                      animation: `orbit-rev ${duration}s linear infinite`,
                      animationDelay: `-${(i * 7.3) % duration}s`,
                      animationPlayState: paused ? 'paused' : 'running',
                    }}
                  >
                  <span
                    className="relative block rounded-full ring-0 transition duration-300 group-hover:scale-150 group-focus-visible:scale-150"
                    style={{
                      width: `clamp(${Math.max(6, size * 0.5)}px, ${size / 7.2}vw, ${size}px)`,
                      height: `clamp(${Math.max(6, size * 0.5)}px, ${size / 7.2}vw, ${size}px)`,
                      background: `radial-gradient(circle at 35% 30%, #fff8, ${p.color} 45%, #000a 100%)`,
                      boxShadow: `0 0 18px ${p.color}aa`,
                    }}
                  >
                    {p.id === 'saturn' && (
                      <span
                        className="absolute left-1/2 top-1/2 h-[38%] w-[190%] -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-[50%] border-2"
                        style={{ borderColor: '#e6cf8faa' }}
                      />
                    )}
                  </span>
                  <span className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-void/80 px-2 py-0.5 text-[0.65rem] font-medium text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                    {tr(p.name)}
                  </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
