import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, View } from 'react-native'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'

type THomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'LeaguesScreens'>

const Settings = () => {
  const navigation = useNavigation<THomeScreenProp>()

  const logout = async () => {
    await AsyncStorage.clear()

    navigation.navigate('Login')
  }

  return (
    <View>
      <Text>This is the settings screen</Text>

      <Button label="Logout" onPress={logout} />
    </View>
  )
}

export default Settings
