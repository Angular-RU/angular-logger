const { createTsJestConfig } = require('@angular-ru/jest-utils');
const path = require('path');

module.exports = createTsJestConfig({
    maxWorkers: 2,
    maxConcurrency: 2,
    displayName: 'Logger',
    rootDir: path.resolve('.'),
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    collectCoverageFrom: ['<rootDir>/lib/**/*.ts'],
    testMatch: ['<rootDir>/integration/tests/**/*.spec.ts'],
    tsConfigSpecPath: '<rootDir>/integration/tests/tsconfig.spec.json',
    setupFilesAfterEnv: ['<rootDir>/integration/tests/setupJest.ts'],
    tsConfigRootPath: path.resolve('./tsconfig.json')
});
