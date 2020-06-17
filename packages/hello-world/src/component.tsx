import React, { FC } from 'react'
import { Button } from 'react-native'

export interface HelloWorldProps {
  onPress: () => void
}

export const HelloWorld: FC<HelloWorldProps> = ({ onPress }) =>
  <Button title="Hello Native World!" onPress={onPress} />
