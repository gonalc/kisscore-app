import { IConquist } from '@_types/conquists'
import Hexagon from '@components/Hexagon'
import i18n from '@i18n/index'
import COLORS from '@utils/colors'
import { getCountry, getCountryName } from '@utils/countries'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import { sortByField } from '@utils/sorter'
import { type FC } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

interface UserCountriesProps {
  conquists: IConquist[]
}

const UserCountries: FC<UserCountriesProps> = ({ conquists }) => {
  const getCountriesData = () => {
    const countriesHash: Record<string, number> = {}

    conquists.forEach((conquist) => {
      const { country } = conquist

      if (country in countriesHash) {
        countriesHash[country] += 1
      } else {
        countriesHash[country] = 1
      }
    })

    const countriesData = Object.entries(countriesHash)
      .map(([country, times]) => ({ country, times }))
      .sort(sortByField('times'))

    return countriesData
  }

  const renderContent = () => {
    if (!conquists?.length) {
      return (
        <View>
          <Text style={styles.noDataText}>{i18n.t('conquists.noConquists')}</Text>
        </View>
      )
    }

    const countries = getCountriesData()

    return (
      <FlatList
        data={countries}
        renderItem={({ item }) => {
          const { country: countryCode, times } = item

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
        keyExtractor={(item) => `country-item-modal-list_${item.country}`}
        ListFooterComponent={View}
        ListFooterComponentStyle={{ padding: 20 }}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.grayText, styles.title]}>
        {i18n.t('labels.conquestCountries')}
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

export default UserCountries
