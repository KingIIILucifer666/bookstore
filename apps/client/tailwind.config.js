const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/*.{js,ts,jsx,tsx,html}'), // Local app code
    ...createGlobPatternsForDependencies(__dirname),   // Shared libs like /libs/shared-components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
