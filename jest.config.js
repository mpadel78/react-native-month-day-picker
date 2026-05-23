module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/lib/', '/example/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts', '!src/index.ts'],
  moduleNameMapper: {
    '^react-native$': '<rootDir>/__mocks__/react-native.js',
    '^react-native-month-day-picker$': '<rootDir>/src/index',
    '^@quidone/react-native-wheel-picker$':
      '<rootDir>/__mocks__/wheel-picker.js',
  },
  // Only run utility and hook tests for now
  testMatch: [
    '**/__tests__/dateUtils.test.ts',
    '**/__tests__/localeUtils.test.ts',
    '**/__tests__/useBirthdayPicker.test.ts',
  ],
};
