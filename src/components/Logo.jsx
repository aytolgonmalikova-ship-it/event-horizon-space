/** Original logo mark: a black hole with a glowing photon ring and tilted disc. */
export default function Logo({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="lg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="45%" stopColor="#000" />
          <stop offset="52%" stopColor="#ffe2a8" />
          <stop offset="66%" stopColor="#ff8a3d" stopOpacity=".75" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lg-disk" x1="0" x2="1">
          <stop offset="0%" stopColor="#ff8a3d" stopOpacity="0" />
          <stop offset="30%" stopColor="#ffd18a" />
          <stop offset="70%" stopColor="#ffb86b" />
          <stop offset="100%" stopColor="#ff8a3d" stopOpacity="0" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="23" fill="url(#lg-glow)" />
      <ellipse cx="24" cy="24" rx="22" ry="5" fill="none" stroke="url(#lg-disk)" strokeWidth="2.2" />
      <circle cx="24" cy="24" r="9.5" fill="#000" />
      <path d="M14.5 24a9.5 9.5 0 0 1 19 0" fill="none" stroke="#ffe2a8" strokeWidth="1" opacity=".7" />
    </svg>
  );
}
