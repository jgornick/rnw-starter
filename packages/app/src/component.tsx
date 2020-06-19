import React, { FC } from 'react'
import { HelloWorld } from '@jgornick/rnw-starter-hello-world'
import { Text, View } from 'react-native'

export interface AppProps {
  onPress: () => void
}

export const App: FC<AppProps> = ({ onPress }) =>
  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
    <Text style={{ marginVertical: 20, fontSize: 16 }}>App Component w/ HelloWorld</Text>
    <HelloWorld onPress={onPress} />
  </View>
