import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, View } from 'react-native'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { useEffect, useState } from 'react'
import { getStoredUser } from '../utils/storage'
import { IUser } from '../types/users'

type THomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'LeaguesScreens'>

const Settings = () => {
  const navigation = useNavigation<THomeScreenProp>()

  const [user, setUser] = useState<IUser>()

  const logout = async () => {
    await AsyncStorage.clear()

    navigation.navigate('Login')
  }

  useEffect(() => {
    const getUser = async () => {
      const loggedUser = await getStoredUser()

      setUser(loggedUser)
    }

    getUser()
  }, [])

  return (
    <View>
      <Text>This is the settings screen</Text>

      <Text>Logged as:</Text>
      <Text>Name: {user?.name}</Text>
      <Text>ID: {user?.id}</Text>

      <Button label="Logout" onPress={logout} />
    </View>
  )
}

export default Settings
