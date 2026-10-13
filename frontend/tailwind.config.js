/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EFF5FF',
          100: '#DBE8FE',
          600: '#1F5FD1',
          700: '#1A4FB0',
          800: '#173F8A',
        },
      },
    },
  },
  plugins: [],
};
