const { createTransformer } = require('babel-jest')

const transformer = createTransformer({
  envName: 'test'
})

module.exports = transformer
