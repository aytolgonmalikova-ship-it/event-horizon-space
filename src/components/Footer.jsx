import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';
import { NAV } from './Header';
import Logo from './Logo';

const YEAR = new Date().getFullYear();

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative mt-24 border-t border-white/10 bg-void/70 backdrop-blur">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent" />
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <span className="font-display text-lg font-semibold text-white">{t('siteName')}</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">{t('footerAbout')}</p>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-slate-500">{t('footerRights')}</p>
        </div>
        <div>
          <h2 className="eyebrow mb-4">{t('sections')}</h2>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="text-slate-400 transition hover:text-white">
                  {t(n.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow mb-4">{t('sources')}</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/credits" className="text-slate-400 transition hover:text-white">
                {t('navCredits')}
              </Link>
            </li>
            <li>
              <a href="https://science.nasa.gov/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                NASA Science ↗
              </a>
            </li>
            <li>
              <a href="https://esawebb.org/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                ESA/Webb ↗
              </a>
            </li>
            <li>
              <a href="https://esahubble.org/" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white">
                ESA/Hubble ↗
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-slate-500">
        © {YEAR} {t('siteName')} · {t('tagline')}
      </div>
    </footer>
  );
}
