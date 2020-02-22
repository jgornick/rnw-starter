import { getStorybookUI, configure } from '@storybook/react-native'
import { AppRegistry } from 'react-native'

import { name as appName } from './app.json'

function loadStories() {
  return [
    require('../app/src/component.story'),
    require('../hello-world/src/component.story')
  ]
}

configure(loadStories, module)

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({})

AppRegistry.registerComponent(appName, () => StorybookUIRoot)

export default StorybookUIRoot