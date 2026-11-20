import { Link } from 'react-router-dom';
import { pageSources } from '../data/sourcesData';
import { useLang } from '../i18n/LanguageContext';

export default function Sources({ page }) {
  const { t } = useLang();
  const list = pageSources[page] ?? [];
  return (
    <section className="container-x mt-24" aria-labelledby={`sources-${page}`}>
      <div className="glass rounded-3xl p-6 sm:p-8">
        <h2 id={`sources-${page}`} className="font-display text-lg font-semibold">
          📚 {t('sources')}
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-400">{t('sourcesNote')}</p>
        <ul className="mt-5 grid gap-2 text-sm sm:grid-cols-2">
          {list.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 text-sky-300 hover:text-sky-200">
                <span className="h-1 w-1 rounded-full bg-sky-400" />
                <span className="underline decoration-sky-400/30 underline-offset-4 group-hover:decoration-sky-300">{s.label}</span>
                <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
        <Link to="/credits" className="mt-5 inline-block text-xs text-slate-400 underline underline-offset-4 hover:text-white">
          {t('navCredits')} →
        </Link>
      </div>
    </section>
  );
}
