import { FC } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import COLORS from '../../utils/colors'
import useFetchLeagues from '../../hooks/leagues/fetchLeagues'
import Loader from '../../components/Loader'
import NoLeagues from './NoLeagues'
import LeagueCard from './LeagueCard'
import { LeaguesStackParamsList } from '.'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import InvitationsManager from '../../components/invitations/InvitationsManager'
import AddConquist from './AddConquist'
import Jumbotron from './Jumbotron'

export type TLeaguesHomeScreenProp = NativeStackNavigationProp<
  LeaguesStackParamsList,
  'LeaguesHome'
>

const LeaguesHome: FC = () => {
  const { leagues, loading, fetch } = useFetchLeagues()

  const renderContent = () => {
    if (leagues.length) {
      return (
        <View>
          <FlatList
            renderItem={({ item }) => <LeagueCard league={item} />}
            data={leagues}
            keyExtractor={(item) => `league-item_${item.id}`}
            ListHeaderComponent={<View />}
            ListHeaderComponentStyle={styles.listEdgeTop}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={styles.listEdgeBottom}
          />
        </View>
      )
    }

    return <NoLeagues fetchLeagues={fetch} />
  }

  return (
    <Loader isLoading={loading}>
      <View style={styles.container}>
        <Jumbotron />
        <InvitationsManager fetchLeagues={fetch} />
        <View style={styles.container}>{renderContent()}</View>
        <AddConquist />
      </View>
    </Loader>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  listEdgeTop: {
    padding: 10
  },
  listEdgeBottom: {
    padding: 20
  }
})

export default LeaguesHome
