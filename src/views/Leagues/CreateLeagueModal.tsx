import type { IBaseLeague } from '@_types/leagues'
import Loader from '@components/Loader'
import TextInput from '@components/forms/TextInput'
import useCreateLeague from '@hooks/leagues/createLeague'
import { Ionicons } from '@expo/vector-icons'
import i18n from '@i18n/index'
import COLORS from '@utils/colors'
import { FONT_SIZE, LARGE_FONT, NunitoSans } from '@utils/fonts'
import { MIN_LEAGUE_NAME_LENGTH } from '@utils/forms'
import { type FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import Button from '@components/Button'

interface CreateLeagueModalProps {
  isVisible: boolean
  close: () => void
  fetchLeagues?: () => void
}

const CreateLeagueModal: FC<CreateLeagueModalProps> = ({ isVisible, close, fetchLeagues }) => {
  const [leagueName, setLeagueName] = useState('')

  const { loading, create } = useCreateLeague()

  const onCreate = async () => {
    const leagueToCreate: IBaseLeague = {
      name: leagueName.trim()
    }

    await create(leagueToCreate)

    close()
    setLeagueName('')

    if (fetchLeagues) {
      fetchLeagues()
    }
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={close} coverScreen useNativeDriverForBackdrop>
      <Loader isLoading={loading}>
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
      </Loader>
    </Modal>
  )
}

const styles = StyleSheet.create({
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

export default CreateLeagueModal
