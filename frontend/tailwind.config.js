/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#090d16',
          surface: '#0f172a',
          hover: '#1e293b',
          card: 'rgba(15, 23, 42, 0.75)',
        },
        border: {
          subtle: 'rgba(51, 65, 85, 0.4)',
          active: 'rgba(100, 116, 139, 0.6)',
          emerald: 'rgba(16, 185, 129, 0.4)',
          cyan: 'rgba(6, 182, 212, 0.4)',
        },
        brand: {
          emerald: '#10b981',
          cyan: '#06b6d4',
          indigo: '#6366f1',
          amber: '#f59e0b',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.25)',
        'surface': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.08)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
