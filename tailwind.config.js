/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scan all your component files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',       // Green theme for plants
        secondary: '#A7F3D0',     // Light mint
        dark: '#1B4332',          // Deep green for dark mode
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  darkMode: 'class', // Enable class-based dark mode toggle
  plugins: [],
}
