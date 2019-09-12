import { withPolyfills, makeConfig } from "@haul-bundler/preset-0.60";
import { find, get, isString, some } from 'lodash'
import path from 'path'
import resolvePkg from 'resolve-pkg'

Object.defineProperty(RegExp.prototype, "toJSON", {
  value: RegExp.prototype.toString
});

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

function removeLoaderFromRule(rule, loaderName) {
  remove(
    get(rule, 'use', []),
    u => isString(u)
      ? u.indexOf(loaderName) > -1
      : u.loader.indexOf(loaderName) > -1
  )
}

function setupBabelRule(rule) {
  const babelLoader = findLoaderInRule(rule, 'babel-loader')

  // If we found the rule, replace it's loader options,
  // so `babel-loader` will require our own custom `babel.config.js`
  babelLoader.options = {
    envName: 'native',
    rootMode: 'upward',
    cacheDirectory: true,
  }

  // by default the babel rule is configured with an exclude:
  // "/node_modules(?!.*[\\/\\\\](react|@react-navigation|@react-native-community|@expo|pretty-format|@haul-bundler|metro))/",
  delete rule.exclude

  // tell the rule to also transpile certain node modules
  rule.test = /\.(j|t)sx?$/
  rule.include = [
    resolvePkg('react-native'),
    resolvePkg('react'),
    resolvePkg('pretty-format'),
    resolvePkg('metro'),

    // Our dependencies
    resolvePkg('@jgornick/rnw-starter-app'),
    resolvePkg('@jgornick/rnw-starter-hello-world'),

    // Our app code
    path.resolve('./index.ts'),
    path.resolve('./App.tsx'),
  ]
}

export default makeConfig({
  bundles: {
    index: {
      transform({ bundleName, env, runtime, config }) {
        runtime.logger.info(
          `Altering Webpack config for bundle ${bundleName} for ${env.platform}`
        );

        runtime.logger.info(JSON.stringify(config, null, '  '))

        config.entry = [
          resolvePkg('react-native/Libraries/polyfills/console.js'),
          resolvePkg('react-native/Libraries/polyfills/error-guard.js'),
          resolvePkg('react-native/Libraries/polyfills/Object.es7.js'),
          resolvePkg('react-native/Libraries/Core/InitializeCore.js'),
          path.resolve(__dirname, 'index.ts'),
        ]

        runtime.logger.info(JSON.stringify(config, null, '  '))

        return config
      }
    },
  },
});