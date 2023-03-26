import { StatusBar } from 'expo-status-bar'
import { StyleSheet, View } from 'react-native'
import { useFonts } from 'expo-font'
import { NunitoSans_400Regular } from '@expo-google-fonts/nunito-sans'
import { PassionOne_400Regular } from '@expo-google-fonts/passion-one'
import Login from './src/views/Auth/Login'
import './i18n'

function App() {
  const [fontsLoaded] = useFonts({
    NunitoSans: NunitoSans_400Regular,
    PassionOne: PassionOne_400Regular
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <View style={styles.container}>
      <Login />
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
