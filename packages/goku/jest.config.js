const config = {
  testEnvironment: 'jsdom',
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
};

module.exports = config;
