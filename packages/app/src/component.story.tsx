import { action } from '@storybook/addon-actions'
import { storiesOf } from '@storybook/react-native'
import React from 'react'

import { App } from './component'

storiesOf('App', module)
  .add('default view', () => <App onPress={action('App.onPress')} />)
