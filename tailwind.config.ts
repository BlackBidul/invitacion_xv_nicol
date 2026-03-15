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
        rapunzel: {
          gold: '#E7D36F',
          cream: '#F5F0E8',
          lilac: '#E8D9F5',
          lavender: '#9B59B6',
          purple: '#7D3C98',
          'purple-dark': '#5B2C6F',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        script: ['Great Vibes', 'cursive'],
        sans: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'lantern-rise': 'lanternRise 15s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'envelope-open': 'envelopeOpen 1s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        lanternRise: {
          '0%': { transform: 'translateY(100vh) scale(0.5)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateY(-100vh) scale(1)', opacity: '0' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(231, 211, 111, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(231, 211, 111, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        envelopeOpen: {
          '0%': { transform: 'rotateX(0deg)' },
          '100%': { transform: 'rotateX(180deg)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
