import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        gold: {
          DEFAULT: '#FFD700',
          50: '#FFF9C4',
          100: '#FFF59D',
          200: '#FFEE58',
          300: '#FFE042',
          400: '#FFD700',
          500: '#FFC107',
          600: '#FFB300',
          700: '#FFA000',
          800: '#FF8F00',
          900: '#D4AF37',
        },
        silver: {
          DEFAULT: '#C0C0C0',
          50: '#FFFFFF',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#C0C0C0',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#A9A9A9',
        },
      },
      animation: {
        slideIn: 'slideIn 1s ease-in-out',
        fadeIn: 'fadeIn 0.5s ease-in forwards',
        slideUp: 'slideUp 1s ease-in 0.5s forwards',
        bounceIn: 'bounceIn 1s ease-out forwards',
        slideLeft: 'slideLeft 15s linear infinite',
      },
      keyframes: {
        slideIn: {
          from: { transform: 'translateX(-20px)', opacity: '0' },
          to: { transform: 'translateX(0)', opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(20px)', opacity: '0' },
          to: { transform: 'translateY(0)', opacity: '1' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)', opacity: '0.8' },
          '70%': { transform: 'scale(0.9)', opacity: '0.9' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideLeft: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;