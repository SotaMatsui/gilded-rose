/** @type {import('jest').Config} */
module.exports = {
  roots: ['<rootDir>/app', '<rootDir>/test/jest'],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['app/**/*.ts'],
  coverageDirectory: 'coverage/jest',
  coverageProvider: 'v8',
  transform: {
    '^.+\\.tsx?$': ['@swc/jest', {
      jsc: {
        parser: { syntax: 'typescript' },
        target: 'es2022',
      },
    }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
  },
};
