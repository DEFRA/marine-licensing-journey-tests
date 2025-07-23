import neostandard from 'neostandard'

export default [
  ...neostandard({
    env: ['node', 'mocha'],
    ignores: [
      ...neostandard.resolveIgnoresFromGitignore(),
      'allure-results/**',
      'allure-report/**',
      'docker/**'
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

  // WebDriverIO environment
  {
    files: ['wdio*.js', 'test/**/*.js', 'test-infrastructure/**/*.js'],
    languageOptions: {
      globals: {
        browser: 'readonly',
        $: 'readonly',
        $$: 'readonly',
        expect: 'readonly',
        driver: 'readonly'
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
