/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fdfbf7',
          100: '#f7f4ed',
          200: '#eee8da',
          300: '#e3d8c2',
          400: '#d5c3a3',
          500: '#c5ab85',
        },
        ink: {
          900: '#1c1917',
          800: '#292524',
          700: '#44403c',
          600: '#57534e',
          500: '#78716c',
          400: '#a8a29e',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
        },
        terracotta: {
          500: '#ea580c',
          600: '#c2410c',
          700: '#9a3412',
        },
        lapis: {
          500: '#0284c7',
          600: '#0369a1',
          700: '#075985',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['Cinzel', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'sand-sm': '0 2px 4px 0 rgba(78, 60, 35, 0.04)',
        'sand': '0 6px 16px -2px rgba(78, 60, 35, 0.06), 0 2px 6px -1px rgba(78, 60, 35, 0.03)',
        'sand-lg': '0 12px 32px -4px rgba(78, 60, 35, 0.09), 0 4px 12px -2px rgba(78, 60, 35, 0.04)',
        'sand-xl': '0 20px 48px -8px rgba(78, 60, 35, 0.12), 0 8px 20px -4px rgba(78, 60, 35, 0.06)',
        'glow-gold': '0 0 30px -5px rgba(217, 119, 6, 0.25)',
      },
    },
  },
  plugins: [],
}
