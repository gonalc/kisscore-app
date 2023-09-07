import { RouteProp } from '@react-navigation/native'
import { FC } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import type { LeaguesStackParamsList } from '.'
import useFetchSingleLeague from '@hooks/leagues/fetchSingleLeague'
import Loader from '@components/Loader'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import COLORS from '@utils/colors'
import { sortByField } from '@utils/sorter'
import PlayerItem from './PlayerItem'
import BackButton from '@components/BackButton'
import LeagueSettings from './LeagueSettings'

// Type for the route prop
type SingleLeagueRouteProps = RouteProp<LeaguesStackParamsList, 'SingleLeague'>

interface ISingleLeagueProps {
  route: SingleLeagueRouteProps
}

const SingleLeague: FC<ISingleLeagueProps> = ({ route }) => {
  const { leagueId } = route.params
  const { league, loading } = useFetchSingleLeague(leagueId)

  const { name, players } = league || {}

  const sortedPlayers = players?.sort(sortByField('score')) || []

  return (
    <Loader isLoading={loading}>
      <View style={styles.container}>
        <BackButton />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>

          <LeagueSettings leagueId={leagueId} />
        </View>

        <FlatList
          data={sortedPlayers}
          renderItem={({ item, index }) => <PlayerItem player={item} position={index + 1} />}
          keyExtractor={(item) => `player-item_${item.id}`}
          ListHeaderComponent={<View />}
          ListHeaderComponentStyle={styles.listEdge}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={styles.listEdge}
        />
      </View>
    </Loader>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.header,
    color: COLORS.black
  },
  listEdge: {
    padding: 10
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  }
})

export default SingleLeague
