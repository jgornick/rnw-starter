import { setOptions } from '@storybook/addon-options'
import { centered } from '@jgornick/rnw-starter-storybook/decorators/centered'
import { configure, addDecorator } from '@storybook/react'

const context = require.context('<packages>', true, /.story\.tsx$/);

addDecorator(centered)

setOptions({
  name: 'RnwStarter',
  addonPanelInRight: true,
  showSearchBox: true,
  showAddonPanel: true,
  showStoriesPanel: true,
})

function loadStories () {
  context.keys().forEach(context)
}

configure(loadStories, module)
