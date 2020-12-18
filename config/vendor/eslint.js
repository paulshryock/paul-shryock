/**
 * eslint configuration.
 *
 * @since unreleased
 *
 * @type {Object}
 */
module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'standard',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
  ],
  rules: {
  	indent: ['error', 'tab']
  },
  fix: true,
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
}