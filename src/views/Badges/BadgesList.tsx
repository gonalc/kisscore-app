import type { IUserWithBadges } from '@_types/users'
import { UserContext } from '@contexts/userContext'
import useFetchBadges from '@hooks/badges/fetchBadges'
import useGetSingleUser from '@hooks/users/getSingleUser'
import { useContext, type FC } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import i18n from '@i18n/index'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import COLORS from '@utils/colors'
import Loader from '@components/Loader'
import type { AchievedBadgeModalProps } from '.'
import Badge from './Badge'

interface BadgesListProps {
  setInfoModal: (group: string) => void
  setAchievedBadgeMoal: (badge: AchievedBadgeModalProps) => void
}

const BadgesList: FC<BadgesListProps> = ({ setInfoModal, setAchievedBadgeMoal }) => {
  const { localUser } = useContext(UserContext)

  const { badges, loading } = useFetchBadges()
  const { user, loading: userLoading } = useGetSingleUser<IUserWithBadges>(localUser?.id, {
    include: 'badges'
  })
  const userBadgesIds = user?.badges?.map((badge) => badge.id) || []

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
            const { name, id } = badge

            const achieved = userBadgesIds.includes(id)

            let onPress = () => null
            if (achieved) {
              onPress = () => setAchievedBadgeMoal({ badge, group: 'share-app' })
            }

            return (
              <TouchableOpacity
                //   The group like this is provisional
                onPress={onPress}
                key={`badge-${name}_${id}`}
                style={styles.badgeGroup}
              >
                <Badge badge={badge} achieved={achieved} />

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
