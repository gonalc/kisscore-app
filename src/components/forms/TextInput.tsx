import { FC, ReactNode } from 'react'
import { View, TextInput as Input, TextInputProps, Text, StyleSheet } from 'react-native'
import COLORS from '../../utils/colors'
import { FONT_SIZE, NunitoSans } from '../../utils/fonts'
import type { TErrorType } from '../../types/forms'
import i18n from '../../../i18n'

export interface ITextInputProps extends Omit<TextInputProps, 'onChange' | 'onChangeText'> {
  label: string
  icon: ReactNode
  placeholder: string
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void
  error?: TErrorType
  errorPayload?: Record<string, unknown>
}

const TextInput: FC<ITextInputProps> = ({
  label,
  icon,
  placeholder,
  onChange,
  value,
  error,
  errorPayload = {}
}) => {
  const styles = getStyles({ error })

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.container}>
        {icon}
        <Input
          style={styles.textInput}
          placeholder={placeholder}
          onChangeText={onChange}
          value={value}
        />
      </View>
      {error && (
        <Text style={[styles.label, styles.errorColor]}>
          {i18n.t(`forms.errors.${error}`, errorPayload)}
        </Text>
      )}
    </View>
  )
}

const getStyles = ({ error }) => {
  return StyleSheet.create({
    wrapper: {
      marginVertical: 10
    },
    container: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: error ? COLORS.red : COLORS.black,
      alignItems: 'center'
    },
    textInput: {
      fontSize: FONT_SIZE.body,
      marginLeft: 10,
      color: COLORS.black,
      fontFamily: NunitoSans
    },
    label: {
      fontSize: FONT_SIZE.labels,
      fontFamily: NunitoSans,
      color: COLORS.black
    },
    errorColor: {
      color: COLORS.red
    }
  })
}

export default TextInput
