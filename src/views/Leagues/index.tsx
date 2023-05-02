import { FC } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import COLORS from '../../utils/colors'
import useFetchLeagues from '../../hooks/leagues/fetchLeagues'
import Loader from '../../components/Loader'
import NoLeagues from './NoLeagues'
import LeagueCard from './LeagueCard'

const Leagues: FC = () => {
  const { leagues, loading, fetch } = useFetchLeagues()

  const renderContent = () => {
    if (leagues.length) {
      return (
        <View>
          <FlatList
            renderItem={({ item }) => <LeagueCard league={item} />}
            data={leagues}
            keyExtractor={(item) => `league-item_${item.id}`}
          />
        </View>
      )
    }

    return <NoLeagues fetchLeagues={fetch} />
  }

  return (
    <Loader isLoading={loading}>
      <View style={styles.container}>{renderContent()}</View>
    </Loader>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: COLORS.background
  }
})

export default Leagues
