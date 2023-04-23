import { FC, useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { StyleSheet, Pressable, Dimensions } from 'react-native'
import COLORS from '../utils/colors'

interface IBackdropProps {
  onPress?: () => void
}

const Backdrop: FC<IBackdropProps> = ({ onPress }) => {
  const opacity = useSharedValue(0)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

  useEffect(() => {
    opacity.value = withSpring(0.5)
  }, [])

  const onPressBackdrop = () => {
    if (onPress) {
      onPress()
    }
  }

  const { height, width } = Dimensions.get('window')

  return (
    <Animated.View style={[styles.backdrop, animatedStyles, { height, width }]}>
      <Pressable style={{ width, height }} onPress={onPressBackdrop} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: COLORS.black,
    position: 'absolute',
    top: 0,
    left: 0,
    elevation: 10
  }
})

export default Backdrop
