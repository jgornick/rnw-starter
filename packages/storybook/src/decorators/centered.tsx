import { DecoratorFn } from '@storybook/react'
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  root: {
    minHeight: Platform.OS === 'web' ? '100vh' : '100%',
    maxWidth: Platform.OS === 'web' ? 680 : '100%',
    marginHorizontal: 'auto',
  }
})

export const centered: DecoratorFn = (renderStory) =>
  <View style={styles.root}>{renderStory()}</View>
