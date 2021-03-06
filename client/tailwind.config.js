const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
    'public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: '#ECC94B',
        secondary: '#1A202C',
      },
    },
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
  },
  plugins: [],
};
