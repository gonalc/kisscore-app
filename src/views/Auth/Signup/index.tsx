import { View, StyleSheet } from 'react-native'
import Title from '../../../components/Title'
import COLORS from '../../../utils/colors'

const Signup = () => {
  return (
    <View style={styles.container}>
      <Title />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'stretch',
    padding: 50
  }
})

export default Signup
