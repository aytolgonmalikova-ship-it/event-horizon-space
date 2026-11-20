import { useCallback, useEffect, useState } from 'react';
import { useLang } from '../i18n/LanguageContext';
import SectionHeading from './SectionHeading';
import SpaceImage from './SpaceImage';

/**
 * NASA APOD integration.
 *  - API key from VITE_NASA_API_KEY (falls back to the public DEMO_KEY).
 *  - Result cached in localStorage for 3 h to save the (rate-limited) quota.
 *  - On failure: last cached edition → else a credited ESA/Webb fallback image.
 *  - Handles media_type "image", "video" (YouTube/Vimeo iframe, mp4, or thumbnail) and "other".
 *  - Third-party copyright from the API is always shown next to the media.
 */
const API = 'https://api.nasa.gov/planetary/apod';
const KEY = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
const CACHE_KEY = 'gorizont.apod';
const TTL = 3 * 60 * 60 * 1000;

function readCache() {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
  } catch {
    return null;
  }
}
function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* ignore quota / private mode */
  }
}

function apodPageUrl(date) {
  if (!date) return 'https://apod.nasa.gov/apod/';
  const [y, m, d] = date.split('-');
  return `https://apod.nasa.gov/apod/ap${y.slice(2)}${m}${d}.html`;
}

function isEmbeddable(url = '') {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(url);
}

function Loader() {
  const { t } = useLang();
  return (
    <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr]" role="status" aria-live="polite">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl bg-white/[0.03]">
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-white/10 border-t-amber-300" />
          <div className="absolute inset-3 animate-[spin_1.6s_linear_infinite_reverse] rounded-full border-2 border-white/10 border-b-violet-400" />
          <div className="absolute inset-[34px] rounded-full bg-amber-200 shadow-glow-amber" />
        </div>
      </div>
      <div className="space-y-4 py-2">
        <p className="text-sm text-amber-200">{t('apodLoading')}</p>
        <div className="h-8 w-3/4 rounded-lg bg-white/[0.06]" />
        <div className="h-4 w-1/3 rounded bg-white/[0.05]" />
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-3 rounded bg-white/[0.04]" style={{ width: `${95 - i * 7}%` }} />
        ))}
      </div>
    </div>
  );
}

