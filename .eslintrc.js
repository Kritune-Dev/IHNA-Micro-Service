const path = require('path');

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./package/*/tsconfig.json'],
  },
  plugins: ['prettier', '@typescript-eslint', 'jest'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:jest/all',
    'prettier/@typescript-eslint',
    'prettier',
  ],
};
