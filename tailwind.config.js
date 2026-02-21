/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Yeh line sab se important hai!
  ],
  theme: {
    extend: {
      colors: {
        'ingredi-bg': '#0F172A',
        'ingredi-green': '#4ADE80',
        'ingredi-emerald': '#059669',
      },
    },
  },
  plugins: [],
}