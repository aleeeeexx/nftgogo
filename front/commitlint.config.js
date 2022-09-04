module.exports = {
  extends: ['@commitlint/config-conventional'],
  // https://commitlint.js.org/#/reference-rules
  rules: {
    'scope-empty': [2, 'never'],
    'body-max-line-length': [0, 'always', Infinity]
  }
}
