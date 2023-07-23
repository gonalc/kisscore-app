import i18n from '@i18n/index'
import { type CountryItem, countryCodes } from 'react-native-country-codes-picker'

export function getCountry(countryCode: string) {
  return countryCodes.find((country) => countryCode === country.code)
}

export function getCountryName(name: CountryItem['name']): string {
  return name[i18n.locale]
}
