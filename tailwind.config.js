/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper:     '#FFFFFF',
        vellum:    '#F7F7F7',
        'paper-2': '#F5F5F5',
        'paper-3': '#E8E8E8',
        ink:       '#111111',
        'ink-2':   '#3A3A3A',
        'ink-3':   '#666666',
        'ink-4':   '#9E9E9E',
        red:       '#C8102E',
        'red-deep':'#8A0E20',
        'red-bright':'#E51938',
        'red-wash':'#F2D8DC',
        approved:  '#2F6B3A',
        pending:   '#B07A1A',
        accent:    '#2B3A2E',
        'accent-light': '#E8EDE9',
        stone:     '#C8C0B0',
      },
      fontFamily: {
        sans: ['Aileron', 'system-ui', 'sans-serif'],
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
