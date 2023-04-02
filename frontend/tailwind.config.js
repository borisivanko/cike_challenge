/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6ac2c2',
          DEFAULT: '#419f9f',
          dark: '#1d4046'
        }
      }
    },
  },
  plugins: [],
}