// @ts-nocheck
/* eslint-disable @typescript-eslint/no-var-requires */

const { pathsToModuleNameMapper } = require('ts-jest');

const { compilerOptions } = require('./tsconfig');
const jestConfig = require('./jest.config');

const paths = compilerOptions.paths;

module.exports = {
  ...jestConfig,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  setupFiles: ['./e2e/utils/env.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  rootDir: '.',
  roots: ['<rootDir>/src', '<rootDir>/e2e'],
  coverageDirectory: './coverage/e2e',
  testRegex: '/e2e/.*\\.(e2e-test|e2e-spec).(ts|tsx|js)$',
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  modulePaths: ['./src'],
  moduleNameMapper: pathsToModuleNameMapper(paths, {
    prefix: '<rootDir>/src',
  }),
  coveragePathIgnorePatterns: [
    'app-setup.ts',
    'main.ts',
    'typeorm-config.data-source.ts',
    'typeorm/entities',
    'typeorm/migrations',
    '.d.ts',
    '.module.ts',
    '.interface.',
    '.dto.',
    '/node_modules/',
    '/dist/',
    '.spec.ts$',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
