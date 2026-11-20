import { useRef, useState } from 'react';
import { useLang } from '../../i18n/LanguageContext';
import { videoCategories, videoKinds, videosData } from '../../data/videosData';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import VideoPlayer from './VideoPlayer';
import VideoCredit from './VideoCredit';

function Equalizer() {
  return (
    <span aria-hidden="true" className="flex h-3 items-end gap-0.5">
      {[0, 200, 400].map((d) => (
        <span key={d} className="h-full w-0.5 origin-bottom animate-eq rounded-full bg-amber-300" style={{ animationDelay: `${d}ms` }} />
      ))}
    </span>
  );
}

/** "Space cinema": one big screen + a playlist filtered by topic. Only one <video> on the page. */
export default function CinemaSection() {
  const { t, tr } = useLang();
  const [cat, setCat] = useState('all');
  const [currentId, setCurrentId] = useState(videosData[0].id);
  const [autoStart, setAutoStart] = useState(false);
  const screenRef = useRef(null);

  const list = cat === 'all' ? videosData : videosData.filter((v) => v.category === cat);
  const current = list.find((v) => v.id === currentId) ?? list[0];
  const currentCat = videoCategories.find((c) => c.id === current.category);

  const chooseCategory = (id) => {
    setCat(id);
    const first = id === 'all' ? videosData[0] : videosData.find((v) => v.category === id);
    setCurrentId(first.id);
    setAutoStart(false);
  };

  const chooseVideo = (id) => {
    setCurrentId(id);
    setAutoStart(true);
    // On phones the playlist sits below the screen — bring the screen back into view.
    const el = screenRef.current;
    if (el && el.getBoundingClientRect().top < 64) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const tabs = [{ id: 'all', icon: '🎬', name: null, count: videosData.length }].concat(
    videoCategories.map((c) => ({ ...c, count: videosData.filter((v) => v.category === c.id).length }))
  );

  return (
    <section id="cinema" className="container-x scroll-mt-24 py-20" aria-labelledby="cinema-title">
      <SectionHeading id="cinema-title" eyebrow={t('cinemaEyebrow')} title={t('cinemaTitle')} lead={t('cinemaLead')} />

      <Reveal>
        <div role="group" aria-label={t('cinemaTitle')} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
          {tabs.map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={cat === c.id}
              onClick={() => chooseCategory(c.id)}
              className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                cat === c.id ? 'bg-white text-void shadow-glow' : 'border border-white/10 bg-white/5 text-slate-300 hover:text-white'
              }`}
            >
              <span aria-hidden="true">{c.icon}</span>
              {c.name ? tr(c.name) : t('filterAll')}
              <span className={`text-xs ${cat === c.id ? 'text-void/60' : 'text-slate-500'}`}>{c.count}</span>
            </button>
          ))}
        </div>
      </Reveal>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] lg:gap-6">
        {/* Big screen */}
        <Reveal>
          <div ref={screenRef} className="scroll-mt-24">
            <VideoPlayer key={current.id} video={current} autoStart={autoStart} large />
          </div>
          <div className="mt-6" aria-live="polite">
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.68rem] font-semibold uppercase tracking-widest">
              <span className="text-amber-300">{t('cinemaNowPlaying')}</span>
              <span className="text-slate-600">•</span>
              <span className="text-violet-300">
                {currentCat?.icon} {tr(currentCat?.name)}
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{tr(videoKinds[current.kind])}</span>
              <span className="text-slate-600">•</span>
              <span className="font-mono text-slate-400">{current.duration}</span>
            </p>
            <h3 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">{tr(current.title)}</h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 sm:text-base">{tr(current.description)}</p>
            <VideoCredit video={current} className="mt-4 max-w-3xl" />
          </div>
        </Reveal>

        {/* Playlist */}
        <Reveal delay={120} as="aside" aria-label={t('cinemaPlaylist')} className="glass flex min-w-0 flex-col self-start rounded-3xl p-3 sm:p-4">
          <div className="flex items-baseline justify-between px-1 pb-3">
            <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-slate-200">{t('cinemaPlaylist')}</h3>
            <span className="text-xs text-slate-500">{t('cinemaCount', { n: list.length })}</span>
          </div>
          <ol className="no-scrollbar -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-1 lg:max-h-[34rem] lg:snap-none lg:flex-col lg:gap-1.5 lg:overflow-y-auto lg:overflow-x-visible">
            {list.map((v) => {
              const on = v.id === current.id;
              return (
                <li key={v.id} className="w-56 shrink-0 snap-start sm:w-64 lg:w-auto">
                  <button
                    type="button"
                    onClick={() => chooseVideo(v.id)}
                    aria-current={on ? 'true' : undefined}
                    className={`group flex w-full flex-col gap-2 rounded-2xl border p-2 text-left transition lg:flex-row lg:items-center lg:gap-3 ${
                      on ? 'border-amber-300/40 bg-white/[0.08] shadow-glow' : 'border-transparent hover:border-white/10 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="relative block aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-abyss lg:w-32">
                      <img src={v.poster} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                      <span className="absolute bottom-1 right-1 rounded bg-void/80 px-1.5 py-0.5 font-mono text-[0.6rem] text-slate-200">{v.duration}</span>
                      {on && (
                        <span className="absolute left-1.5 top-1.5 rounded bg-void/80 px-1.5 py-1">
                          <Equalizer />
                        </span>
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className={`line-clamp-2 text-sm font-medium leading-snug ${on ? 'text-white' : 'text-slate-200'}`}>{tr(v.title)}</span>
                      <span className="mt-1 block text-[0.68rem] text-slate-500">
                        {videoCategories.find((c) => c.id === v.category)?.icon} {v.agency}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="mt-3 border-t border-white/10 px-1 pt-3 text-[0.68rem] leading-snug text-slate-500">🎧 {t('videoEnglishNote')}</p>
        </Reveal>
      </div>
    </section>
  );
}
