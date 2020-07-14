module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'quotes': 0,
    'indent': 0,
    'space-before-function-paren': 0,
    'prefer-promise-reject-errors': 0,
    'semi': 0,
    "no-unused-vars": 'off',
    'no-unreachable': 'off',
    'block-spacing': '0',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
