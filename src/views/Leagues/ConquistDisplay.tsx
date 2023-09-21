import Hexagon from '@components/Hexagon'
import type { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import { IConquist } from '@_types/conquists'
import { getCountry, getCountryName } from '@utils/countries'
import COLORS from '@utils/colors'

export interface ConquistDisplayProps {
  item: IConquist
}

const ConquistDisplay: FC<ConquistDisplayProps> = ({ item }) => {
  const { country: countryCode, place: placeCode, score } = item
  const country = getCountry(countryCode)
  const place = getCountry(placeCode)

  return (
    <View style={styles.conquistWrapper}>
      <Hexagon size={40} backgroundColor="blue">
        <Text style={styles.scoreText}>{score}</Text>
      </Hexagon>
      <View style={styles.groupWrapper}>
        <View style={styles.iconsContainer}>
          <FontAwesome5 name="user-tag" size={FONT_SIZE.labels} color={COLORS.black} />
          <Text style={styles.flag}>{`${country.flag}`}</Text>
        </View>
        <Text style={styles.countryName}>{getCountryName(country.name)}</Text>
      </View>

      <View style={styles.groupWrapper}>
        <View style={styles.iconsContainer}>
          <Ionicons name="ios-location-sharp" size={FONT_SIZE.labels} color={COLORS.black} />
          <Text style={styles.flag}>{`${place.flag}`}</Text>
        </View>
        <Text style={styles.countryName}>{getCountryName(place.name)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  conquistWrapper: {
    padding: 5,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  scoreText: {
    fontFamily: NunitoSans,
    color: COLORS.white,
    fontSize: FONT_SIZE.body,
    textAlign: 'center'
  },
  groupWrapper: {
    flexGrow: 1,
    alignItems: 'center',
    maxWidth: '40%'
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    gap: 10
  },
  flag: {
    fontSize: FONT_SIZE.body
  },
  countryName: {
    fontFamily: NunitoSans,
    color: COLORS.black,
    fontSize: FONT_SIZE.body,
    textAlign: 'center'
  }
})

export default ConquistDisplay
