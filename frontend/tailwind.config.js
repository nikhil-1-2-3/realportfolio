/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // User's Exact 4 Aesthetic Palette Colors:
        // #A2574F - Cognac (Reddish Earth / Warm Terracotta)
        // #E68057 - Ochre / Amber (Warm Sunset Apricot / Radiant Orange)
        // #BF7587 - Dusty Rose / Antique Mauve Pink
        // #993A8B - Mulberry / Deep Royal Purple-Plum
        cognac: {
          DEFAULT: '#A2574F',
          50: '#fbf5f4',
          100: '#f6ebe9',
          200: '#edd8d5',
          300: '#dfbcb6',
          400: '#cc9990',
          500: '#A2574F',
          600: '#94473f',
          700: '#7c3831',
          800: '#67302a',
          900: '#562a26',
          950: '#2e1310',
        },
        ochre: {
          DEFAULT: '#E68057',
          50: '#fdf7f4',
          100: '#fbece5',
          200: '#f6d7c9',
          300: '#f0bba5',
          400: '#E68057',
          500: '#dc683b',
          600: '#ce5128',
          700: '#ab3e1e',
          800: '#89341c',
          900: '#702e1c',
        },
        rose: {
          DEFAULT: '#BF7587',
          50: '#fcf6f7',
          100: '#f9edf0',
          200: '#f3dcde',
          300: '#eac0c5',
          400: '#dc9fa7',
          500: '#BF7587',
          600: '#ab5c6f',
          700: '#8f4959',
          800: '#773f4c',
          900: '#653842',
        },
        mulberry: {
          DEFAULT: '#993A8B',
          50: '#fbf4fa',
          100: '#f7e8f5',
          200: '#f0d2ec',
          300: '#e4b0dd',
          400: '#d182c6',
          500: '#993A8B',
          600: '#a34193',
          700: '#873278',
          800: '#6f2b62',
          900: '#5c2752',
          950: '#381031',
        },

        // Backward compatibility mappings to prevent any breakages:
        wine: {
          DEFAULT: '#993A8B',
          50: '#fbf4fa',
          100: '#f7e8f5',
          200: '#f0d2ec',
          300: '#e4b0dd',
          400: '#d182c6',
          500: '#993A8B',
          600: '#873278',
          700: '#6f2b62',
          800: '#5c2752',
          900: '#381031',
          950: '#231215',
        },
        teal: {
          DEFAULT: '#E68057',
          50: '#fdf7f4',
          100: '#fbece5',
          200: '#f6d7c9',
          300: '#f0bba5',
          400: '#E68057',
          500: '#dc683b',
          600: '#ce5128',
          700: '#ab3e1e',
          800: '#89341c',
          900: '#702e1c',
        },
        lavender: {
          DEFAULT: '#BF7587',
          50: '#fcf6f7',
          100: '#f9edf0',
          200: '#f3dcde',
          300: '#eac0c5',
          400: '#dc9fa7',
          500: '#BF7587',
          600: '#ab5c6f',
          700: '#8f4959',
          800: '#773f4c',
          900: '#653842',
        },
        mint: {
          DEFAULT: '#A2574F',
          50: '#fbf5f4',
          100: '#f6ebe9',
          200: '#edd8d5',
          300: '#dfbcb6',
          400: '#cc9990',
          500: '#A2574F',
          600: '#94473f',
          700: '#7c3831',
          800: '#67302a',
          900: '#562a26',
        },
        ice: {
          DEFAULT: '#BF7587',
          50: '#fcf6f7',
          100: '#f9edf0',
          200: '#f3dcde',
          300: '#eac0c5',
          400: '#dc9fa7',
          500: '#BF7587',
          600: '#ab5c6f',
          700: '#8f4959',
          800: '#773f4c',
          900: '#653842',
        },

        // Old & Aesthetic Light Surfaces:
        canvas: {
          base: '#FAF6F0',       // Warm Antique French Linen / Sandstone
          surface: '#FFFFFF',    // Crisp Porcelain Card
          elevated: '#F5ECE3',   // Warm Linen Card
          hover: '#EFE3D7',      // Soft Bisque Hover
          border: 'rgba(191, 117, 135, 0.22)', // Soft Rose hairline
          borderCognac: 'rgba(162, 87, 79, 0.22)', // Cognac hairline
          borderMulberry: 'rgba(153, 58, 139, 0.20)', // Mulberry hairline
          borderOchre: 'rgba(230, 128, 87, 0.24)', // Warm Ochre hairline
        },
      },
      fontFamily: {
        display: ['"Syne"', '"Outfit"', 'sans-serif'],
        sans: ['"Outfit"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"Space Grotesk"', '"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        // Soft, elegant editorial shadows (warm and antique, NO NEON):
        'aesthetic-sm': '0 2px 8px -1px rgba(162, 87, 79, 0.08), 0 1px 3px rgba(35, 17, 21, 0.04)',
        'aesthetic-md': '0 8px 24px -4px rgba(162, 87, 79, 0.10), 0 3px 10px -2px rgba(153, 58, 139, 0.06)',
        'aesthetic-lg': '0 16px 36px -6px rgba(162, 87, 79, 0.12), 0 6px 16px -3px rgba(230, 128, 87, 0.08)',
        'card-light': '0 4px 20px -2px rgba(162, 87, 79, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'card-hover': '0 14px 34px -4px rgba(162, 87, 79, 0.14), 0 4px 12px -2px rgba(153, 58, 139, 0.10)',
      },
    },
  },
  plugins: [],
}
