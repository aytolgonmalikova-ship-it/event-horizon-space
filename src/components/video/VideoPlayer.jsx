import { useEffect, useRef, useState } from 'react';
import { useLang } from '../../i18n/LanguageContext';
import { videoKinds } from '../../data/videosData';

/** Fired whenever any player starts, so every other player on the page pauses. */
const PLAY_EVENT = 'horizon:video-play';

/** Phones and "Save-Data" connections get the lighter encode (≈3–10 MB instead of ≈20–60 MB). */
function pickSource(video) {
  if (typeof window === 'undefined') return video.src;
  const saveData = navigator.connection?.saveData === true;
  const small = window.matchMedia?.('(max-width: 640px)').matches;
  return saveData || small ? video.srcMobile : video.src;
}

function PlayIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" fill="currentColor" />
    </svg>
  );
}

/**
 * Space-styled video player.
 * Renders a lightweight poster "facade" first; the <video> element (and the file itself)
 * is only created after the visitor presses play. Files stream straight from NASA / ESA servers.
 * Parent should pass key={video.id} so switching videos fully resets the player.
 */
export default function VideoPlayer({ video, autoStart = false, showTitle = false, large = false, className = '' }) {
  const { t, tr } = useLang();
  const videoRef = useRef(null);
  const tried = useRef(new Set());
  const [src, setSrc] = useState(() => (autoStart ? pickSource(video) : null));
  const [status, setStatus] = useState(autoStart ? 'loading' : 'idle'); // idle | loading | ready | error
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  // Only one video plays at a time across the whole site.
  useEffect(() => {
    const onOtherPlay = (e) => {
      if (e.detail !== videoRef.current) videoRef.current?.pause();
    };
    window.addEventListener(PLAY_EVENT, onOtherPlay);
    return () => window.removeEventListener(PLAY_EVENT, onOtherPlay);
  }, []);

  const start = () => {
    tried.current = new Set();
    setSrc(pickSource(video));
    setStatus('loading');
  };

  const onError = () => {
    // One automatic fallback to the other encode before showing an error.
    tried.current.add(src);
    const next = [video.src, video.srcMobile].find((s) => !tried.current.has(s));
    if (next) setSrc(next);
    else setStatus('error');
  };

  const onPlay = () => window.dispatchEvent(new CustomEvent(PLAY_EVENT, { detail: videoRef.current }));

  const kind = videoKinds[video.kind];
  const title = tr(video.title);
  const active = src !== null && status !== 'error';
  const coverVisible = status === 'idle' || status === 'loading';

  return (
    <div className={`group/frame relative isolate ${className}`}>
      {/* soft cosmic glow behind the frame */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute -z-10 rounded-[2rem] bg-gradient-to-br from-violet-600/30 via-sky-500/10 to-amber-400/25 blur-2xl transition duration-700 ${
          large ? '-inset-4 opacity-80' : '-inset-2 opacity-50'
        } group-hover/frame:opacity-100 ${status === 'ready' ? 'opacity-100' : ''}`}
      />
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-[0_24px_60px_-28px_rgba(0,0,0,.95)] ring-1 ring-inset ring-white/5 sm:rounded-3xl">
        {active && (
          <video
            ref={videoRef}
            key={src}
            src={src}
            poster={video.poster}
            controls
            autoPlay
            playsInline
            preload="auto"
            aria-label={title}
            onLoadedData={() => setStatus('ready')}
            onPlaying={() => setStatus('ready')}
            onPlay={onPlay}
            onError={onError}
            className="absolute inset-0 h-full w-full bg-black object-contain"
          />
        )}

        {/* Poster facade / loading cover — fades out once the video is ready */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            coverVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          {!posterLoaded && !posterFailed && (
            <div className="absolute inset-0 overflow-hidden bg-white/[0.03]">
              <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            </div>
          )}
          {posterFailed ? (
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/50 via-abyss to-black" />
          ) : (
            <img
              src={video.poster}
              alt=""
              loading="lazy"
              decoding="async"
              onLoad={() => setPosterLoaded(true)}
              onError={() => setPosterFailed(true)}
              className={`absolute inset-0 h-full w-full object-cover transition duration-[1.2s] group-hover/frame:scale-[1.04] ${
                posterLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/20 to-void/30" />

          {status === 'idle' && (
            <button
              type="button"
              onClick={start}
              aria-label={`${t('videoPlay')}: ${title}`}
              className="absolute inset-0 flex h-full w-full items-center justify-center text-left"
            >
              <span className="relative flex items-center justify-center">
                <span aria-hidden="true" className="absolute inset-0 animate-halo rounded-full bg-violet-400/40" />
                <span
                  className={`relative flex items-center justify-center rounded-full border border-white/30 bg-white/10 text-white shadow-glow backdrop-blur-md transition duration-500 group-hover/frame:scale-110 group-hover/frame:border-amber-200/60 group-hover/frame:bg-white/20 group-hover/frame:shadow-glow-amber ${
                    large ? 'h-20 w-20 sm:h-24 sm:w-24' : 'h-14 w-14 sm:h-16 sm:w-16'
                  }`}
                >
                  <PlayIcon className={`ml-1 ${large ? 'h-8 w-8 sm:h-10 sm:w-10' : 'h-6 w-6'}`} />
                </span>
              </span>

              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 sm:p-4">
                <span className="min-w-0">
                  {kind && (
                    <span className="inline-block rounded-full border border-white/15 bg-void/60 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-widest text-violet-200 backdrop-blur">
                      {tr(kind)}
                    </span>
                  )}
                  {showTitle && (
                    <span className="mt-2 block font-display text-base font-semibold leading-snug text-white sm:text-xl">{title}</span>
                  )}
                </span>
                <span className="shrink-0 rounded-full border border-white/15 bg-void/70 px-2.5 py-1 font-mono text-xs text-slate-200 backdrop-blur">
                  {video.duration}
                </span>
              </span>
            </button>
          )}

          {status === 'loading' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" role="status">
              <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/15 border-t-amber-300" />
              <span className="text-xs uppercase tracking-[0.25em] text-slate-300">{t('videoLoading')}</span>
            </div>
          )}
        </div>

        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-violet-950/90 via-abyss to-black p-6 text-center" role="alert">
            <p className="max-w-sm text-sm text-slate-300">{t('videoError')}</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" onClick={start} className="btn-ghost">
                ↻ {t('videoRetry')}
              </button>
              <a href={video.href} target="_blank" rel="noreferrer" className="btn-ghost">
                {t('videoOpenSource')} ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
