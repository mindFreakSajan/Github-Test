/** @type {import('tailwindcss').Config} */
var prod = process.env.production;
module.exports = {
  purge: {
    enabled: !prod,
    content: ['./src/**/*.html', './src/**/*.ts'],
  },
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 200ms ease-in backwards',
        fadeInLoading: 'fadeIn 600ms ease-in backwards',
        fadeOut: 'fadeOut 200ms ease-out forwards',
        progress: 'progress 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
