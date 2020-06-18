const { createTransformer } = require('babel-jest');
const process = require('process');

module.exports = createTransformer({
  rootMode: 'upward',
})
