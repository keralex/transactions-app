/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Public Sans"', 'sans-serif'],
      },
      colors: {
        primary: '#022A9A',
        primaryLight: '#E0EDFF',
        neutralHard: '#E0EDFF',
        neutralDark: '#606882',
        neutral: '#606882', // <-- esto podría estar sobrescribiendo `neutral.*` de Tailwind, mejor evitar usar este nombre
        backgroundBase: '#FAFAFA',
        success: '#1C8367',
      },
    },
  },
  plugins: [],
};
