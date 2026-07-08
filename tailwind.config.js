/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ink — dark navy system for dark sections & primary text
        ink: {
          950: '#060B14',
          900: '#0A1424',
          800: '#0F1D33',
          700: '#16294A',
          600: '#1E3A66',
        },
        // Brand blue — confident, primary action
        brand: {
          50: '#EEF3FF',
          100: '#DBE6FF',
          200: '#B7CCFF',
          400: '#5C82FF',
          500: '#2E5CFF',
          600: '#1F45E6',
          700: '#183AC0',
        },
        // Teal — accent, used with restraint
        teal: {
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
        },
        // Paper — off-white surfaces
        paper: {
          DEFAULT: '#FFFFFF',
          50: '#FAFBFC',
          100: '#F5F7FA',
          200: '#EDF0F5',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Inter Tight"', 'Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // fluid display sizes
        'display-xl': ['clamp(2.9rem, 6.2vw, 5.25rem)', { lineHeight: '0.98', letterSpacing: '-0.035em' }],
        'display-lg': ['clamp(2.25rem, 4.4vw, 3.75rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.75rem)', { lineHeight: '1.06', letterSpacing: '-0.025em' }],
      },
      letterSpacing: {
        label: '0.14em',
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(10, 20, 36, 0.04), 0 8px 28px -12px rgba(10, 20, 36, 0.14)',
        'card-hover': '0 2px 4px rgba(10, 20, 36, 0.05), 0 24px 48px -18px rgba(10, 20, 36, 0.24)',
        float: '0 12px 40px -12px rgba(10, 20, 36, 0.28)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
