export default {
  testEnvironment: 'node',
  transform: {},
  collectCoverageFrom: ['src/**/*.js', '!src/**/*.test.js'],
  testMatch: ['**/tests/**/*.test.js'],
  testTimeout: 10000,
  verbose: false
}
