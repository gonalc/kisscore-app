import React, { FC } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import COLORS from '@utils/colors'

interface ILoaderProps {
  children: React.ReactNode
  isLoading: boolean
}

const Loader: FC<ILoaderProps> = ({ children, isLoading }) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={COLORS.red} size="large" />
      </View>
    )
  }
  return <>{children}</>
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: COLORS.background
  }
})

export default Loader
