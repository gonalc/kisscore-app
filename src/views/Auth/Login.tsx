import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Input from '../../components/EmailInput'
import COLORS from '../../utils/colors'
import { FONT_SIZE, PassionOne } from '../../utils/fonts'

function Login() {
  const [email, setEmail] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kisscore</Text>
      <Input value={email} onChange={setEmail} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
    padding: 50
  },
  title: {
    fontSize: FONT_SIZE.title,
    fontFamily: PassionOne,
    color: COLORS.red
  }
})

export default Login
