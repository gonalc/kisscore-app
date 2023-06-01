import AsyncStorage from '@react-native-async-storage/async-storage'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext'
import i18n from '../../i18n'
import COLORS from '../utils/colors'

type THomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'LeaguesScreens'>

const Settings = () => {
  const navigation = useNavigation<THomeScreenProp>()

  const user = useContext(UserContext)

  const logout = async () => {
    await AsyncStorage.clear()

    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Text>This is the settings screen</Text>

      <Text>Logged as:</Text>
      <Text>Name: {user?.name}</Text>
      <Text>ID: {user?.id}</Text>

      <Button label={i18n.t('actions.logout')} onPress={logout} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20
  }
})

export default Settings
