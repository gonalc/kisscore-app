/**
 * Just missing to handle the language change from within the app.
 */
import { getLocales } from 'expo-localization'
import { I18n } from 'i18n-js'
import es from './languages/es'

const i18n = new I18n({
  es
})

const locales = getLocales()

i18n.locale = locales[0].languageCode

export default i18n
