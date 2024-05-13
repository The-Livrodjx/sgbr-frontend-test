/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {},
    colors: {
      'custom-blue': '#0055DC',
      'second-custom-blue': '#000F37'
    }
  },
  plugins: [],
}

