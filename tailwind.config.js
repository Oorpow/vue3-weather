/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'weather-primary': '#00668A',
        'weather-secondary': '#004E71',
        'gaode-primary': '#3d93fd',
        // 路线规划的搜索框
        'line-search-input-primary': '#3587eb',
        'placeholder-color': '#e1f1ff'
      },
      container: {
        padding: '2rem',
        center: true
      },
      screens: {
        sm: '640px',
        md: '768px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

