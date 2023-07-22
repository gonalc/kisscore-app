import { FC, ReactNode, useEffect, useState } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import Backdrop from './Backdrop'
import COLORS from '@utils/colors'
import useKeyboard from '@hooks/keyboard'

export interface IModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Modal: FC<IModalProps> = ({ isOpen, onClose, children }) => {
  const { width, height } = Dimensions.get('window')

  const { keyboardShown, keyboardHeight } = useKeyboard()

  const [modalHeight, setModalHeight] = useState<number>(-height)

  const offset = useSharedValue(height)

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }]
    }
  })

  useEffect(() => {
    if (isOpen) {
      offset.value = height
    }

    let targetTranslation = height - modalHeight * 2 + 40

    targetTranslation = keyboardShown ? targetTranslation - keyboardHeight : targetTranslation

    if (targetTranslation !== offset.value) {
      offset.value = withSpring(targetTranslation)
    }
  }, [isOpen, keyboardShown])

  if (!isOpen) {
    return null
  }

  const closeModal = () => {
    offset.value = withSpring(height)

    onClose()
  }

  return (
    <>
      <Backdrop onPress={closeModal} />
      <Animated.View
        style={[styles.container, { width }, animatedStyles]}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout

          setModalHeight(height)
        }}
      >
        {children}
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    backgroundColor: COLORS.whiteRed,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  }
})

export default Modal
