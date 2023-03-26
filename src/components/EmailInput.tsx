import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FC } from 'react'
import { TextInput, View } from 'react-native'

export interface IEmailInputProps {
  value: string
  onChange: (value: string) => void
}

const EmailInput: FC<IEmailInputProps> = ({ value, onChange }) => {
  return (
    <View>
      <MaterialCommunityIcons name="email-outline" size={24} color="black" />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="hollaaaaa"
        keyboardType="email-address"
      />
    </View>
  )
}

export default EmailInput
