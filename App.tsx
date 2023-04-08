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
import Leagues from './src/views/Leagues'
import { NunitoSansBold } from './src/utils/fonts'
import HeaderBackground from './src/components/HeaderBackground'
import COLORS from './src/utils/colors'
import { useEffect, useState } from 'react'
import { getJWTToken, storeSessionData } from './src/utils/storage'
import { checkToken } from './src/api/auth'

export type RootStackParamList = {
  Login: undefined
  Signup: undefined
  Leagues: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans: NunitoSans_400Regular,
    NunitoSansBold: NunitoSans_700Bold,
    PassionOne: PassionOne_400Regular
  })

  const [loading, setLoading] = useState(true)
  const [initialScreen, setInitialScreen] = useState<keyof RootStackParamList>('Login')

  useEffect(() => {
    const check = async () => {
      const token = await getJWTToken()

      if (token) {
        const { jwt, user } = await checkToken(token)
        await storeSessionData(user, jwt)
        setInitialScreen('Leagues')
        setLoading(false)
      }
    }

    check()
  })

  if (!fontsLoaded || loading) {
    return null
  }

  return (
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
            name="Leagues"
            component={Leagues}
            options={{
              headerTitleStyle: { fontFamily: NunitoSansBold },
              headerTintColor: COLORS.white,
              headerBackground: () => <HeaderBackground />,
              headerBackVisible: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default App
