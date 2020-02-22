import { makeConfig, withPolyfills } from '@haul-bundler/preset-0.60'
import path from 'path'

Object.defineProperty(RegExp.prototype, 'toJSON', {
  value: RegExp.prototype.toString
});

export default makeConfig({
  bundles: {
    index: {
      root: path.resolve(__dirname, '..'),
      entry: withPolyfills(path.resolve(__dirname, 'index.tsx')),
      transform({ bundleName, env, runtime, config }) {
        runtime.logger.info(
          `Altering Webpack config for bundle ${bundleName} for ${env.platform}`
        );

        console.debug(JSON.stringify(config, null, '  '))

        return config
      }
    },
  },
});
