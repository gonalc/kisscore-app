import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FC } from 'react'
import { TextInput, View, StyleSheet } from 'react-native'
import i18n from '../../../i18n'
import COLORS from '../../utils/colors'
import { FONT_SIZE, LARGER_FONT, NunitoSans } from '../../utils/fonts'

export interface IEmailInputProps {
  value: string
  onChange: (value: string) => void
}

const EmailInput: FC<IEmailInputProps> = ({ value, onChange }) => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="email-outline" size={LARGER_FONT} color={COLORS.black} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={i18n.t('emailPlaceholder')}
        inputMode="email"
        keyboardType="email-address"
        autoCorrect={false}
        style={styles.textInput}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    alignItems: 'center'
  },
  textInput: {
    fontSize: FONT_SIZE.body,
    marginLeft: 10,
    color: COLORS.black,
    fontFamily: NunitoSans
  }
})

export default EmailInput
