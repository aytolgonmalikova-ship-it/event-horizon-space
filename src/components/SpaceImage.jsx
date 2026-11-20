import { useState } from 'react';
import { images } from '../data/images';
import Credit from './Credit';

/**
 * Image with lazy loading, shimmer placeholder, graceful error state
 * and an always-visible credit line (not separated from the image).
 */
export default function SpaceImage({
  imageKey,
  alt,
  className = '',
  imgClassName = 'h-full w-full object-cover',
  aspect = 'aspect-[4/3]',
  large = false,
  credit = true,
  priority = false,
  rounded = 'rounded-2xl',
}) {
  const img = images[imageKey];
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [useSmall, setUseSmall] = useState(false);
  if (!img) return null;
  const src = large && !useSmall ? img.large : img.src;
  const onError = () => {
    // If the high-resolution variant is unavailable, fall back to the standard size once.
    if (src !== img.src) setUseSmall(true);
    else setFailed(true);
  };

  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-abyss ${aspect} ${rounded}`}>
        {!loaded && !failed && (
          <div className="absolute inset-0 overflow-hidden bg-white/[0.03]">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          </div>
        )}
        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-violet-900/40 to-abyss p-4 text-center text-xs text-slate-400">
            {alt}
          </div>
        ) : (
          <img
            src={src}
            alt={alt || img.title}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={onError}
            className={`${imgClassName} transition duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
      </div>
      {credit && <figcaption><Credit imageKey={imageKey} className="mt-2" /></figcaption>}
    </figure>
  );
}
