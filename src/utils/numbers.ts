import i18n from '../../i18n'

export function displayNumber(number: number) {
  return new Intl.NumberFormat(i18n.locale).format(number)
}
