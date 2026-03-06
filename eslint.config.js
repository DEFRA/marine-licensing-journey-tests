import neostandard from 'neostandard'

export default [
  ...neostandard({
    env: ['node'],
    ignores: [
      ...neostandard.resolveIgnoresFromGitignore(),
      'allure-results/**',
      'allure-report/**',
      'docker/**',
      'wdio*.js',
      'test-infrastructure/**',
      'test/steps/**'
    ],
    noJsx: true,
    noStyle: true
  }),

  // Jest test environment
  {
    files: ['**/tests/**/*.js', '**/*.test.js'],
    languageOptions: {
      globals: {
        expect: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        jest: 'readonly'
      }
    }
  },

  // MongoDB environment
  {
    files: ['docker/scripts/mongodb/**/*.js'],
    languageOptions: {
      globals: {
        db: 'writable',
        use: 'readonly',
        print: 'readonly',
        ObjectId: 'readonly'
      }
    }
  }
]
