/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0D0D0D',
          soft: '#151311',
          line: '#24211D',
        },
        gold: {
          DEFAULT: '#B9965B',
          light: '#D4B477',
          deep: '#8F7340',
        },
        cream: '#F3EADF',
        ivory: '#F7F1E9',
        muted: '#A9A29A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'Times New Roman', 'serif'],
      },
      letterSpacing: {
        luxe: '0.2em',
        wideluxe: '0.3em',
      },
      maxWidth: {
        shell: '84rem',
      },
      borderRadius: {
        card: '2px',
      },
      boxShadow: {
        luxe: '0 30px 70px -35px rgba(0, 0, 0, 0.85)',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scroll-hint': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(14px)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1.1s ease both',
        'scroll-hint': 'scroll-hint 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
