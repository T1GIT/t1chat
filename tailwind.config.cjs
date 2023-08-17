/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        primary: '#d0c9ff',
        secondary: '#b1ea9c',
      },
      screens: {
        mobile: '480px',
      },
    },
  },
  plugins: [],
}
