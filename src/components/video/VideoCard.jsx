import { useLang } from '../../i18n/LanguageContext';
import { videoCategories, videoKinds } from '../../data/videosData';
import VideoPlayer from './VideoPlayer';
import VideoCredit from './VideoCredit';

/** A video with its title, description and mandatory credit line, framed as a card. */
export default function VideoCard({ video }) {
  const { tr } = useLang();
  const cat = videoCategories.find((c) => c.id === video.category);
  return (
    <figure className="card flex h-full flex-col p-3 sm:p-4">
      <VideoPlayer video={video} />
      <figcaption className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.65rem] font-semibold uppercase tracking-widest">
          {cat && (
            <span className="text-violet-300">
              {cat.icon} {tr(cat.name)}
            </span>
          )}
          <span className="text-slate-600">•</span>
          <span className="text-slate-400">{tr(videoKinds[video.kind])}</span>
          <span className="text-slate-600">•</span>
          <span className="font-mono text-slate-400">{video.duration}</span>
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug sm:text-xl">{tr(video.title)}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{tr(video.description)}</p>
        <VideoCredit video={video} className="mt-4 border-t border-white/10 pt-3" />
      </figcaption>
    </figure>
  );
}
