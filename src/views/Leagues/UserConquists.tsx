import { FlatList, StyleSheet, Text, View } from 'react-native'
import COLORS from '@utils/colors'
import { IConquist } from '@_types/conquists'
import { type FC } from 'react'
import { getCountry, getCountryName } from '@utils/countries'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'
import i18n from '@i18n/index'
import Hexagon from '@components/Hexagon'
import { sortByField } from '@utils/sorter'

interface IUserConquistsProps {
  conquists: IConquist[]
}

const UserConquists: FC<IUserConquistsProps> = ({ conquists = [] }) => {
  const renderContent = () => {
    if (conquists?.length) {
      return (
        <FlatList
          data={conquists.sort(sortByField('score'))}
          renderItem={({ item }) => {
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
                    <Ionicons
                      name="ios-location-sharp"
                      size={FONT_SIZE.labels}
                      color={COLORS.black}
                    />
                    <Text style={styles.flag}>{`${place.flag}`}</Text>
                  </View>
                  <Text style={styles.countryName}>{getCountryName(place.name)}</Text>
                </View>
              </View>
            )
          }}
          keyExtractor={(item) => `user-conquist_${item.id}_${item.userId}`}
          ListFooterComponent={View}
          ListFooterComponentStyle={{ padding: 20 }}
        />
      )
    }

    return (
      <View>
        <Text style={styles.noConquistsText}>{i18n.t('conquists.noConquists')}</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.grayText, styles.title]}>{i18n.t('labels.conquists')}</Text>
      <View>{renderContent()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 5,
    marginBottom: 40,
    overflow: 'hidden'
  },
  conquistWrapper: {
    padding: 5,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    marginVertical: 5,
    flexDirection: 'row',
    gap: 10
  },
  scoreContainer: {
    backgroundColor: COLORS.blue,
    padding: 5,
    borderRadius: 3,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  scoreText: {
    fontFamily: NunitoSans,
    color: COLORS.white,
    fontSize: FONT_SIZE.body,
    textAlign: 'center'
  },
  flag: {
    fontSize: FONT_SIZE.body
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
  countryName: {
    fontFamily: NunitoSans,
    color: COLORS.black,
    fontSize: FONT_SIZE.body,
    textAlign: 'center'
  },
  noConquistsText: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    color: COLORS.black,
    textAlign: 'center'
  },
  text: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    color: COLORS.black
  },
  grayText: {
    color: COLORS.gray
  },
  title: {
    textAlign: 'center'
  }
})

export default UserConquists
