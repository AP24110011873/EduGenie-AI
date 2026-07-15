/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        app: {
          background: '#0F172A',
          primary: '#2563EB',
          secondary: '#1E293B',
          accent: '#38BDF8',
          surface: 'rgba(15, 23, 42, 0.72)',
          border: 'rgba(148, 163, 184, 0.16)',
        },
      },
      boxShadow: {
        glass: '0 24px 80px rgba(2, 6, 23, 0.45)',
        glow: '0 0 0 1px rgba(56, 189, 248, 0.18), 0 20px 60px rgba(37, 99, 235, 0.25)',
      },
      borderRadius: {
        '3xl': '1.75rem',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        shimmer: 'shimmer 2.2s linear infinite',
      },
    },
  },
  plugins: [],
}