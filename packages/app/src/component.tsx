import React, { FC } from 'react'
import { HelloWorld } from '@jgornick/rnw-starter-hello-world'
import { Text, View } from 'react-native'

export interface AppProps {
  onPress: () => void
}

export const App: FC<AppProps> = ({ onPress }) =>
  <View>
    <Text>App</Text>
    <HelloWorld onPress={onPress} />
  </View>
