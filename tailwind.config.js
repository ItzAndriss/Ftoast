/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./docs/public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'sans-serif'] },
      colors: {
        blurple: { 500: '#6366f1', 600: '#4f46e5' },
        dark: { 900: '#0f1012', 800: '#18181b', 700: '#27272a' }
      }
    }
  },
  plugins: [],
}
