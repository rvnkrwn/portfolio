/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.{js,vue,ts}",
    "./**/*.{js,vue,ts}",
    "./**/**/*.{js,vue,ts}",
    "./**/**/**/*.{js,vue,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
}

