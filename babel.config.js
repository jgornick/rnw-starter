const CONFIG_TYPES = [
  'native',
  'test',
]

module.exports = (api) => {
  const env = api.env()
  console.log('BABEL CONFIG ENV', env)
  const isTest = api.env('test')

  if (!CONFIG_TYPES.includes(env)) {
    throw new Error(`${env} is not implemented! Try setting babel.envName.`)
  }

  api.cache.using(() => env)

  const babelPresetEnvOptions = {
    targets: {
      esmodules: true
    }
  }

  const config = {
    retainLines: true,
    presets: [
      ['@babel/preset-env', babelPresetEnvOptions],
      '@babel/preset-typescript',
      '@babel/preset-react',
    ],
    plugins: [
      // Needed to strip react-native flow typings
      '@babel/plugin-transform-flow-strip-types',
      '@babel/proposal-class-properties',
    ],
  }

  if (env === 'native') {
    config.presets = [
      'module:metro-react-native-babel-preset'
    ]

    config.plugins = [
      '@babel/plugin-proposal-export-default-from',
      ['@babel/plugin-proposal-decorators', { legacy: true }]
    ]
  }

  return config
}
