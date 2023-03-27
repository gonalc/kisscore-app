import { FC } from 'react'
import { Pressable, StyleProp, StyleSheet, StyleSheetProperties, Text } from 'react-native'
import COLORS from '../utils/colors'
import { FONT_SIZE, NunitoSans } from '../utils/fonts'

export interface IButtonProps {
  label: string
  onPress: () => void
  disabled?: boolean
}

const Button: FC<IButtonProps> = ({ label, onPress, disabled }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, disabled ? styles.disabled : styles.enabled]}
      disabled={disabled}
    >
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  enabled: {
    shadowColor: COLORS.blue,
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 20,
    backgroundColor: COLORS.blue
  },
  disabled: {
    backgroundColor: '#CCC'
  },
  text: {
    color: COLORS.white,
    fontSize: FONT_SIZE.buttons,
    fontFamily: NunitoSans
  }
})

export default Button
