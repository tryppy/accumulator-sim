/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'chart-green': '#10B981',
        'chart-red': '#F87171',
        'chart-yellow': '#FBBF24',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  variants: {
    scrollbar: ['dark']
  }
};