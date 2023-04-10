import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import COLORS from '../../utils/colors'
import { FONT_SIZE, LARGE_FONT, NunitoSans } from '../../utils/fonts'
import NegativeButton from '../../components/NegativeButton'
import i18n from '../../../i18n'

const NoLeagues: FC = () => {
  return (
    <View>
      <Text style={styles.noLeaguesTitle}>{i18n.t('leagues.noLeagues')}</Text>
      <View style={styles.buttonContainer}>
        <NegativeButton
          label={i18n.t('leagues.createLeague')}
          onPress={() => alert('Alertando')}
          icon={<MaterialIcons name="add-box" size={LARGE_FONT} color={COLORS.black} />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 20
  },
  noLeaguesTitle: {
    fontSize: FONT_SIZE.body,
    fontFamily: NunitoSans,
    color: COLORS.black,
    textAlign: 'center'
  }
})

export default NoLeagues
