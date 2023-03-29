import { FC } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import COLORS from '../utils/colors'
import { FONT_SIZE, NunitoSans } from '../utils/fonts'

export interface INegativeButtonProps {
  label: string
  onPress: () => void
}

const NegativeButton: FC<INegativeButtonProps> = ({ label, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: COLORS.black,
    borderWidth: 1
  },
  text: {
    color: COLORS.black,
    fontSize: FONT_SIZE.buttons,
    fontFamily: NunitoSans
  }
})

export default NegativeButton
