module.exports = {
  verbose: null,
  watch: false,
  cache: false,
  preset: 'jest-preset-angular',
  testMatch: ['<rootDir>/projects/logger/src/lib/**/*.spec.ts'],
  collectCoverageFrom: ['<rootDir>/projects/logger/src/lib/**/*.ts'],
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  coverageReporters: ['json-summary', 'cobertura', 'text', 'html', 'lcov'],
  coveragePathIgnorePatterns: ['/node_modules/']
};
