import { type FC, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import COLORS from '@utils/colors'
import { FONT_SIZE, LARGE_FONT, NunitoSans, TINY_FONT } from '@utils/fonts'
import type { IUserWithConquists } from '@_types/users'
import UserConquists from './UserConquists'
import Modal from 'react-native-modal'
import Button from '@components/Button'
import { displayNumber } from '@utils/numbers'
import i18n from '@i18n/index'
import Hexagon from '@components/Hexagon'
import UserCountries from './UserCountries'
import UserPlaces from './UserPlaces'

interface IJumbotronProps {
  user: IUserWithConquists
  refetchUser: () => void
}

type ModalType = 'conquists' | 'countries' | 'places'

const Jumbotron: FC<IJumbotronProps> = ({ user, refetchUser }) => {
  const { countries = [], places = [], conquists = [] } = user || {}

  const [modalToShow, setModalToShow] = useState<ModalType | null>(null)

  const getModalComponent = () => {
    switch (modalToShow) {
      case 'conquists':
        return <UserConquists conquists={conquists} refetchUser={refetchUser} />
      case 'countries':
        return <UserCountries conquists={conquists} />
      case 'places':
        return <UserPlaces conquists={conquists} />
    }
  }

  if (!user) {
    return null
  }

  const { name, score } = user

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.greetings}>{i18n.t('greetings', { name })}</Text>

        <View style={styles.hexagonsWrapper}>
          <Hexagon backgroundColor="blue" size={100}>
            <>
              <Text style={[styles.numbersText, styles.whiteText]}>{displayNumber(score)}</Text>
              <Text style={[styles.labelsText, styles.whiteText]}>{i18n.t('labels.score')}</Text>
            </>
          </Hexagon>

          <TouchableOpacity onPress={() => setModalToShow('countries')}>
            <Hexagon>
              <View style={styles.innerBox}>
                <Text style={styles.numbersText}>{countries.length}</Text>
                <Text style={styles.labelsText}>{i18n.t('labels.countries')}</Text>
              </View>
            </Hexagon>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalToShow('places')}>
            <Hexagon>
              <View style={styles.innerBox}>
                <Text style={styles.numbersText}>{places.length}</Text>
                <Text style={styles.labelsText}>{i18n.t('labels.places')}</Text>
              </View>
            </Hexagon>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setModalToShow('conquists')}>
            <Hexagon>
              <View style={styles.innerBox}>
                <Text style={styles.numbersText}>{conquists.length}</Text>
                <Text style={[styles.labelsText, { fontSize: TINY_FONT }]}>
                  {i18n.t('labels.conquists')}
                </Text>
              </View>
            </Hexagon>
          </TouchableOpacity>
        </View>
      </View>

      <Modal isVisible={!!modalToShow} onBackButtonPress={() => setModalToShow(null)}>
        <View style={{ height: '80%' }}>{getModalComponent()}</View>

        <View style={styles.closeConquistsButtonWrapper}>
          <Button label={i18n.t('actions.exit')} onPress={() => setModalToShow(null)} />
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
  hexagonsWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10
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
