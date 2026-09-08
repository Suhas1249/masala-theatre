/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ember: {
          900: '#3A0808',
          800: '#5C0D0D',
          700: '#8B0000',
          600: '#C41E3A',
          500: '#E63946',
          400: '#FF4D4D',
          300: '#FF7B00',
          200: '#FFA500',
          100: '#FFD700',
        },
        gold: {
          light: '#FFF099',
          DEFAULT: '#D4AF37',
          dark: '#AA820A',
          metallic: '#C5A059'
        },
        obsidian: {
          900: '#070708',
          800: '#0B0B0E',
          700: '#121217',
          600: '#1A1A22',
          500: '#252530',
        },
        cream: {
          DEFAULT: '#FDFBF7',
          dark: '#F3ECE0'
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Cinzel Decorative', 'Georgia', 'serif'],
        display: ['Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
        modak: ['Cinzel', 'serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 25s linear infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'flame-flicker': 'flameFlicker 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(2deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.04)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        flameFlicker: {
          '0%': { transform: 'scaleY(1) scaleX(1) rotate(-1deg)', opacity: '0.95' },
          '100%': { transform: 'scaleY(1.08) scaleX(0.96) rotate(1deg)', opacity: '1' }
        }
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFF099 0%, #D4AF37 50%, #AA820A 100%)',
        'ember-gradient': 'linear-gradient(180deg, #0B0B0E 0%, #3A0808 50%, #8B0000 100%)',
        'curtain-pattern': 'radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.15), transparent 70%)',
      }
    },
  },
  plugins: [],
}
