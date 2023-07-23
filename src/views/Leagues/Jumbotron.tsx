import { FC, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import COLORS from '@utils/colors'
import boxShadow from '@styles/boxShadow'
import { FONT_SIZE, LARGE_FONT, NunitoSans } from '@utils/fonts'
import { getCountry } from '@utils/countries'
import type { IUserWithConquists } from '@_types/users'
import UserConquists from './UserConquists'
import Modal from 'react-native-modal'
import Button from '@components/Button'
import { displayNumber } from '@utils/numbers'
import i18n from '@i18n/index'

interface IJumbotronProps {
  user: IUserWithConquists
}

const Jumbotron: FC<IJumbotronProps> = ({ user }) => {
  const { countries = [], places = [], conquists = [] } = user || {}

  const [showConquists, setShowConquists] = useState(false)

  const getFlags = (countryCodes: string[], key: string) => {
    return countryCodes
      .map((countryCode) => {
        const country = getCountry(countryCode)

        if (country) {
          return (
            <Text key={`country-flag-jumbotron_${countryCode}_${key}`} style={styles.flag}>
              {country.flag}
            </Text>
          )
        }
      })
      .filter(Boolean)
      .slice(0, 3)
  }

  if (!user) {
    return null
  }

  const { name, score } = user

  const countriesFlags = getFlags(countries, 'countries')
  const placesFlags = getFlags(places, 'places')

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.greetings}>{i18n.t('greetings', { name })}</Text>

        <TouchableOpacity style={styles.card} onPress={() => setShowConquists(true)}>
          <View style={styles.scoreContainer}>
            <Text style={[styles.numbersText, styles.whiteText]}>{displayNumber(score)}</Text>
            <Text style={[styles.labelsText, styles.whiteText]}>{i18n.t('labels.score')}</Text>
          </View>

          <View style={styles.outerBox}>
            <View style={styles.innerBox}>
              <Text style={styles.numbersText}>{countries.length}</Text>
              <Text style={styles.labelsText}>{i18n.t('labels.countries')}</Text>
            </View>
            <View style={styles.flagsContainer}>{countriesFlags}</View>
          </View>

          <View style={styles.outerBox}>
            <View style={styles.innerBox}>
              <Text style={styles.numbersText}>{places.length}</Text>
              <Text style={styles.labelsText}>{i18n.t('labels.places')}</Text>
            </View>
            <View style={styles.flagsContainer}>{placesFlags}</View>
          </View>
        </TouchableOpacity>
      </View>

      <Modal isVisible={showConquists} onBackButtonPress={() => setShowConquists(false)}>
        <View style={{ height: '80%' }}>
          <UserConquists conquists={conquists} />
        </View>

        <View style={styles.closeConquistsButtonWrapper}>
          <Button label={i18n.t('actions.exit')} onPress={() => setShowConquists(false)} />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  greetings: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    color: COLORS.black,
    marginBottom: 5,
    paddingLeft: 2
  },
  card: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.background,
    borderRadius: 5,
    ...boxShadow
  },
  outerBox: {
    marginHorizontal: 10
  },
  innerBox: {
    alignItems: 'center'
  },
  scoreContainer: {
    backgroundColor: COLORS.blue,
    borderRadius: 4,
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  numbersText: {
    fontFamily: NunitoSans,
    fontSize: LARGE_FONT,
    marginBottom: -5
  },
  labelsText: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.labels,
    textTransform: 'lowercase'
  },
  whiteText: {
    color: COLORS.white
  },
  flagsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  flag: {
    marginBottom: -3,
    fontSize: FONT_SIZE.body
  },
  closeConquistsButtonWrapper: {
    padding: 10
  }
})

export default Jumbotron
