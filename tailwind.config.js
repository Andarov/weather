/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'dark-blue': '#183254'
      },
      fontFamily: {
        ubuntu: "'Ubuntu', 'Arial, 'sans-serif'",
      },
    },
  },
  plugins: [],
}