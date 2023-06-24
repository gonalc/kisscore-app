import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { useFonts } from 'expo-font'
import { NunitoSans_400Regular, NunitoSans_700Bold } from '@expo-google-fonts/nunito-sans'
import { PassionOne_400Regular } from '@expo-google-fonts/passion-one'
import Login from './src/views/Auth/Login'
import './i18n'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Signup from './src/views/Auth/Signup'
import { FONT_SIZE, PassionOne } from './src/utils/fonts'
import HeaderBackground from './src/components/HeaderBackground'
import COLORS from './src/utils/colors'
import { useEffect, useState } from 'react'
import { getJWTToken, storeSessionData } from './src/utils/storage'
import { checkToken } from './src/api/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LeaguesTabs from './src/views/LeaguesTabs'
import { UserContext } from './src/contexts/userContext'
import type { IUser } from './src/types/users'

export type RootStackParamList = {
  Login: undefined
  Signup: undefined
  LeaguesScreens: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans: NunitoSans_400Regular,
    NunitoSansBold: NunitoSans_700Bold,
    PassionOne: PassionOne_400Regular
  })

  const [loading, setLoading] = useState(true)
  const [localUser, setLocalUser] = useState<IUser | null>(null)
  const [initialScreen, setInitialScreen] = useState<keyof RootStackParamList>('Login')

  useEffect(() => {
    const check = async () => {
      try {
        const token = await getJWTToken()

        if (token) {
          const { jwt, user } = await checkToken(token)
          setLocalUser(user)
          await storeSessionData(user, jwt)
          setInitialScreen('LeaguesScreens')
        } else {
          await AsyncStorage.clear()
        }
      } catch (error) {
        await AsyncStorage.clear()
      } finally {
        setLoading(false)
      }
    }

    check()
  }, [])

  if (!fontsLoaded || loading) {
    return null
  }

  return (
    <UserContext.Provider value={{ localUser, setLocalUser }}>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={initialScreen}>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                header: () => null
              }}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{
                header: () => null
              }}
            />

            <Stack.Screen
              name="LeaguesScreens"
              component={LeaguesTabs}
              options={{
                headerTitleStyle: { fontFamily: PassionOne, fontSize: FONT_SIZE.header },
                headerTintColor: COLORS.whiteRed,
                headerBackground: () => <HeaderBackground />,
                headerBackVisible: false,
                title: 'Kisscore'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </View>
    </UserContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App
