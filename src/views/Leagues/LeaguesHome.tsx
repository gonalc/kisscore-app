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
            ListHeaderComponentStyle={styles.listEdge}
            ListFooterComponent={<View />}
            ListFooterComponentStyle={styles.listEdge}
          />
        </View>
      )
    }

    return <NoLeagues fetchLeagues={fetch} />
  }

  return (
    <Loader isLoading={loading}>
      <InvitationsManager fetchLeagues={fetch} />
      <View style={styles.container}>{renderContent()}</View>
    </Loader>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  listEdge: {
    padding: 20
  }
})

export default LeaguesHome
