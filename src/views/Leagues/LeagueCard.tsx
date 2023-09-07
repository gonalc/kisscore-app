import type { FC } from 'react'
import { ILeagueWithPlayers } from '@_types/leagues'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import COLORS from '@utils/colors'
import { LARGER_FONT, LARGE_FONT, NunitoSans, NunitoSansBold } from '@utils/fonts'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import type { TLeaguesHomeScreenProp } from './LeaguesHome'
import boxShadow from '@styles/boxShadow'
import i18n from '@i18n/index'

interface ILeagueCardProps {
  league: ILeagueWithPlayers
}

const AVATAR_SIZE = 50

const LeagueCard: FC<ILeagueCardProps> = ({ league }) => {
  const { name, players, id } = league

  const navigation = useNavigation<TLeaguesHomeScreenProp>()

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('SingleLeague', { leagueId: id })}
    >
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
    ...boxShadow,
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
