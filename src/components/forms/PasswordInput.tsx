import Ionicons from '@expo/vector-icons/Ionicons'
import { FC, useState } from 'react'
import { TextInput, View, StyleSheet, Pressable, Text } from 'react-native'
import i18n from '../../../i18n'
import COLORS from '@utils/colors'
import { FONT_SIZE, LARGER_FONT, LARGE_FONT, NunitoSans } from '@utils/fonts'

export interface IPasswordInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  showError?: boolean
  errorMessage?: string
}

const PasswordInput: FC<IPasswordInputProps> = ({
  value,
  onChange,
  placeholder,
  showError,
  errorMessage
}) => {
  const styles = getStyles({ showError })

  const [visiblePassword, setVisiblePassword] = useState(false)

  const toggleVisibility = () => {
    setVisiblePassword((previous) => !previous)
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Ionicons name="key" size={LARGER_FONT} color={COLORS.black} />
        <TextInput
          value={value}
          onChangeText={onChange}
          placeholder={placeholder || i18n.t('forms.passwordPlaceholder')}
          inputMode="text"
          keyboardType="numeric"
          secureTextEntry={!visiblePassword}
          autoCorrect={false}
          style={styles.textInput}
        />
        <View style={styles.toggleVisibilityWrapper}>
          <Pressable onPress={toggleVisibility}>
            <Ionicons
              name={visiblePassword ? 'eye-off' : 'eye'}
              size={LARGE_FONT}
              color={COLORS.black}
            />
          </Pressable>
        </View>
      </View>
      {showError && (
        <Text style={styles.error}>{i18n.t(errorMessage || 'forms.errors.passwordInvalid')}</Text>
      )}
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
      alignItems: 'center',
      position: 'relative'
    },
    textInput: {
      fontSize: FONT_SIZE.body,
      marginLeft: 10,
      color: COLORS.black,
      fontFamily: NunitoSans
    },
    toggleVisibilityWrapper: {
      position: 'absolute',
      right: 0,
      padding: 3
    },
    error: {
      color: COLORS.red,
      fontSize: FONT_SIZE.labels,
      fontFamily: NunitoSans
    }
  })
}

export default PasswordInput
