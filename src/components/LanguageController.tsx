import type { FC } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import COLORS from '@utils/colors'
import i18n, { AVAILABLE_LANGUAGES, changeLanguage } from '@i18n/index'
import { FONT_SIZE, NunitoSans, NunitoSansBold } from '@utils/fonts'
import type { Locale } from 'expo-localization'

interface ILanguageControllerProps {
  isVisible: boolean
  onClose: () => void
}

const LanguageController: FC<ILanguageControllerProps> = ({ isVisible, onClose }) => {
  const onChangeLanguage = (locale: Locale['languageCode']) => {
    changeLanguage(locale)
    onClose()
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t('labels.availableLanguages')}</Text>
        <View>
          {AVAILABLE_LANGUAGES.map((language) => (
            <Pressable
              style={styles.langaugeItem}
              key={`language-selector_${language}`}
              onPress={() => onChangeLanguage(language)}
            >
              <Text style={styles.languageItemText}>{i18n.t(`languages.${language}`)}</Text>
              {i18n.locale === language && <View style={styles.selectedLanguage} />}
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 5
  },
  title: {
    fontSize: FONT_SIZE.body,
    color: COLORS.black,
    fontFamily: NunitoSansBold
  },
  langaugeItem: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  languageItemText: {
    fontSize: FONT_SIZE.body,
    color: COLORS.black,
    fontFamily: NunitoSans
  },
  selectedLanguage: {
    width: 10,
    height: 10,
    borderRadius: 500,
    backgroundColor: COLORS.red
  }
})

export default LanguageController
