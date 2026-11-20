import { useMemo } from 'react';
import { useLang } from '../i18n/LanguageContext';

/** Procedural (original) top-down sketch of a barred spiral with a "You are here" marker. */
export default function MilkyWayMap() {
  const { t } = useLang();
  const dots = useMemo(() => {
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const out = [];
    const arms = 4;
    for (let a = 0; a < arms; a++) {
      const base = (a / arms) * Math.PI * 2;
      for (let i = 0; i < 260; i++) {
        const tt = i / 260;
        const theta = base + tt * Math.PI * 2.4;
        const r = 30 + tt * 165;
        const spread = 6 + tt * 16;
        const x = 200 + Math.cos(theta) * r + (rnd() - 0.5) * spread;
        const y = 200 + Math.sin(theta) * r + (rnd() - 0.5) * spread;
        const warm = rnd() > 0.75;
        out.push({ x, y, s: 0.4 + rnd() * 1.3, c: warm ? '#ffd2a1' : rnd() > 0.5 ? '#cad7ff' : '#ffffff', o: 0.25 + rnd() * 0.7 });
      }
    }
    for (let i = 0; i < 420; i++) {
      const ang = rnd() * Math.PI * 2;
      const r = Math.pow(rnd(), 2) * 60;
      out.push({ x: 200 + Math.cos(ang) * r * 1.5, y: 200 + Math.sin(ang) * r * 0.7, s: 0.4 + rnd(), c: '#ffe2b8', o: 0.4 + rnd() * 0.6 });
    }
    return out;
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label={t('milkyWayTitle')}>
        <defs>
          <radialGradient id="mw-core">
            <stop offset="0%" stopColor="#fff3d6" stopOpacity="1" />
            <stop offset="35%" stopColor="#ffb86b" stopOpacity=".55" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g style={{ transformOrigin: '200px 200px', animation: 'orbit 240s linear infinite' }}>
          <circle cx="200" cy="200" r="190" fill="url(#mw-core)" opacity=".18" />
          <ellipse cx="200" cy="200" rx="70" ry="30" fill="url(#mw-core)" opacity=".9" transform="rotate(-25 200 200)" />
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.s} fill={d.c} opacity={d.o} />
          ))}
        </g>
        <circle cx="200" cy="200" r="3" fill="#000" stroke="#ffe2a8" strokeWidth="1" />
        {/* Sun ~ 26 000 ly of ~50 000 ly radius */}
        <g>
          <circle cx="200" cy="96" r="5" fill="#fde047">
            <animate attributeName="r" values="4;7;4" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="200" cy="96" r="12" fill="none" stroke="#fde047" strokeOpacity=".6">
            <animate attributeName="r" values="6;18;6" dur="2.4s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" values=".8;0;.8" dur="2.4s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
      <span className="absolute left-1/2 top-[19%] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full bg-amber-300 px-2.5 py-0.5 text-xs font-bold text-void shadow-glow-amber">
        ☀ {t('youAreHere')}
      </span>
      <span className="absolute left-1/2 top-1/2 mt-3 -translate-x-1/2 whitespace-nowrap text-[0.65rem] text-amber-100/80">{t('galCenter')}</span>
    </div>
  );
}
