import { StyleSheet, Text, View } from 'react-native'
import COLORS from '../../utils/colors'
import { PassionOne } from '../../utils/fonts'

function Login() {
  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: PassionOne }}>Kisscore</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
    padding: 50
  }
})

export default Login
