import { centered } from '@jgornick/rnw-starter-storybook/decorators/centered'
import { addDecorator, getStorybookUI, configure } from '@storybook/react-native'
import { AppRegistry } from 'react-native'

import { name as appName } from './app.json'

// @ts-ignore
import { loadStories } from './.storybook/stories'

import '@storybook/addon-ondevice-actions/register'

addDecorator(centered)

configure(() => {
  loadStories()
}, module);

const StorybookUIRoot = getStorybookUI({})

AppRegistry.registerComponent(appName, () => StorybookUIRoot)

export default StorybookUIRoot
