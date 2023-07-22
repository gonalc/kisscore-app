import { FC, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { CountryPicker } from 'react-native-country-codes-picker'
import { FontAwesome } from '@expo/vector-icons'
import { CountryItem } from 'react-native-country-codes-picker/types/Types'
import { FONT_SIZE, LARGE_FONT, NunitoSans } from '@utils/fonts'
import COLORS from '@utils/colors'
import i18n from '../../../../i18n'
import CountryListItem from './CountryListItem'

export interface ICountryInputProps {
  value: string
  placeholder?: string
  phoneMode?: boolean
  onChange: (value: string) => void
}

const CountryInput: FC<ICountryInputProps> = ({
  value,
  placeholder,
  phoneMode = false,
  onChange
}) => {
  const [show, setShow] = useState(false)
  const [country, setCountry] = useState<CountryItem | null>(null)

  const styles = getStyles({ value })

  const onSelect = (data: CountryItem) => {
    setShow(false)
    setCountry(data)
    onChange(data.code)
  }

  const getValueText = () => {
    if (country) {
      const { name, flag } = country
      return (
        <Text>
          {name.es} {flag}
        </Text>
      )
    }

    return placeholder || i18n.t('forms.emptyCountry')
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{i18n.t('labels.country')}</Text>
      <View style={styles.container}>
        <FontAwesome name="flag" size={LARGE_FONT} color={COLORS.black} />
        <Pressable onPress={() => setShow(true)}>
          <Text style={styles.text}>{getValueText()}</Text>
        </Pressable>
      </View>

      <CountryPicker
        style={{
          modal: {
            height: 500,
            backgroundColor: COLORS.background,
            paddingHorizontal: 30
          },
          dialCode: {
            height: phoneMode ? 20 : 0,
            width: phoneMode ? 20 : 0
          }
        }}
        show={show}
        pickerButtonOnPress={(item) => onSelect(item)}
        lang={i18n.locale}
        searchMessage={i18n.t('forms.countryNotFound')}
        popularCountries={['ES']}
        itemTemplate={CountryListItem}
        onBackdropPress={() => setShow(false)}
        excludedCountries={['AN']}
      />
    </View>
  )
}

const getStyles = ({ value }) => {
  return StyleSheet.create({
    wrapper: {
      marginVertical: 10
    },
    container: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: COLORS.black,
      alignItems: 'center'
    },
    text: {
      fontSize: FONT_SIZE.body,
      marginLeft: 10,
      color: value ? COLORS.black : COLORS.gray,
      fontFamily: NunitoSans
    },
    label: {
      fontSize: FONT_SIZE.labels,
      fontFamily: NunitoSans,
      color: COLORS.black
    }
  })
}

export default CountryInput
