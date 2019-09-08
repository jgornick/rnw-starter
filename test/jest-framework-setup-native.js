const { configure } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

require('jest-enzyme')
require('jest-extended')

const { JSDOM } = require('jsdom')
const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js',
}

configure({ adapter: new Adapter() })

/**
 * Ignore some expected warnings
 * see: https://jestjs.io/docs/en/tutorial-react.html#snapshot-testing-with-mocks-enzyme-and-react-16
 * see https://github.com/Root-App/react-native-mock-render/issues/6
 */
const originalConsoleError = console.error

console.error = (message) => {
  if (message.startsWith('Warning:')) {
    return
  }

  originalConsoleError(message)
}
