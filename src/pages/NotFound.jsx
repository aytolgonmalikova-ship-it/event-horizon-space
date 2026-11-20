import { Link } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext';
import BlackHoleVisual from '../components/BlackHoleVisual';

export default function NotFound() {
  const { t } = useLang();
  return (
    <section className="container-x flex min-h-screen flex-col items-center justify-center pt-20 text-center">
      <BlackHoleVisual className="w-64 sm:w-80" />
      <p className="mt-6 font-display text-6xl font-extrabold text-gradient">404</p>
      <h1 className="mt-4 text-2xl font-bold sm:text-3xl">{t('notFoundTitle')}</h1>
      <p className="mt-3 max-w-md text-slate-400">{t('notFoundText')}</p>
      <Link to="/" className="btn-primary mt-8">
        ← {t('backHome')}
      </Link>
    </section>
  );
}
