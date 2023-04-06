import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import { FC } from 'react'
import { TextInput, View, StyleSheet, Text } from 'react-native'
import i18n from '../../../i18n'
import COLORS from '../../utils/colors'
import { FONT_SIZE, LARGER_FONT, NunitoSans } from '../../utils/fonts'

export interface IEmailInputProps {
  value: string
  onChange: (value: string) => void
  showError?: boolean
}

const EmailInput: FC<IEmailInputProps> = ({ value, onChange, showError }) => {
  const styles = getStyles({ showError })

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="email-outline" size={LARGER_FONT} color={COLORS.black} />
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={i18n.t('forms.emailPlaceholder')}
          inputMode="email"
          keyboardType="email-address"
          autoCorrect={false}
          style={styles.textInput}
          autoCapitalize="none"
        />
      </View>
      {showError && <Text style={styles.error}>{i18n.t('forms.errors.emailError')}</Text>}
    </View>
  )
}

const getStyles = ({ showError }) => {
  return StyleSheet.create({
    wrapper: {
      marginVertical: 10
    },
    container: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: showError ? COLORS.red : COLORS.black,
      alignItems: 'center'
    },
    textInput: {
      fontSize: FONT_SIZE.body,
      marginLeft: 10,
      color: COLORS.black,
      fontFamily: NunitoSans
    },
    error: {
      color: COLORS.red,
      fontSize: FONT_SIZE.labels,
      fontFamily: NunitoSans
    }
  })
}

export default EmailInput
