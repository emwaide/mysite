/** @type {import('tailwindcss').Config} */

const withOpacity = hex => ({
  DEFAULT: hex,
  50: `${hex}0D`, // ~5% opacity
  100: `${hex}1A`, // ~10%
  200: `${hex}33`, // ~20%
  300: `${hex}4D`, // ~30%
  400: `${hex}66`, // ~40%
  500: `${hex}80`, // ~50%
  600: `${hex}99`, // ~60%
  700: `${hex}B3`, // ~70%
  800: `${hex}CC`, // ~80%
  900: `${hex}E6`, // ~90%
});

module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: withOpacity('#071A45'),
        accent: withOpacity('#1C6AA8'),
        aqua: withOpacity('#1FB99B'),
        sand: withOpacity('#D2BFA3'),
        rose: withOpacity('#C8636F'),
      },
      keyframes: {
        sail: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(4px)' },
        },
        leftwalk: {
          '0%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
          '33.33%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
          '66.66%': {
            transform: 'translateY(-100vh)',
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(-100vh)',
            opacity: 1,
          },
        },
        rightwalk: {
          '0%': {
            transform: 'translateY(180)',
            opacity: 1,
          },
          '33.33%': {
            transform: 'translateY(0)',
            opacity: 1,
          },
          '66.66%': {
            transform: 'translateY(-100vh)',
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(-100vh)',
            opacity: 1,
          },
        },
      },
      animation: {
        sail: 'sail 40s linear infinite',
        bob: 'bob 3s ease-in-out infinite',
        wave: 'wave 3s ease-in-out infinite',
        leftwalk: 'leftwalk 1s linear infinite',
        rightwalk: 'rightwalk 10s linear infinite',
      },
      animationDelay: {
        0: '0ms',
        300: '300ms',
        600: '600ms',
        900: '900ms',
        1200: '1200ms',
        1500: '1500ms',
      },
    },
  },
  plugins: [],
};
