module.exports = {
  verbose: true,
  watch: false,
  cache: false,
  preset: 'jest-preset-angular',
  testMatch: ['<rootDir>/projects/logger/tests/**/*.spec.ts'],
  collectCoverageFrom: ['<rootDir>/projects/logger/src/lib/**/*.ts'],
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  coverageReporters: ['json', 'lcovonly', 'lcov', 'text', 'html'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsConfig: '<rootDir>/tsconfig.json',
      allowSyntheticDefaultImports: true
    }
  },
  bail: true,
  collectCoverage: true,
  modulePathIgnorePatterns: ['<rootDir>/dist/']
};
