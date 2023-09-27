/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  extends: ['next/core-web-vitals', 'banana/react'],
  parserOptions: { project: true },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
  },
};
