import { lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Starfield from './components/Starfield';
import { useLang } from './i18n/LanguageContext';
import Home from './pages/Home';

const SolarSystem = lazy(() => import('./pages/SolarSystem'));
const Stars = lazy(() => import('./pages/Stars'));
const Galaxies = lazy(() => import('./pages/Galaxies'));
const BlackHoles = lazy(() => import('./pages/BlackHoles'));
const Universe = lazy(() => import('./pages/Universe'));
const Credits = lazy(() => import('./pages/Credits'));
const NotFound = lazy(() => import('./pages/NotFound'));

const TITLES = {
  '/': null,
  '/solar-system': 'navSolar',
  '/stars': 'navStars',
  '/galaxies': 'navGalaxies',
  '/black-holes': 'navBlackHoles',
  '/universe': 'navUniverse',
  '/credits': 'navCredits',
};

function RouteEffects() {
  const { pathname, hash } = useLocation();
  const { t } = useLang();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return undefined;
    }
    // Links like "/#cinema" from another page: wait for the target section to render, then scroll to it.
    let tries = 0;
    let timer;
    const scrollToHash = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else if (tries++ < 30) timer = setTimeout(scrollToHash, 100);
    };
    scrollToHash();
    return () => clearTimeout(timer);
  }, [pathname, hash]);
  useEffect(() => {
    const key = TITLES[pathname];
    document.title = key ? `${t(key)} · ${t('siteName')}` : `${t('siteName')} — ${t('tagline')}`;
  }, [pathname, t]);
  return null;
}

function PageLoader() {
  const { t } = useLang();
  return (
    <div className="flex min-h-screen items-center justify-center" role="status">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-amber-300" />
      <span className="sr-only">{t('loading')}</span>
    </div>
  );
}

export default function App() {
  return (
    <>
      <Starfield />
      <RouteEffects />
      <Header />
      <main id="main">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/solar-system" element={<SolarSystem />} />
            <Route path="/stars" element={<Stars />} />
            <Route path="/galaxies" element={<Galaxies />} />
            <Route path="/black-holes" element={<BlackHoles />} />
            <Route path="/universe" element={<Universe />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
