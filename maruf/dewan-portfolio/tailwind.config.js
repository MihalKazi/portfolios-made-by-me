/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1a1a1a',
        paper: '#fdfcf9',
        accent: '#c84b31',
        earth: '#2d4a3e',
        sand: '#d4af7a',
        mist: 'rgba(45, 74, 62, 0.05)',
      },
      fontFamily: {
        serif: ['var(--font-crimson)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
};