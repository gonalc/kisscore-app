import Ionicons from '@expo/vector-icons/Ionicons'
import { FC, useState } from 'react'
import { TextInput, View, StyleSheet, Pressable } from 'react-native'
import i18n from '../../../i18n'
import COLORS from '../../utils/colors'
import { FONT_SIZE, LARGER_FONT, LARGE_FONT, NunitoSans } from '../../utils/fonts'

export interface IPasswordInputProps {
  value: string
  onChange: (value: string) => void
}

const PasswordInput: FC<IPasswordInputProps> = ({ value, onChange }) => {
  const [visiblePassword, setVisiblePassword] = useState(false)

  const toggleVisibility = () => {
    setVisiblePassword((previous) => !previous)
  }

  return (
    <View style={styles.container}>
      <Ionicons name="key" size={LARGER_FONT} color={COLORS.black} />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder={i18n.t('forms.passwordPlaceholder')}
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
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.black,
    alignItems: 'center',
    marginVertical: 10,
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
  }
})

export default PasswordInput
