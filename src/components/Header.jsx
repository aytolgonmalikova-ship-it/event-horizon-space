import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LANGS, useLang } from '../i18n/LanguageContext';
import Logo from './Logo';

export const NAV = [
  { to: '/', key: 'navHome', end: true },
  { to: '/solar-system', key: 'navSolar' },
  { to: '/stars', key: 'navStars' },
  { to: '/galaxies', key: 'navGalaxies' },
  { to: '/black-holes', key: 'navBlackHoles' },
  { to: '/universe', key: 'navUniverse' },
];

function LangSwitcher({ className = '' }) {
  const { lang, setLang, t } = useLang();
  return (
    <div role="group" aria-label={t('language')} className={`flex rounded-full border border-white/10 bg-white/5 p-0.5 ${className}`}>
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          title={l.name}
          className={`rounded-full px-2 py-1 text-xs sm:px-2.5 font-semibold tracking-wider transition ${
            lang === l.code ? 'bg-white text-void shadow-glow' : 'text-slate-300 hover:text-white'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

export default function Header() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    // Close the mobile menu on navigation (state adjustment during render, no effect needed).
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open ? 'border-b border-white/10 bg-void/75 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-void">
        {t('skipToContent')}
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-2 sm:gap-4 lg:h-20">
        <Link to="/" className="group flex items-center gap-2.5" aria-label={t('siteName')}>
          <Logo className="h-8 w-8 shrink-0 transition duration-700 group-hover:rotate-180 sm:h-9 sm:w-9" />
          <span className="hidden font-display text-base font-semibold tracking-[0.18em] text-white min-[375px]:inline sm:text-lg">
            {t('siteShort').toUpperCase()}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              className={({ isActive }) =>
                `relative rounded-full px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {t(n.key)}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-amber-300 to-transparent transition-opacity ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LangSwitcher />
          <button
            type="button"
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('closeMenu') : t('openMenu')}
          >
            <span className={`absolute h-0.5 w-5 bg-white transition ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
            <span className={`absolute h-0.5 w-5 bg-white transition ${open ? 'opacity-0' : ''}`} />
            <span className={`absolute h-0.5 w-5 bg-white transition ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`lg:hidden ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'} absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain bg-void transition-opacity duration-300`}
      >
        <nav className="container-x flex flex-col gap-1 py-6" aria-label="Mobile">
          {NAV.map((n, i) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              style={{ transitionDelay: open ? `${i * 45}ms` : '0ms' }}
              className={({ isActive }) =>
                `flex items-center justify-between rounded-2xl px-4 py-4 font-display text-lg transition duration-500 ${
                  open ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                } ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5'}`
              }
            >
              {t(n.key)}
              <span aria-hidden="true" className="text-amber-300">→</span>
            </NavLink>
          ))}
          <NavLink to="/credits" className="mt-4 px-4 py-2 text-sm text-slate-400 hover:text-white">
            {t('navCredits')}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
