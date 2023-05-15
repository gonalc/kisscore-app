import { RouteProp } from '@react-navigation/native'
import { FC } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import type { LeaguesStackParamsList } from '.'
import useFetchSingleLeague from '../../hooks/leagues/fetchSingleLeague'
import Loader from '../../components/Loader'
import { FONT_SIZE, NunitoSans } from '../../utils/fonts'
import COLORS from '../../utils/colors'
import { sortByField } from '../../utils/sorter'
import PlayerItem from './PlayerItem'

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
        <Text style={styles.title}>{name}</Text>

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
  container: {},
  title: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.header,
    color: COLORS.black,
    padding: 20,
    paddingBottom: 0
  },
  listEdge: {
    padding: 10
  }
})

export default SingleLeague
