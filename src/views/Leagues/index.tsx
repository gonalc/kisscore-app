import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getJWTToken, getStoredUser } from '../../utils/storage'
import { IUser } from '../../types/users'
import COLORS from '../../utils/colors'
import useFetchLeagues from '../../hooks/fetchLeagues'
import Loader from '../../components/Loader'

const Leagues: FC = () => {
  const [token, setToken] = useState<string>('')
  const [user, setUser] = useState<IUser | null>(null)

  const { leagues, loading } = useFetchLeagues()

  useEffect(() => {
    const getStoredData = async () => {
      const jwt = await getJWTToken()
      const userData = await getStoredUser()

      setToken(jwt)
      setUser(userData)
    }

    getStoredData()
  }, [])

  return (
    <Loader isLoading={loading}>
      <View style={styles.container}>
        <Text>Leagues Screen</Text>
        <Text>Token:</Text>
        <Text style={{ marginBottom: 50 }}>{token}</Text>

        <Text>User:</Text>
        <Text style={{ marginBottom: 50 }}>{JSON.stringify(user)}</Text>

        <Text>Leagues: {leagues?.length}</Text>
      </View>
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
