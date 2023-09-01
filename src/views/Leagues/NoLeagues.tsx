import { FC } from 'react'
import { StyleSheet, Text } from 'react-native'
import COLORS from '@utils/colors'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import i18n from '@i18n/index'
import CreateLeagueButton from './CreateLeagueButton'

interface NoLeaguesProps {
  fetchLeagues: () => void
}

const NoLeagues: FC<NoLeaguesProps> = ({ fetchLeagues }) => {
  return (
    <>
      <Text style={styles.noLeaguesTitle}>{i18n.t('leagues.noLeagues')}</Text>
      <CreateLeagueButton fetchLeagues={fetchLeagues} />
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
    textAlign: 'center',
    marginTop: 20
  },
  createLeagueForm: {
    padding: 10,
    backgroundColor: COLORS.background,
    borderRadius: 5
  }
})

export default NoLeagues
