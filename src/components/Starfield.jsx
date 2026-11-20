import { useEffect, useRef } from 'react';

/**
 * Full-screen canvas starfield with three parallax depth layers,
 * twinkling and an occasional shooting star. Respects reduced motion.
 */
export default function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars = [];
    let raf = 0;
    let scrollY = window.scrollY;
    let mouseX = 0;
    let mouseY = 0;
    let shooting = null;

    const palette = ['#ffffff', '#dbe6ff', '#cad7ff', '#fff4ea', '#ffd2a1', '#aabfff'];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(520, (w * h) / 3200));
      stars = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: depth > 0.92 ? 1.1 + Math.random() * 0.9 : 0.25 + Math.random() * 0.8,
          depth,
          color: palette[(Math.random() * palette.length) | 0],
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.6,
        };
      });
    }

    function draw(t) {
      ctx.clearRect(0, 0, w, h);
      const time = t / 1000;
      for (const s of stars) {
        const par = 0.02 + s.depth * 0.12;
        let y = (s.y - scrollY * par) % h;
        if (y < 0) y += h;
        const x = s.x + mouseX * s.depth * 12;
        const tw = reduce ? 0.85 : 0.55 + 0.45 * Math.sin(time * s.speed + s.phase);
        ctx.globalAlpha = tw * (0.35 + s.depth * 0.65);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(x, y + mouseY * s.depth * 8, s.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.r > 1.3) {
          ctx.globalAlpha = tw * 0.18;
          ctx.beginPath();
          ctx.arc(x, y + mouseY * s.depth * 8, s.r * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!reduce) {
        if (!shooting && Math.random() < 0.0025) {
          shooting = {
            x: Math.random() * w * 0.8,
            y: Math.random() * h * 0.4,
            vx: 7 + Math.random() * 5,
            vy: 3 + Math.random() * 2,
            life: 1,
          };
        }
        if (shooting) {
          const s = shooting;
          const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 14, s.y - s.vy * 14);
          grad.addColorStop(0, 'rgba(255,255,255,0.9)');
          grad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.globalAlpha = s.life;
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(s.x - s.vx * 14, s.y - s.vy * 14);
          ctx.stroke();
          s.x += s.vx;
          s.y += s.vy;
          s.life -= 0.012;
          if (s.life <= 0 || s.x > w + 100 || s.y > h + 100) shooting = null;
        }
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }

    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const onMouse = (e) => {
      mouseX = (e.clientX / w - 0.5) * 2;
      mouseY = (e.clientY / h - 0.5) * 2;
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(draw);
    };

    resize();
    raf = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', onScroll, { passive: true });
    if (!reduce) window.addEventListener('mousemove', onMouse, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10" />;
}
