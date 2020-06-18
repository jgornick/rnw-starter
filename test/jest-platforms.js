const path = require('path')

const { withEnzyme } = require('jest-expo-enzyme')
const { omit } = require('lodash')
const { pathsToModuleNameMapper } = require('ts-jest/utils')

const { compilerOptions } = require('../tsconfig')

module.exports = {
  projects: ['ios', 'android', 'web'].map((platform) => {
    const platformPreset = withEnzyme(require(`jest-expo/${platform}/jest-preset`))

    return {
      ...platformPreset,

      // Remove any references to .mjs file extensions since it's not fully supported
      // by jest or babel.
      moduleFileExtensions: platformPreset.moduleFileExtensions.filter((ext) => !ext.includes('mjs')),

      setupFilesAfterEnv: [
        ...platformPreset.setupFilesAfterEnv || [],
        '<rootDir>/test/jest-framework-setup',
      ],

      moduleNameMapper: {
        ...platformPreset.moduleNameMapper || {},
        ...pathsToModuleNameMapper(omit(compilerOptions.paths, '*'), { prefix: '<rootDir>/' }),
      },
    }
  })
}
