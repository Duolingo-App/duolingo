/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',   // Target files in the app directory
    './components/**/*.{js,ts,jsx,tsx}', // Target files in the components directory
    './context/**/*.{js,ts,jsx,tsx}',   // Target files in the context directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
