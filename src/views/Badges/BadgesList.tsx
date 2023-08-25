import type { IUserWithBadges } from '@_types/users'
import { UserContext } from '@contexts/userContext'
import useFetchBadges from '@hooks/badges/fetchBadges'
import useGetSingleUser from '@hooks/users/getSingleUser'
import { useContext, type FC } from 'react'
import * as Icons from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import i18n from '@i18n/index'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import COLORS from '@utils/colors'
import Hexagon from '@components/Hexagon'
import Loader from '@components/Loader'

interface BadgesListProps {
  setInfoModal: (group: string) => void
}

const BadgesList: FC<BadgesListProps> = ({ setInfoModal }) => {
  const { localUser } = useContext(UserContext)

  const { badges, loading } = useFetchBadges()
  const { user, loading: userLoading } = useGetSingleUser<IUserWithBadges>(localUser.id, {
    include: 'badges'
  })
  const userBadgesIds = user?.badges?.map((badge) => badge.id) || []

  const { Ionicons } = Icons

  return (
    <Loader isLoading={loading || userLoading}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setInfoModal('share-app')}>
          <Text style={styles.groupLabel}>
            {i18n.t('badges.groups.share-app')}{' '}
            <Ionicons name="information-circle-outline" size={FONT_SIZE.body} color={COLORS.blue} />
          </Text>
        </TouchableOpacity>
        <View style={styles.badgesContainer}>
          {badges.map((badge) => {
            const { name, id, iconFamily, iconKey, color } = badge

            const Icon = Icons[iconFamily]

            const achieved = userBadgesIds.includes(id)

            const badgeColor = achieved ? color : undefined
            const iconColor = achieved ? COLORS.white : COLORS.gray

            return (
              <TouchableOpacity
                onPress={() => alert('Hola!!')}
                key={`badge-${name}_${id}`}
                style={styles.badgeGroup}
              >
                <Hexagon backgroundColor={badgeColor}>
                  <Icon name={iconKey} size={FONT_SIZE.badge} color={iconColor} />
                </Hexagon>

                <Text style={styles.badgeName}>{i18n.t(`badges.name.${name}`)}</Text>
              </TouchableOpacity>
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
  groupLabel: {
    color: COLORS.black,
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10
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

export default BadgesList
