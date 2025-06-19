/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#071A45',
        accent: '#1C6AA8',
        aqua: '#1FB99B',
        sand: '#D2BFA3',
        rose: '#C8636F',
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
      },
      animation: {
        sail: 'sail 40s linear infinite',
        bob: 'bob 3s ease-in-out infinite',
        wave: 'wave 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
