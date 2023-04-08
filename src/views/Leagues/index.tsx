import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getJWTToken, getStoredUser } from '../../utils/storage'
import { IUser } from '../../types/users'

const Leagues: FC = () => {
  const [token, setToken] = useState<string>('')
  const [user, setUser] = useState<IUser | null>(null)

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
    <View style={styles.container}>
      <Text>Leagues Screen</Text>
      <Text>Token:</Text>
      <Text style={{ marginBottom: 50 }}>{token}</Text>

      <Text>User:</Text>
      <Text>{JSON.stringify(user)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50
  }
})

export default Leagues
