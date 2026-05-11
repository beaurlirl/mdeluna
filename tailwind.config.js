/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper:     '#F4F0E6',
        vellum:    '#FBF8F0',
        'paper-2': '#ECE6D7',
        'paper-3': '#E2DBC8',
        ink:       '#14110F',
        'ink-2':   '#3C3833',
        'ink-3':   '#6A655C',
        'ink-4':   '#9A9388',
        red:       '#C8102E',
        'red-deep':'#8A0E20',
        'red-bright':'#E51938',
        'red-wash':'#F2D8DC',
        approved:  '#2F6B3A',
        pending:   '#B07A1A',
      },
      fontFamily: {
        sans:    ['Geist', 'system-ui', 'sans-serif'],
        serif:   ['Instrument Serif', 'Georgia', 'serif'],
        display: ['Instrument Serif', 'Georgia', 'serif'],
        mono:    ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem',   { lineHeight: '0.95' }],
        '9xl': ['8rem',   { lineHeight: '0.9' }],
      },
      letterSpacing: {
        'mono-sm': '0.14em',
        'mono':    '0.16em',
        'mono-lg': '0.18em',
      },
      borderRadius: {
        none: '0px',
        sm:   '2px',
        DEFAULT: '4px',
        full: '9999px',
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.2, 0.6, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
}
