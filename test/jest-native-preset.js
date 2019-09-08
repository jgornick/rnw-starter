const path = require('path')
const tsPreset = require('./jest-typescript-preset')

module.exports = {
  ...tsPreset,
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/test/jest-framework-setup-native'],
  setupFiles: ['react-native/jest/setup.js'],
  transform: {
    '^[./a-zA-Z0-9$_-]+\\.(bmp|gif|jpg|jpeg|mp4|png|psd|svg|webp)$': 'react-native/jest/assetFileTransformer.js',
    '^.+\\.tsx?$': path.resolve(__dirname, 'jest-babel-transformer.js'),
    ...tsPreset.transform
  },
  transformIgnorePatterns: [
    "node_modules/(?!react-native|@jgornick)",
  ],
}
