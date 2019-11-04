const { find, set, get, isString, some } = require('lodash')
const path = require('path')
const resovePkg = require('resolve-pkg')
const webpack = require('webpack')

function findRuleByLoader(config, loaderName) {
  return find(config.module.rules, r => {
    return some(
      r.use,
      u => isString(u)
        ? u.indexOf(loaderName) > -1
        : u.loader.indexOf(loaderName) > -1
    )
  })
}

function findLoaderInRule(rule, loaderName) {
  return find(
    get(rule, 'use', []),
    u => isString(u)
      ? u.indexOf(loaderName) > -1
      : u.loader.indexOf(loaderName) > -1
  )
}

function setupBabelRule(rule) {
  const babelLoader = findLoaderInRule(rule, 'babel-loader')

  // Tell the babel-loader to use our babel.config.js
  set(babelLoader, ['options', 'babelrc'], true)
  set(babelLoader, ['options', 'configFile'], path.resolve(__dirname, 'babel.config.js'))

  // Include TypeScript files
  rule.test = /\.(j|t)sx?$/

  // Tell babel to transpile files from storybook and our packages
  rule.include = [
    path.resolve(__dirname),
    path.resolve(__dirname, '..', '..'),
  ]
}

module.exports = async ({ config, mode }) => {
  const babelRule = findRuleByLoader(config, 'babel-loader')
  setupBabelRule(babelRule)

  config.module.rules.push({
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
      loader: 'url-loader',
      options: { name: '[name].[ext]' }
    }
  })

  config.resolve.extensions = ['.web.ts', '.ts', '.json', '.web.tsx', '.tsx', '.js', '.jsx']

  config.resolve.alias = {
    ...config.resolve.alias,

    // Our stories are written for react-native first so map to web packages
    'react-native': 'react-native-web',
    '@storybook/react-native': '@storybook/react',

    // Alias react-native-web to an absolute path since it's currently not in root
    'react-native-web': resovePkg('react-native-web', { cwd: __dirname })
  }

  // Add the packages absolute path so that require.context is able to parse the path
  config.plugins.unshift(
    new webpack.ContextReplacementPlugin(
      /<packages>/,
      path.resolve(__dirname, '..', '..')
    )
  )

  return config
}
