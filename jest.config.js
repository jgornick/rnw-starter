const jestPlatforms = require('./test/jest-platforms')

const config = {
  ...jestPlatforms,
  automock: false,
  bail: false,
}

Object.defineProperty(RegExp.prototype, "toJSON", {
  value: RegExp.prototype.toString
});
console.log(JSON.stringify(config, null, '  '))

module.exports = config
