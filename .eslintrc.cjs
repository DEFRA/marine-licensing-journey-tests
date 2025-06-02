module.exports = {
  env: {
    es2022: true,
    node: true,
    jest: true
  },
  globals: {
    before: true,
    after: true
  },
  extends: [
    'standard',
    'prettier',
    'eslint:recommended',
    'plugin:wdio/recommended'
  ],
  overrides: [
    {
      files: ['test-infrastructure/**/*.js', 'test/steps/**/*.js'],
      rules: {
        'no-throw-literal': 'error',
        'no-restricted-syntax': [
          'error',
          {
            selector: 'ThrowStatement',
            message:
              'Do not use throw in test-infrastructure or step definitions. Use assertion libraries instead.'
          }
        ],
        'promise/catch-or-return': 'error',
        'require-await': 'error'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['prettier', 'wdio', 'promise'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'error',
    'no-unused-expressions': 'error',
    'no-unused-vars': ['error', { args: 'none', ignoreRestSiblings: true }]
  }
}
