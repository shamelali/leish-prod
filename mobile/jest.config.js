module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|expo-*|@expo|react-native-*|@react-native-async-storage)/',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',

    '^@expo/vector-icons(.*)$': '<rootDir>/__mocks__/expo-vector-icons.js',
    '^expo-router$': '<rootDir>/__mocks__/expo-router.js',
    '^expo-modules-core$': '<rootDir>/__mocks__/expo-modules-core.js',
    '^expo-font$': '<rootDir>/__mocks__/expo-font.js',
    '^expo-constants$': '<rootDir>/__mocks__/expo-constants.js',
    '^@react-native-async-storage/async-storage$': '<rootDir>/__mocks__/async-storage.js',
    '\\.(png|jpg|jpeg|gif|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'node',
};
