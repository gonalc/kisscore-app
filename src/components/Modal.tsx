import { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Backdrop from './Backdrop'

export interface IModalProps {
  isOpen: boolean
  onClose: () => void
}

const Modal: FC<IModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null
  }

  return (
    <>
      <Backdrop onPress={onClose} />
      <View style={styles.container}>
        <Text>Modal</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 20
  }
})

export default Modal
