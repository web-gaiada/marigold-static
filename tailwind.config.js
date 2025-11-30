/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        marigold: '#F87C04',
        grey: '#909090',
        gray: '#909090',
        "gray-1": '#333',
        "grey-1": '#333',
        neutral: '#f2f2f2'
      },
      fontFamily: {
        sans: '"Sora", sans-serif',
        serif: "Fresh Almond",
        extra: "Griffiths"
      }
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
