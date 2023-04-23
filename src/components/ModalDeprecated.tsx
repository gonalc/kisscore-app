import { FC, ReactNode } from 'react'
import { Pressable, Modal as RNModal, StyleSheet, Text, View } from 'react-native'
import COLORS, { hexToRgb } from '../utils/colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { LARGE_FONT, NORMAL_FONT, NunitoSans } from '../utils/fonts'
import useKeyboard from '../hooks/keyboard'

export interface IModalProps {
  isVisible: boolean
  children: ReactNode
  onClose: () => void
  title: string
}

const Modal: FC<IModalProps> = ({ isVisible, children, title, onClose }) => {
  const isKeyboardShown = useKeyboard()

  const styles = getStyles({ isKeyboardShown })

  return (
    <RNModal animationType="slide" visible={isVisible} transparent statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Pressable onPress={onClose} style={styles.closeContainer}>
              <FontAwesome5 name="times" size={NORMAL_FONT} color={COLORS.black} />
            </Pressable>
          </View>
          {children}
        </View>
      </View>
    </RNModal>
  )
}

const getStyles = ({ isKeyboardShown }) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: `rgba(${hexToRgb(COLORS.gray)}, 0.5)`
    },
    content: {
      padding: 15,
      backgroundColor: COLORS.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      flex: isKeyboardShown ? 1 : 0
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: isKeyboardShown ? 20 : 0
    },
    title: {
      fontSize: LARGE_FONT,
      color: COLORS.black,
      fontFamily: NunitoSans
    },
    closeContainer: {
      padding: 5
    }
  })
}

export default Modal
