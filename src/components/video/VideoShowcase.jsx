import { Link } from 'react-router-dom';
import { useLang } from '../../i18n/LanguageContext';
import { videosByCategory } from '../../data/videosData';
import Reveal from '../Reveal';
import SectionHeading from '../SectionHeading';
import VideoCard from './VideoCard';

/** Themed video block embedded inside a section page (Solar System, Stars, …). */
export default function VideoShowcase({ category, limit = 3 }) {
  const { t } = useLang();
  const list = videosByCategory(category).slice(0, limit);
  if (!list.length) return null;
  const headingId = `videos-${category}-title`;
  const cols = list.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2';

  return (
    <section className="container-x py-16" aria-labelledby={headingId}>
      <SectionHeading id={headingId} eyebrow={`🎬 ${t('videoSectionEyebrow')}`} title={t('videoSectionTitle')} lead={t('videoSectionLead')} />
      <div className={`grid gap-6 ${cols}`}>
        {list.map((v, i) => (
          <Reveal key={v.id} delay={i * 90} className="h-full">
            <VideoCard video={v} />
          </Reveal>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-slate-500">🎧 {t('videoEnglishNote')}</p>
        <Link to="/#cinema" className="btn-ghost">
          {t('videoAllInCinema')} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
