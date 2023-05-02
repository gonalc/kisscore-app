import { FC } from 'react'
import { ILeagueWithPlayers } from '../../types/leagues'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import COLORS from '../../utils/colors'
import { LARGER_FONT, LARGE_FONT, NunitoSans, NunitoSansBold } from '../../utils/fonts'
import { FontAwesome } from '@expo/vector-icons'
import i18n from '../../../i18n'

interface ILeagueCardProps {
  league: ILeagueWithPlayers
}

const AVATAR_SIZE = 50

const LeagueCard: FC<ILeagueCardProps> = ({ league }) => {
  const { name, players } = league

  return (
    <Pressable style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{name[0]}</Text>
      </View>

      <Text style={styles.leagueName}>{name}</Text>

      <View style={styles.players}>
        <FontAwesome name="user" color={COLORS.black} size={LARGE_FONT} />
        <Text style={styles.playersText}>
          {i18n.t('labels.playersAmount', { count: players.length })}
        </Text>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
    shadowColor: COLORS.gray,
    shadowOffset: {
      width: 10,
      height: 20
    },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: 400,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarText: {
    color: COLORS.whiteRed,
    fontSize: LARGER_FONT,
    fontFamily: NunitoSansBold
  },
  leagueName: {
    fontFamily: NunitoSans,
    fontSize: LARGE_FONT,
    flexGrow: 1,
    color: COLORS.black
  },
  players: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  playersText: {
    fontFamily: NunitoSans
  }
})

export default LeagueCard
