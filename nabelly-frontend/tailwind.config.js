/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        'pink-custom': '#FFB0A0',
        'orange-custom': '#FFCC96',
        'yellow-custom':'#FED87A',
        'light-yellow-custom':'#EFE7BE',
      },
    },
  },
  plugins: [],
}