function Media({ data }) {
  const { t } = useLang();
  const alt = data.title;
  if (data.media_type === 'video') {
    if (isEmbeddable(data.url)) {
      return (
        <div className="aspect-video overflow-hidden rounded-3xl border border-white/10 bg-black">
          <iframe
            src={data.url}
            title={data.title}
            className="h-full w-full"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            loading="lazy"
          />
        </div>
      );
    }
    if (/\.(mp4|webm)(\?|$)/i.test(data.url)) {
      return <video src={data.url} controls playsInline className="w-full rounded-3xl border border-white/10 bg-black" />;
    }
    // Unknown video host: thumbnail (if any) linking out.
    return (
      <a href={data.url} target="_blank" rel="noreferrer" className="group relative block aspect-video overflow-hidden rounded-3xl border border-white/10 bg-abyss">
        {data.thumbnail_url && <img src={data.thumbnail_url} alt={alt} className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100" />}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="btn-primary">▶ {t('apodOpenVideo')}</span>
        </span>
      </a>
    );
  }
  if (data.media_type === 'image') {
    return (
      <a href={data.hdurl || data.url} target="_blank" rel="noreferrer" className="group block overflow-hidden rounded-3xl border border-white/10 bg-abyss">
        <img src={data.url} alt={alt} className="max-h-[640px] w-full object-cover transition duration-700 group-hover:scale-[1.02]" />
      </a>
    );
  }
  // media_type "other" (interactive content etc.)
  return (
    <a href={apodPageUrl(data.date)} target="_blank" rel="noreferrer" className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-white/10 bg-gradient-to-br from-violet-900/40 to-abyss">
      <span className="btn-primary">{t('apodOnSite')} ↗</span>
    </a>
  );
}

export default function ApodSection() {
  const { t, lang, locale } = useLang();
  const [state, setState] = useState({ status: 'loading', data: null, stale: false });
  const [expanded, setExpanded] = useState(false);

  const load = useCallback(async (force = false) => {
    const cached = readCache();
    if (!force && cached && Date.now() - cached.at < TTL) {
      setState({ status: 'ok', data: cached.data, stale: false });
      return;
    }
    setState((s) => ({ ...s, status: 'loading' }));
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 12000);
    try {
      const res = await fetch(`${API}?api_key=${KEY}&thumbs=true`, { signal: ctrl.signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (!data || !data.url || !data.media_type) throw new Error('Malformed APOD response');
      writeCache(data);
      setState({ status: 'ok', data, stale: false });
    } catch {
      if (cached?.data) setState({ status: 'ok', data: cached.data, stale: true });
      else setState({ status: 'error', data: null, stale: false });
    } finally {
      clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const { status, data, stale } = state;
  const dateLabel = data?.date
    ? new Date(`${data.date}T12:00:00`).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <section id="apod" className="container-x scroll-mt-24 py-20 sm:py-28" aria-labelledby="apod-title">
      <SectionHeading id="apod-title" eyebrow={t('apodEyebrow')} title={t('apodTitle')} lead={t('apodLead')} />

      {status === 'loading' && <Loader />}

      {status === 'error' && (
        <div className="grid animate-fade-up items-center gap-8 lg:grid-cols-[1.35fr_1fr]">
          <SpaceImage imageKey="cosmicCliffs" alt="Cosmic Cliffs, Carina Nebula — James Webb Space Telescope" rounded="rounded-3xl" large />
          <div>
            <p className="rounded-2xl border border-amber-300/20 bg-amber-300/5 p-4 text-sm text-amber-100">{t('apodError')}</p>
            <h3 className="mt-6 text-2xl font-semibold">“Cosmic Cliffs” · NGC 3324</h3>
            <button type="button" onClick={() => load(true)} className="btn-ghost mt-6">
              ↻ {t('apodRetry')}
            </button>
          </div>
        </div>
      )}

      {status === 'ok' && data && (
        <div className="grid animate-fade-up gap-8 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <Media data={data} />
            <p className="mt-2 text-[0.7rem] text-slate-400">
              {data.copyright ? (
                <>
                  © {data.copyright.replace(/\n/g, ' ').trim()} — {t('apodCopyright')}
                </>
              ) : (
                <>
                  {t('credit')}: NASA ·{' '}
                  <a className="underline underline-offset-2" href={apodPageUrl(data.date)} target="_blank" rel="noreferrer">
                    Astronomy Picture of the Day
                  </a>
                </>
              )}
            </p>
          </div>
          <div className="flex flex-col">
            {stale && <p className="mb-4 rounded-xl border border-amber-300/20 bg-amber-300/5 px-3 py-2 text-xs text-amber-100">{t('apodStale')}</p>}
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip">{dateLabel}</span>
              {data.media_type === 'video' && <span className="chip border-fuchsia-400/30 text-fuchsia-200">▶ {t('apodVideo')}</span>}
            </div>
            <h3 className="mt-4 text-2xl font-semibold leading-snug sm:text-3xl">{data.title}</h3>
            {lang !== 'en' && <p className="mt-2 text-xs italic text-slate-500">{t('apodOriginalLang')}</p>}
            <p lang="en" className={`mt-4 text-sm leading-relaxed text-slate-300 ${expanded ? '' : 'line-clamp-[9]'}`}>
              {data.explanation}
            </p>
            {data.explanation?.length > 500 && (
              <button type="button" onClick={() => setExpanded((v) => !v)} className="mt-2 self-start text-sm font-medium text-amber-300 hover:text-amber-200">
                {expanded ? t('apodShowLess') : t('apodReadMore')}
              </button>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={apodPageUrl(data.date)} target="_blank" rel="noreferrer" className="btn-ghost">
                {t('apodOnSite')} ↗
              </a>
              {data.hdurl && (
                <a href={data.hdurl} target="_blank" rel="noreferrer" className="btn-ghost">
                  {t('apodHd')} ↗
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
