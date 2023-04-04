import { FC, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import { CountryPicker } from 'react-native-country-codes-picker'
import { CountryItem } from 'react-native-country-codes-picker/types/Types'

const CountryInput: FC = () => {
  const [show, setShow] = useState(false)

  const onSelect = (data: CountryItem) => {
    console.log('COUNTRY PICKER: ', data)
    setShow(false)
  }
  return (
    <View style={{ backgroundColor: 'green' }}>
      <Pressable onPress={() => setShow(true)}>
        <Text>Selecciona el pais ninio</Text>
      </Pressable>

      <CountryPicker show={show} pickerButtonOnPress={(item) => onSelect(item)} lang={'es'} />
    </View>
  )
}

export default CountryInput
