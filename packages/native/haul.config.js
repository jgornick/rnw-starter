import { makeConfig } from '@haul-bundler/preset-0.60'
import path from 'path'
import resolvePkg from 'resolve-pkg'

Object.defineProperty(RegExp.prototype, 'toJSON', {
  value: RegExp.prototype.toString
});

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
