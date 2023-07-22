import { FC } from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import i18n from '../../i18n'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { NORMAL_FONT, NunitoSans } from '@utils/fonts'
import COLORS from '@utils/colors'

const BackButton: FC = () => {
  const navigation = useNavigation()

  return (
    <Pressable style={styles.container} onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={NORMAL_FONT} color={COLORS.black} />
      <Text style={styles.text}>{i18n.t('actions.back')}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center'
  },
  text: {
    color: COLORS.black,
    fontFamily: NunitoSans
  }
})

export default BackButton
