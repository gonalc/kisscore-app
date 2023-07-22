import { type CountryItem, countryCodes } from 'react-native-country-codes-picker'
import i18n from '../../i18n'

export function getCountry(countryCode: string) {
  return countryCodes.find((country) => countryCode === country.code)
}

export function getCountryName(name: CountryItem['name']): string {
  return name[i18n.locale]
}
