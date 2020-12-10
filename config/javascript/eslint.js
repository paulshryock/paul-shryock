module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended'
  ],
  fix: true,
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  }
}
