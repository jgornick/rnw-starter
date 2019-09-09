const { createTransformer } = require('babel-jest')

const transformer = createTransformer({
  envName: 'native'
})

module.exports = transformer
