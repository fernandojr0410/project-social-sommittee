/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          primary: '#D9D9D9',
          secundary: '#1f2937'
        }
      }
    },
  },
  plugins: [],
}

