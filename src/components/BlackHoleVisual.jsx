/**
 * Original CSS rendering of a black hole (not a photo): gravitationally lensed
 * halo, tilted accretion disc (back half behind the shadow, front half over it),
 * photon ring and shadow. Used in the home hero and on the black-holes page.
 */
function Disc({ front = false }) {
  return (
    <div
      className="absolute left-0 right-0 top-1/2 aspect-square"
      style={{
        transform: 'translateY(-50%) scaleY(0.16)',
        clipPath: front ? 'inset(50% 0 0 0)' : undefined,
      }}
    >
      <div className="bh-disk h-full w-full animate-spin-disk rounded-full" />
    </div>
  );
}

export default function BlackHoleVisual({ className = '' }) {
  return (
    <div className={`relative aspect-square ${className}`} aria-hidden="true">
      {/* outer glow */}
      <div className="absolute inset-[6%] animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(255,150,70,.42),rgba(124,58,237,.18)_55%,transparent_70%)]" />
      {/* lensed image of the disc's far side, wrapped around the shadow */}
      <div className="absolute inset-[21%]">
        <div className="bh-disk h-full w-full rounded-full opacity-90" style={{ animation: 'orbit-rev 18s linear infinite' }} />
      </div>
      {/* back half of the disc */}
      <Disc />
      {/* photon ring */}
      <div className="absolute inset-[32.5%] rounded-full shadow-[0_0_26px_5px_rgba(255,226,168,.85),inset_0_0_16px_3px_rgba(255,226,168,.55)]" />
      {/* shadow */}
      <div className="absolute inset-[34%] rounded-full bg-black shadow-[0_0_40px_10px_rgba(0,0,0,.9)]" />
      {/* front half of the disc, crossing in front of the shadow */}
      <Disc front />
    </div>
  );
}
