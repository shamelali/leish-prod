const path = require('path');

module.exports = {
  haste: {
    defaultPlatform: 'ios',
    platforms: ['android', 'ios', 'native'],
  },
  moduleNameMapper: {
    '^react-native($|/.*)': `${path.dirname(require.resolve('react-native'))}/$1`,
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
    '^.+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': require.resolve(
      '@react-native/jest-preset/jest/assetFileTransformer.js',
    ),
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native(-community)?|@react-navigation|expo-*|@expo|react-native-*|@react-native-async-storage)/',
  ],
  setupFiles: [require.resolve('@react-native/jest-preset/jest/setup.js')],
  testEnvironment: require.resolve('@react-native/jest-preset/jest/react-native-env.js'),
};
