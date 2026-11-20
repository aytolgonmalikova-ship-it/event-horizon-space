import { images, licences } from '../data/images';
import { useLang } from '../i18n/LanguageContext';

/**
 * Credit line rendered next to every image.
 * ESA/Webb & ESA/Hubble (CC BY 4.0): full, unaltered credit + active links.
 * NASA: NASA acknowledged as source, linked to the NASA Image Library record.
 */
export default function Credit({ imageKey, className = '' }) {
  const { t, tr } = useLang();
  const img = images[imageKey];
  if (!img) return null;
  const lic = licences[img.licence];
  return (
    <p className={`text-[0.68rem] leading-snug text-slate-400 ${className}`}>
      {t('credit')}:{' '}
      <a href={img.href} target="_blank" rel="noreferrer" className="underline decoration-white/20 underline-offset-2 hover:text-white">
        {img.credit}
      </a>
      {img.licence === 'cc-by-4.0' && <> · {img.agency}</>} ·{' '}
      <a href={lic.href} target="_blank" rel="noreferrer" className="underline decoration-white/20 underline-offset-2 hover:text-white">
        {tr(lic.short)}
      </a>
    </p>
  );
}
