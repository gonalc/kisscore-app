/**
 * Just missing to handle the language change from within the app.
 */
import { type Locale, getLocales } from 'expo-localization'
import { I18n } from 'i18n-js'
import es from './languages/es'
import en from './languages/en'

export const AVAILABLE_LANGUAGES = ['es', 'en'] as const

const i18n = new I18n({
  es,
  en
})

i18n.enableFallback = true

const locales = getLocales()

i18n.locale = locales[0].languageCode

export const changeLanguage = (locale: Locale['languageCode']) => {
  i18n.locale = locale
}

export default i18n
