import Loader from '@components/Loader'
import useFetchBadges from '@hooks/badges/fetchBadges'
import { StyleSheet, Text, View } from 'react-native'
import * as Icons from '@expo/vector-icons'
import Hexagon from '@components/Hexagon'
import COLORS from '@utils/colors'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import i18n from '@i18n/index'

const Badges = () => {
  const { badges, loading } = useFetchBadges()

  return (
    <Loader isLoading={loading}>
      <View style={styles.container}>
        <Text>Difunde la palabra</Text>
        <View style={styles.badgesContainer}>
          {badges.map((badge) => {
            const { name, id, iconFamily, iconKey } = badge

            const Icon = Icons[iconFamily]

            return (
              <View key={`badge-${name}_${id}`} style={styles.badgeGroup}>
                <Hexagon>
                  <Icon name={iconKey} size={FONT_SIZE.badge} color={COLORS.gray} />
                </Hexagon>

                <Text style={styles.badgeName}>{i18n.t(`badges.name.${name}`)}</Text>
              </View>
            )
          })}
        </View>
      </View>
    </Loader>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  badgeGroup: {
    alignItems: 'center'
  },
  badgeName: {
    color: COLORS.gray,
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body
  }
})

export default Badges
