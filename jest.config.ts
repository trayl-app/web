import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: '.',
});

const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: 'coverage',
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
};

export default createJestConfig(customJestConfig);
