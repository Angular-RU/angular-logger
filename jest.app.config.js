module.exports = {
    verbose: null,
    watch: false,
    cache: false,
    preset: 'jest-preset-angular',
    testMatch: ['<rootDir>/**/*.spec.ts'],
    collectCoverageFrom: ['<rootDir>/src/app/**/*.ts'],
    setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
    coverageReporters: ['json-summary', 'cobertura', 'text', 'html', 'lcov'],
    moduleNameMapper: {
      "@angular-ru/logger": '<rootDir>/dist/logger',
      "@angular-ru/logger/(.*)": '<rootDir>/dist/logger/$1'
    }
};
