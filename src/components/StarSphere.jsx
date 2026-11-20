/** Glowing CSS star (no photo) — used for spectral classes and stages without imagery. */
export default function StarSphere({ color = '#fff', size = 160, className = '', pulse = true, style }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size, ...style }} aria-hidden="true">
      <div
        className={`absolute -inset-1/2 rounded-full ${pulse ? 'animate-pulse-glow' : ''}`}
        style={{ background: `radial-gradient(circle, ${color}88 0%, ${color}22 40%, transparent 68%)` }}
      />
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at 38% 34%, #ffffff 0%, ${color} 38%, ${color}cc 62%, ${color}55 100%)`,
          boxShadow: `0 0 ${size / 3}px ${size / 12}px ${color}77, inset -${size / 10}px -${size / 10}px ${size / 5}px rgba(0,0,0,.25)`,
        }}
      />
    </div>
  );
}
