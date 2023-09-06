import type { IConquist } from '@_types/conquists'
import Hexagon from '@components/Hexagon'
import i18n from '@i18n/index'
import COLORS from '@utils/colors'
import { getCountry, getCountryName } from '@utils/countries'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import { sortByField } from '@utils/sorter'
import { FC } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

interface UserPlacesProps {
  conquists: IConquist[]
}

const UserPlaces: FC<UserPlacesProps> = ({ conquists }) => {
  const getPlacesData = () => {
    const placesHash: Record<string, number> = {}

    conquists.forEach((conquist) => {
      const { place } = conquist

      if (place in placesHash) {
        placesHash[place] += 1
      } else {
        placesHash[place] = 1
      }
    })

    const placesData = Object.entries(placesHash)
      .map(([place, times]) => ({ place, times }))
      .sort(sortByField('times'))

    return placesData
  }

  const renderContent = () => {
    if (!conquists?.length) {
      return (
        <View>
          <Text style={styles.noDataText}>{i18n.t('conquists.noConquists')}</Text>
        </View>
      )
    }

    const countries = getPlacesData()

    return (
      <FlatList
        data={countries}
        renderItem={({ item }) => {
          const { place: countryCode, times } = item

          const country = getCountry(countryCode)

          const { flag, name: names } = country
          const name = getCountryName(names)

          return (
            <View style={styles.countryItem}>
              <Hexagon size={40} backgroundColor="lightGray">
                <Text style={styles.text}>{flag}</Text>
              </Hexagon>
              <Text style={styles.text}>{name}</Text>
              <Text style={[styles.text, styles.grayText]}>{`x${times}`}</Text>
            </View>
          )
        }}
        keyExtractor={(item) => `country-item-modal-list_${item.place}`}
        ListFooterComponent={View}
        ListFooterComponentStyle={{ padding: 20 }}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.grayText, styles.title]}>
        {i18n.t('labels.visitedPlaces')}
      </Text>
      <View>{renderContent()}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 40
  },
  noDataText: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    color: COLORS.black,
    textAlign: 'center'
  },
  countryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: COLORS.white,
    borderRadius: 5
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
    textAlign: 'center',
    paddingBottom: 5
  }
})

export default UserPlaces
