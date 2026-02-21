/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        ninja:{
          primary:"#6366F1",
          secondary:"#8B5CF6",
          safe:"#10B981",
          warn:"#F59E0B",
          danger:"#EF4444",
          text:"#0F172A",
        }
      }
    },
  },
  plugins: [],
}