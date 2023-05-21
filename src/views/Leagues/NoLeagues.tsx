import { FC, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import COLORS from '../../utils/colors'
import { FONT_SIZE, LARGE_FONT, NunitoSans } from '../../utils/fonts'
import NegativeButton from '../../components/NegativeButton'
import i18n from '../../../i18n'
import { Ionicons } from '@expo/vector-icons'
import TextInput from '../../components/forms/TextInput'
import Button from '../../components/Button'
import { MIN_LEAGUE_NAME_LENGTH } from '../../utils/forms'
import Modal from '../../components/Modal'
import Loader from '../../components/Loader'
import useCreateLeague from '../../hooks/leagues/createLeague'
import type { IBaseLeague } from '../../types/leagues'

interface INoLeaguesProps {
  fetchLeagues: () => void
}

const NoLeagues: FC<INoLeaguesProps> = ({ fetchLeagues }) => {
  const [creatingLeague, setCreatingLeague] = useState(false)
  const [leagueName, setLeagueName] = useState('')

  const { loading, create } = useCreateLeague()

  const onCreate = async () => {
    const leagueToCreate: IBaseLeague = {
      name: leagueName.trim()
    }

    await create(leagueToCreate)

    setCreatingLeague(false)
    setLeagueName('')

    fetchLeagues()
  }

  return (
    <Loader isLoading={loading}>
      <Text style={styles.noLeaguesTitle}>{i18n.t('leagues.noLeagues')}</Text>
      <View style={styles.buttonContainer}>
        <NegativeButton
          label={i18n.t('leagues.createLeague')}
          onPress={() => setCreatingLeague(true)}
          icon={<MaterialIcons name="add-box" size={LARGE_FONT} color={COLORS.black} />}
        />
      </View>

      <Modal isOpen={creatingLeague} onClose={() => setCreatingLeague(false)}>
        <View style={styles.createLeagueForm}>
          <TextInput
            label={i18n.t('labels.name')}
            icon={<Ionicons name="trophy" size={LARGE_FONT} color={COLORS.black} />}
            placeholder={i18n.t('forms.createLeaguePlaceholder')}
            onChange={setLeagueName}
            value={leagueName}
            autoFocus
          />

          <Button
            disabled={leagueName.length < MIN_LEAGUE_NAME_LENGTH}
            label={i18n.t('actions.create')}
            onPress={onCreate}
          />
        </View>
      </Modal>
    </Loader>
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
    textAlign: 'center',
    marginTop: 20
  },
  createLeagueForm: {
    padding: 10
  }
})

export default NoLeagues
