import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { App } from './component'

storiesOf('App', module)
  .add('default view', () => <App />)
