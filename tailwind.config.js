/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        oliveGreen: '#606C38',
        darkOlive: '#283618',
        lightCream: '#FEFAE0',
        warmTan: '#DDA15E',
        rustyOrange: '#BC6C25',
      },
    },
  },
  plugins: [],
};