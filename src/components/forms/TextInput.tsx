import { FC, ReactNode } from 'react'
import { View, TextInput as Input, TextInputProps, Text, StyleSheet } from 'react-native'
import COLORS from '../../utils/colors'
import { FONT_SIZE, NunitoSans } from '../../utils/fonts'

export interface ITextInputProps extends Omit<TextInputProps, 'onChange' | 'onChangeText'> {
  label: string
  icon: ReactNode
  placeholder: string
  onChange: () => void
}

const TextInput: FC<ITextInputProps> = ({ label, icon, placeholder, onChange, value }) => {
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
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10
  },
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
  },
  label: {
    fontSize: FONT_SIZE.labels,
    fontFamily: NunitoSans
  }
})

export default TextInput
