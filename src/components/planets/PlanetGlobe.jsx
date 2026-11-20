import { images } from '../../data/images';

/**
 * Shows a planet photo as a clean round globe, compensating for the black margin
 * in each source frame (`globe` zoom factor). Ringed Saturn is shown uncropped.
 */
export default function PlanetGlobe({ imageKey, alt = '', className = '', glow, imgClassName = '', ringWidth = '130%' }) {
  const img = images[imageKey];
  if (!img) return null;
  if (img.globe === 'contain') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <img
          src={img.src}
          alt={alt}
          loading="lazy"
          className={`max-w-none object-contain ${imgClassName}`}
          style={{
            width: ringWidth,
            WebkitMaskImage: 'radial-gradient(closest-side, #000 82%, transparent 100%)',
            maskImage: 'radial-gradient(closest-side, #000 82%, transparent 100%)',
          }}
        />
      </div>
    );
  }
  return (
    <div
      className={`overflow-hidden rounded-full bg-black ${className}`}
      style={glow ? { boxShadow: `0 0 50px -10px ${glow}` } : undefined}
    >
      <img
        src={img.src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${imgClassName}`}
        style={{ transform: `scale(${img.globe || 1})` }}
      />
    </div>
  );
}
