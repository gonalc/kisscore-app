import Button from '@components/Button'
import Loader from '@components/Loader'
import NegativeButton from '@components/NegativeButton'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import TextInput from '@components/forms/TextInput'
import i18n from '@i18n/index'
import { type FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import useCreateLeague from '@hooks/leagues/createLeague'
import { FONT_SIZE, LARGE_FONT, NunitoSans } from '@utils/fonts'
import COLORS from '@utils/colors'
import { MIN_LEAGUE_NAME_LENGTH } from '@utils/forms'
import type { IBaseLeague } from '@_types/leagues'

interface CreateLeagueProps {
  fetchLeagues: () => void
}

const CreateLeague: FC<CreateLeagueProps> = ({ fetchLeagues }) => {
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
      <View style={styles.buttonContainer}>
        <NegativeButton
          label={i18n.t('leagues.createLeague')}
          onPress={() => setCreatingLeague(true)}
          icon={<MaterialIcons name="add-box" size={LARGE_FONT} color={COLORS.black} />}
        />
      </View>

      <Modal isVisible={creatingLeague} onBackdropPress={() => setCreatingLeague(false)}>
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
    padding: 10,
    backgroundColor: COLORS.background,
    borderRadius: 5
  }
})

export default CreateLeague
