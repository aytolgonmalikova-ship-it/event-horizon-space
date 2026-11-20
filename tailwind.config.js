/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Unbounded', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      colors: {
        void: '#03040a',
        abyss: '#070a18',
        nebula: '#7c3aed',
        plasma: '#ff7a3d',
        corona: '#ffd18a',
        ion: '#38bdf8',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(124, 58, 237, 0.55)',
        'glow-amber': '0 0 50px -10px rgba(255, 140, 60, 0.6)',
        'glow-ion': '0 0 40px -8px rgba(56, 189, 248, 0.55)',
      },
      keyframes: {
        twinkle: { '0%,100%': { opacity: 0.25 }, '50%': { opacity: 1 } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        'pulse-glow': {
          '0%,100%': { opacity: 0.6, filter: 'blur(18px)' },
          '50%': { opacity: 1, filter: 'blur(26px)' },
        },
        'fade-up': {
          from: { opacity: 0, transform: 'translateY(24px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: { '100%': { transform: 'translateX(100%)' } },
        drift: {
          '0%,100%': { transform: 'scale(1.08) translate3d(0,0,0)' },
          '50%': { transform: 'scale(1.14) translate3d(-1.5%,-1%,0)' },
        },
        halo: {
          '0%': { transform: 'scale(1)', opacity: 0.55 },
          '100%': { transform: 'scale(1.65)', opacity: 0 },
        },
        eq: { '0%,100%': { transform: 'scaleY(0.3)' }, '50%': { transform: 'scaleY(1)' } },
      },
      animation: {
        twinkle: 'twinkle 4s ease-in-out infinite',
        float: 'float 8s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
        'spin-disk': 'spin-slow 12s linear infinite',
        'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.9s cubic-bezier(.2,.7,.2,1) both',
        shimmer: 'shimmer 1.6s infinite',
        drift: 'drift 40s ease-in-out infinite',
        halo: 'halo 2.4s cubic-bezier(.2,.7,.2,1) infinite',
        eq: 'eq 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
