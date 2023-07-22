import { StyleSheet, Text, View } from 'react-native'
import COLORS from '@utils/colors'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'

const Ranking = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Aquí verás tu posición respecto al resto de tus amigos, independientemente de si compartís
        liga o no.
      </Text>

      <Text style={styles.text}>Esta funcionalidad está en desarrollo.</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20
  },
  text: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    textAlign: 'center',
    marginBottom: 20
  }
})

export default Ranking
