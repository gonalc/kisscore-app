import { FC } from 'react'
import { Text, StyleSheet } from 'react-native'
import { FONT_SIZE, NunitoSansBold } from '@utils/fonts'
import COLORS from '@utils/colors'
import { getCountry } from '@utils/countries'
import i18n from '../../../i18n'

interface IConquistCountryItem {
  countryCode: string
}

const ConquistCountryItem: FC<IConquistCountryItem> = ({ countryCode }) => {
  const country = getCountry(countryCode)
  const { name, flag } = country

  return (
    <Text style={styles.summaryValue}>
      {name[i18n.locale]} {flag}
    </Text>
  )
}

const styles = StyleSheet.create({
  summaryValue: {
    fontFamily: NunitoSansBold,
    fontSize: FONT_SIZE.body,
    color: COLORS.black
  }
})

export default ConquistCountryItem
