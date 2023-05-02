import { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import COLORS from '../../utils/colors'
import useFetchLeagues from '../../hooks/leagues/fetchLeagues'
import Loader from '../../components/Loader'
import NoLeagues from './NoLeagues'

const Leagues: FC = () => {
  const { leagues, loading } = useFetchLeagues()

  const renderContent = () => {
    if (leagues.length) {
      return (
        <>
          <Text>Leagues Screen</Text>

          <Text>Leagues:</Text>
          <Text style={{ marginBottom: 50 }}>{JSON.stringify(leagues)}</Text>
        </>
      )
    }

    return <NoLeagues />
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
    backgroundColor: COLORS.white
  }
})

export default Leagues
