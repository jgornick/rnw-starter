const path = require('path')
const webpack = require('webpack')

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.(gif|jpe?g|png|svg)$/,
    use: {
      loader: 'url-loader',
      options: { name: '[name].[ext]' }
    }
  })

  config.resolve.extensions = ['.web.ts', '.ts', '.json', '.web.tsx', '.tsx']

  config.resolve.alias = {
    'react-native': 'react-native-web'
  }

  console.log("TCL: config", config)

  return config
}
