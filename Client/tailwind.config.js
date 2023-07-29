const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {},
    screens: {
      // max-width
      'max-2xl': { max: '1367px' },
      'max-xl': { max: '1280px' },
      'max-lg': { max: '1024px' },
      'max-md': { max: '768px' },
      'max-sm': { max: '640px' },

      //min-width
      sm: '641px',
      md: '769px',
      lg: '1025px',
      xl: '1281px',
      '2xl': '1537px',
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
