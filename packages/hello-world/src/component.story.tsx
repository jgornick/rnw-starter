import { storiesOf } from '@storybook/react-native'
import React from 'react'
import { HelloWorld } from './component'

storiesOf('HelloWorld', module)
  .add('default view', () => <HelloWorld />)