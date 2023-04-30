import { FC, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import COLORS from '../../utils/colors'
import { FONT_SIZE, LARGE_FONT, NunitoSans } from '../../utils/fonts'
import NegativeButton from '../../components/NegativeButton'
import i18n from '../../../i18n'
import ModalDeprecated from '../../components/ModalDeprecated'
import { Ionicons } from '@expo/vector-icons'
import TextInput from '../../components/forms/TextInput'
import Button from '../../components/Button'
import { MIN_LEAGUE_NAME_LENGTH } from '../../utils/forms'
import Modal from '../../components/Modal'

const NoLeagues: FC = () => {
  const [creatingLeague, setCreatingLeague] = useState(false)
  const [creatingLeagueDeprecated, setCreatingLeagueDeprecated] = useState(false)
  const [leagueName, setLeagueName] = useState('')

  return (
    <>
      <Text style={styles.noLeaguesTitle}>{i18n.t('leagues.noLeagues')}</Text>
      <View style={styles.buttonContainer}>
        <NegativeButton
          label={i18n.t('leagues.createLeague')}
          onPress={() => setCreatingLeague(true)}
          icon={<MaterialIcons name="add-box" size={LARGE_FONT} color={COLORS.black} />}
        />
      </View>

      <View style={styles.buttonContainer}>
        <NegativeButton
          label={'Crear liga deprecao'}
          onPress={() => setCreatingLeagueDeprecated(true)}
          icon={<MaterialIcons name="add-box" size={LARGE_FONT} color={COLORS.black} />}
        />
      </View>

      <Modal isOpen={creatingLeague} onClose={() => setCreatingLeague(false)}>
        <View style={styles.createLeagueForm}>
          <TextInput
            label={i18n.t('labels.name')}
            icon={<Ionicons name="trophy" size={LARGE_FONT} color={COLORS.black} />}
            placeholder="Super Cup"
            onChange={setLeagueName}
            value={leagueName}
          />

          <Button
            disabled={leagueName.length < MIN_LEAGUE_NAME_LENGTH}
            label={i18n.t('actions.create')}
            onPress={() => alert(`Creamoss!! ${leagueName}`)}
          />
        </View>
      </Modal>

      <ModalDeprecated
        isVisible={creatingLeagueDeprecated}
        onClose={() => setCreatingLeagueDeprecated(false)}
        title={i18n.t('leagues.createLeague')}
      >
        <View style={styles.createLeagueForm}>
          <TextInput
            label={i18n.t('labels.name')}
            icon={<Ionicons name="trophy" size={LARGE_FONT} color={COLORS.black} />}
            placeholder="Super Cup"
            onChange={setLeagueName}
            value={leagueName}
          />

          <Button
            disabled={leagueName.length < MIN_LEAGUE_NAME_LENGTH}
            label={i18n.t('actions.create')}
            onPress={() => alert(`Creamoss!! ${leagueName}`)}
          />
        </View>
      </ModalDeprecated>
    </>
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
  },
  createLeagueForm: {
    padding: 10
  }
})

export default NoLeagues
