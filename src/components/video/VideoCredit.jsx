import { licences } from '../../data/images';
import { useLang } from '../../i18n/LanguageContext';

const link = 'underline decoration-white/20 underline-offset-2 hover:text-white';

/**
 * Credit line shown directly under every video (never hidden or separated from it):
 * full, unaltered credit + source archive + licence, all as active links.
 */
export default function VideoCredit({ video, className = '' }) {
  const { t, tr } = useLang();
  const lic = licences[video.licence];
  return (
    <p className={`text-[0.68rem] leading-snug text-slate-400 ${className}`}>
      <span aria-hidden="true">🎬 </span>
      {t('videoCredit')}:{' '}
      <a href={video.href} target="_blank" rel="noreferrer" className={link}>
        {video.credit}
      </a>{' '}
      · {t('videoSource')}:{' '}
      <a href={video.href} target="_blank" rel="noreferrer" className={link}>
        {video.agency} ↗
      </a>
      {lic && (
        <>
          {' '}
          ·{' '}
          <a href={lic.href} target="_blank" rel="noreferrer" className={link}>
            {tr(lic.short)}
          </a>
        </>
      )}
    </p>
  );
}
