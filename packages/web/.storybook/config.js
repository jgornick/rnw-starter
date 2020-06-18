import { centered } from '@jgornick/rnw-starter-storybook/decorators/centered'
import { configure, addDecorator } from '@storybook/react'

const context = require.context('<packages>', true, /.story\.tsx$/);

addDecorator(centered)

function loadStories () {
  context.keys().forEach(context)
}

configure(loadStories, module)
