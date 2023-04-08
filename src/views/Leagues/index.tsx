import { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getJWTToken, getStoredUser } from '../../utils/storage'
import { IUser } from '../../types/users'
import Button from '../../components/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import type { RootStackParamList } from '../../../App'

type THomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Leagues'>

const Leagues: FC = () => {
  const navigation = useNavigation<THomeScreenProp>()

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

  const logout = async () => {
    await AsyncStorage.clear()

    navigation.navigate('Login')
  }
  return (
    <View style={styles.container}>
      <Text>Leagues Screen</Text>
      <Text>Token:</Text>
      <Text style={{ marginBottom: 50 }}>{token}</Text>

      <Text>User:</Text>
      <Text style={{ marginBottom: 50 }}>{JSON.stringify(user)}</Text>

      <Button label="Logout" onPress={logout} />
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
