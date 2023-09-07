import NegativeButton from '@components/NegativeButton'
import { MaterialIcons } from '@expo/vector-icons'
import i18n from '@i18n/index'
import { type FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { LARGE_FONT } from '@utils/fonts'
import COLORS from '@utils/colors'
import CreateLeagueModal from './CreateLeagueModal'

interface CreateLeagueButtonProps {
  fetchLeagues: () => void
}

const CreateLeagueButton: FC<CreateLeagueButtonProps> = ({ fetchLeagues }) => {
  const [creatingLeague, setCreatingLeague] = useState(false)

  return (
    <View style={styles.buttonContainer}>
      <NegativeButton
        label={i18n.t('leagues.createLeague')}
        onPress={() => setCreatingLeague(true)}
        icon={<MaterialIcons name="add-box" size={LARGE_FONT} color={COLORS.black} />}
      />

      <CreateLeagueModal
        isVisible={creatingLeague}
        close={() => setCreatingLeague(false)}
        fetchLeagues={fetchLeagues}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 20
  }
})

export default CreateLeagueButton
