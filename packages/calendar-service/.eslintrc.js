module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./package/*/tsconfig.json']
  },
  plugins: ['prettier', '@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/eslint-recommended', 'prettier/@typescript-eslint', 'prettier'],
  rules: {
    semi: ['error', 'never']
  }
}
