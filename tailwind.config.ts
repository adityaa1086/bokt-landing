import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#F4F0E8',   // warm cream
          surface: '#FFFFFF',   // white cards
          elevated: '#F9F7F3',  // hover state
        },
        accent: {
          DEFAULT: '#0D5C3A',   // dark forest green — readable on cream
          dim: '#1A8F5C',       // medium green
          muted: '#D1FAE5',     // light green tint
        },
        bdr: {
          DEFAULT: '#DED8CC',   // warm beige border
          bright: '#B8B0A0',    // slightly darker
        },
        ink: {
          DEFAULT: '#0D1F18',   // very dark text
          muted: '#5A7A6A',     // medium text
          subtle: '#8AADA0',    // faint text
        },
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'dash': {
          '0%': { strokeDashoffset: '30' },
          '100%': { strokeDashoffset: '0' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2.5s ease-out infinite',
        'float': 'float 5s ease-in-out infinite',
        'dash': 'dash 1.5s linear infinite',
        'slide-up': 'slide-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
}

export default config
