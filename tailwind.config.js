/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#3b2b26',
        'bg-dark': '#171212',
        'text-primary': '#ffffff',
        'text-secondary': '#baa39c',
        'border-primary': '#54403b',
        'border-accent': '#e5e8eb',
      },
      fontFamily: {
        'primary': ['Spline Sans', 'sans-serif'],
        'secondary': ['Inter', 'sans-serif'],
      },
      screens: {
        'xs': '360px',
      },
    },
  },
  plugins: [],
}
