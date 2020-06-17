import React, { FC } from 'react'
import { Button } from 'react-native'

import { HelloWorldProps } from './component'

export const HelloWorld: FC<HelloWorldProps> = ({ onPress }) =>
  <Button title="Hello iOS World!" onPress={onPress} />