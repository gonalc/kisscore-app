import { StyleSheet, Text } from 'react-native'
import COLORS from '@utils/colors'
import { FONT_SIZE, PassionOne } from '@utils/fonts'

const Title = () => {
  return <Text style={styles.title}>Kisscore</Text>
}

const styles = StyleSheet.create({
  title: {
    fontSize: FONT_SIZE.title,
    fontFamily: PassionOne,
    color: COLORS.red,
    marginVertical: 20,
    textAlign: 'center'
  }
})

export default Title
