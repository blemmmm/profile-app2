// @ts-check

const path = require('path');

const tailwind_config = {
  mode: undefined,
  purge: {
    enabled: process.argv.includes('--production') === true,
    content: [
      path.join(process.cwd(), './client/src/**/*.js'),
      path.join(process.cwd(), './client/src/**/*.jsx'),
    ],
  },
  variants: {
    extend: {
      textColor: ['disabled'],
      backgroundColor: ['disabled'],
    },
  },
  theme: {
    extend: {
      screens: {
        'sm': '250px',
      },
    },
  },
};

module.exports = tailwind_config;