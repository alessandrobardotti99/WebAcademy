/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        YellowWebAcademy: '#ffd06a',
        HoverYwlloWebAcademt: '#d6ae58'
      },
    },
  },
  plugins: [],
}
