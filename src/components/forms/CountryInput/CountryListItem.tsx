import { FC } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import { ItemTemplateProps } from 'react-native-country-codes-picker/types/Types'
import COLORS from '../../../utils/colors'
import { FONT_SIZE, NunitoSans } from '../../../utils/fonts'
import i18n from '../../../../i18n'

const CountryListItem: FC<ItemTemplateProps> = ({ item, onPress }) => {
  const { flag } = item

  const selectCountry = () => {
    onPress(item)
  }

  return (
    <Pressable onPress={selectCountry} style={styles.container}>
      <Text style={styles.text}>
        {flag} {item.name[i18n.locale || 'es']}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    borderBottomColor: COLORS.lightRed,
    borderBottomWidth: 1
  },
  text: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body
  }
})

export default CountryListItem
