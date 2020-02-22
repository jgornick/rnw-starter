const fs = require('fs')
const { omit } = require('lodash')
const path = require('path')
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { tsPreset } = require('./test/jest-typescript-preset')
const { compilerOptions } = require('./tsconfig')

const packagesPath = path.resolve(__dirname, 'packages')

const projects = fs.readdirSync(packagesPath)
  .filter(d => !d.startsWith('.'))
  .map(d => ({ name: d, dir: path.resolve(packagesPath, d) }))
  .filter(opts => fs.existsSync(path.resolve(opts.dir, 'jest.config.js')))
  .map(opts => ({
    name: opts.name,
    dir: opts.dir,
    config: require(path.resolve(opts.dir, 'jest.config.js')),
    packageJson: require(path.resolve(opts.dir, 'package.json')),
  }))
  .map(opts => {
    const {name, config, packageJson} = opts

    config.name = packageJson.name
    config.displayName = packageJson.name

    if (!config.setupFilesAfterEnv) {
      config.setupFilesAfterEnv = [
        'jest-enzyme',
        '<rootDir>/test/jest-framework-setup-node.js'
      ];
    }

    config.roots = [
      `<rootDir>/node_modules/`,
      `<rootDir>/packages/${name}/src/`
    ]

    config.snapshotSerializers = ['enzyme-to-json/serializer']

    config.moduleNameMapper = pathsToModuleNameMapper(omit(compilerOptions.paths, '*'), { prefix: '<rootDir>/' })

    return config
  })

module.exports = {
  ...tsPreset,
  automock: false,
  bail: false,
  projects,
  testEnvironment: 'enzyme',
  testPathIgnorePatterns: [
    '\\.snap$',
    'node_modules'
  ]
}
