const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const { heroui } = require('@heroui/react');

const primaryLight = {
  50: '#ECFDF5',
  100: '#D1FAE5',
  200: '#A7F3D0',
  300: '#6EE7B7',
  400: '#34D399',
  500: '#10B981',
  600: '#059669',
  700: '#047857',
  800: '#065F46',
  900: '#064E3B',
  DEFAULT: '#10B981',
  foreground: '#fff',
};

const primaryDark = {
  50: '#ECFDF5',
  100: '#D1FAE5',
  200: '#A7F3D0',
  300: '#6EE7B7',
  400: '#34D399',
  500: '#10B981',
  600: '#059669',
  700: '#047857',
  800: '#065F46',
  900: '#064E3B',
  DEFAULT: '#10B981',
  foreground: '#000',
};

const secondaryLight = {
  50: '#ffffff',
  100: '#efefef',
  200: '#dcdcdc',
  300: '#bdbdbd',
  400: '#989898',
  500: '#7c7c7c',
  600: '#656565',
  700: '#525252',
  800: '#464646',
  900: '#3d3d3d',
  950: '#292929',
  DEFAULT: '#000000',
  foreground: '#ffffff',
};
const secondaryDark = {
  50: '#f6f6f6',
  100: '#e7e7e7',
  200: '#d1d1d1',
  300: '#b0b0b0',
  400: '#888888',
  500: '#6d6d6d',
  600: '#5d5d5d',
  700: '#4f4f4f',
  800: '#454545',
  900: '#3d3d3d',
  950: '#000000',
  DEFAULT: '#ffffff',
  foreground: '#000000',
};
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    '../../node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    join(__dirname, '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
    '../../libs/*/src/**/!(*.stories|*.spec).{ts,tsx,html}',
  ],
  theme: {
    extend: {
      fontFamily: {
        yekan: ['var(--font-yekan-bakh)'],
      },
    },
  },

  plugins: [
    heroui({
      addCommonColors: false,
      themes: {
        light: {
          colors: {
            background: '#ffffff',
            foreground: '#121212',
            primary: primaryLight,
            secondary: secondaryLight,
          },
        },
        dark: {
          colors: {
            background: '#000',
            foreground: '#fafafa',
            primary: primaryDark,
            secondary: secondaryDark,
          },
        },
      },
    }),
  ],
};
