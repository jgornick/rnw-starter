import { makeConfig, withPolyfills } from '@haul-bundler/preset-0.60'
import path from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

Object.defineProperty(RegExp.prototype, 'toJSON', {
  value: RegExp.prototype.toString
});

export default makeConfig({
  bundles: {
    index: {
      root: path.resolve(__dirname),
      entry: withPolyfills(path.resolve(__dirname, 'index.tsx')),
      transform({ bundleName, env, runtime, config }) {
        runtime.logger.info(
          `Altering Webpack config for bundle ${bundleName} for ${env.platform}`
        );

        config.resolve.extensions = [
          `.${env.platform}.tsx`,
          `.${env.platform}.jsx`,
          `.${env.platform}.ts`,
          `.${env.platform}.js`,
          '.native.tsx',
          '.native.jsx',
          '.native.ts',
          '.native.js',
          '.tsx',
          '.jsx',
          '.ts',
          '.js',
          '.json',
        ]

        config.resolve.plugins.push(new TsconfigPathsPlugin())

        console.debug(JSON.stringify(config, null, '  '))

        return config
      }
    },
  },
});
