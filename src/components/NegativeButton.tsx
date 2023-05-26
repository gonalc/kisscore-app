import { FC, ReactNode } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import COLORS from '../utils/colors'
import { FONT_SIZE, NunitoSans } from '../utils/fonts'

export interface INegativeButtonProps {
  label: string
  onPress: () => void
  icon?: ReactNode
  disabled?: boolean
}

const NegativeButton: FC<INegativeButtonProps> = ({ label, onPress, icon, disabled }) => {
  const styles = getStyles({ icon })

  return (
    <Pressable onPress={onPress} style={styles.container} disabled={disabled}>
      {icon ?? icon}
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  )
}

const getStyles = ({ icon }) => {
  return StyleSheet.create({
    container: {
      alignSelf: 'center',
      paddingVertical: 5,
      paddingHorizontal: 20,
      borderRadius: 5,
      borderColor: COLORS.black,
      borderWidth: 1,
      flexDirection: 'row',
      alignItems: 'center'
    },
    text: {
      color: COLORS.black,
      fontSize: FONT_SIZE.buttons,
      fontFamily: NunitoSans,
      marginLeft: icon ? 10 : 0
    }
  })
}

export default NegativeButton
