import { countryCodes } from 'react-native-country-codes-picker'

export function getCountry(countryCode: string) {
  return countryCodes.find((country) => countryCode === country.code)
}
