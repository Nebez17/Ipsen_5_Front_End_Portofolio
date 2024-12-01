/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'xxxs': '0px',
        'xxs': '250px',
        'xs': '400px',
        'sm': '640px',
        'md': '768px',
        'mmd': '950px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1670px',
        '4xl': '1400px'
      },
    },
  },
  plugins: [],
}

