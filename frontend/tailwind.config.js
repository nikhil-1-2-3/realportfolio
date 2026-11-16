/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // User's New 5 Exact Palette Swatches:
        // #73EEDC - Mint / Aqua Cyan (Bright Neon)
        // #776885 - Dusty Violet / Lavender
        // #73C2BE - Soft Seafoam Teal
        // #5F1A37 - Deep Velvet Wine / Burgundy
        // #90C3C8 - Muted Ice Cyan / Powder Blue
        mint: {
          DEFAULT: '#73EEDC',
          50: '#effcf9',
          100: '#cbf8ef',
          200: '#9cf3e2',
          300: '#73EEDC',
          400: '#3cd9c2',
          500: '#1dbfa8',
          600: '#149988',
          700: '#147a6e',
          800: '#146159',
          900: '#14504a',
        },
        lavender: {
          DEFAULT: '#776885',
          50: '#f7f6f8',
          100: '#edebee',
          200: '#ddd9e0',
          300: '#c3bcc9',
          400: '#a49aae',
          500: '#776885',
          600: '#6f5a77',
          700: '#5c4962',
          800: '#4d3e51',
          900: '#423745',
        },
        teal: {
          DEFAULT: '#73C2BE',
          50: '#f0f9f8',
          100: '#d7efee',
          200: '#b2dfdd',
          300: '#73C2BE',
          400: '#53aba7',
          500: '#3a8f8c',
          600: '#2b7270',
          700: '#265c5b',
          800: '#224b4a',
          900: '#203f3e',
        },
        wine: {
          DEFAULT: '#5F1A37',
          50: '#fdf3f6',
          100: '#fce5ed',
          200: '#facddf',
          300: '#f5a4c6',
          400: '#ed6ea3',
          500: '#e04283',
          600: '#c72567',
          700: '#a81a52',
          800: '#8c1945',
          900: '#5F1A37',
          950: '#3a0c20',
        },
        ice: {
          DEFAULT: '#90C3C8',
          50: '#f3f9f9',
          100: '#e1f0f2',
          200: '#c5e2e5',
          300: '#90C3C8',
          400: '#6faeb5',
          500: '#52929a',
          600: '#44767e',
          700: '#3c6168',
          800: '#365156',
          900: '#304449',
        },
        // Deep Velvet Obsidian Surfaces with subtle Wine undertones:
        canvas: {
          base: '#0A050B',
          surface: '#130A15',
          elevated: '#1B0E1E',
          hover: '#26142A',
          border: 'rgba(119, 104, 133, 0.25)',
          borderMint: 'rgba(115, 238, 220, 0.40)',
          borderWine: 'rgba(95, 26, 55, 0.50)',
        },
      },
      fontFamily: {
        display: ['"Syne"', '"Outfit"', 'sans-serif'],
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Grotesk"', '"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-mint': '0 0 30px -4px rgba(115, 238, 220, 0.35)',
        'glow-wine': '0 0 35px -5px rgba(95, 26, 55, 0.60)',
        'glow-teal': '0 0 30px -4px rgba(115, 194, 190, 0.35)',
        'glow-ice': '0 0 30px -4px rgba(144, 195, 200, 0.35)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 20px -5px rgba(95, 26, 55, 0.25)',
        'card-hover': '0 20px 45px -10px rgba(0, 0, 0, 0.9), 0 0 30px -5px rgba(115, 238, 220, 0.25)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
