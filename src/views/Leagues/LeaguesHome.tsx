import { type FC, useContext } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import COLORS from '@utils/colors'
import useFetchLeagues from '@hooks/leagues/fetchLeagues'
import Loader from '@components/Loader'
import NoLeagues from './NoLeagues'
import LeagueCard from './LeagueCard'
import { LeaguesStackParamsList } from '.'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import InvitationsManager from '@components/invitations/InvitationsManager'
import AddConquist from './AddConquist'
import Jumbotron from './Jumbotron'
import type { QueryParams } from '@api/types'
import useGetSingleUser from '@hooks/users/getSingleUser'
import { UserContext } from '@contexts/userContext'
import type { IUserWithConquists } from '@_types/users'

export type TLeaguesHomeScreenProp = NativeStackNavigationProp<
  LeaguesStackParamsList,
  'LeaguesHome'
>

const LeaguesHome: FC = () => {
  const { localUser } = useContext(UserContext)

  const userQueryParams: QueryParams = {
    include: 'conquists'
  }
  const {
    user,
    loading: loadingUser,
    fetch: fetchUser
  } = useGetSingleUser<IUserWithConquists>(localUser?.id, userQueryParams)
  const { leagues, loading: loadingLeagues, fetch } = useFetchLeagues()

  const loading = loadingLeagues || loadingUser

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
            onRefresh={fetch}
            refreshing={loading}
          />
        </View>
      )
    }

    return <NoLeagues fetchLeagues={fetch} />
  }

  return (
    <Loader isLoading={loading || !localUser}>
      <View style={styles.container}>
        <Jumbotron user={user} refetchUser={fetchUser} />
        <InvitationsManager fetchLeagues={fetch} />
        <View style={styles.container}>{renderContent()}</View>
        <AddConquist fetch={() => fetchUser(true)} />
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
