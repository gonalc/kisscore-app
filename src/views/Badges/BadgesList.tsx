import type { IUserWithBadges } from '@_types/users'
import { UserContext } from '@contexts/userContext'
import useFetchBadges from '@hooks/badges/fetchBadges'
import useGetSingleUser from '@hooks/users/getSingleUser'
import { useContext, type FC } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import i18n from '@i18n/index'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import COLORS from '@utils/colors'
import Loader from '@components/Loader'
import type { AchievedBadgeModalProps } from '.'
import Badge from './Badge'
import { badgesOrderGroups, groupBadges } from '@utils/badges'

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

  const groupedBadges = groupBadges(badges)

  return (
    <Loader isLoading={loading || userLoading}>
      <ScrollView style={styles.container}>
        {badgesOrderGroups.map((groupKey) => {
          const badgesList = groupedBadges[groupKey]

          if (!badgesList?.length) {
            return null
          }

          return (
            <View key={`group-badges_${groupKey}`} style={styles.badgeGroupContainer}>
              <TouchableOpacity onPress={() => setInfoModal(groupKey)}>
                <Text style={styles.groupLabel}>
                  {i18n.t(`badges.groups.${groupKey}`)}{' '}
                  <Ionicons
                    name="information-circle-outline"
                    size={FONT_SIZE.body}
                    color={COLORS.blue}
                  />
                </Text>
              </TouchableOpacity>
              <View style={styles.badgesContainer}>
                {badgesList.map((badge) => {
                  const { name, id } = badge

                  const achieved = userBadgesIds.includes(id)

                  let onPress = () => null
                  if (achieved) {
                    onPress = () => setAchievedBadgeMoal({ badge, group: groupKey })
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
          )
        })}
      </ScrollView>
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
    paddingVertical: 10,
    flexWrap: 'wrap'
  },
  badgeGroupContainer: {
    marginBottom: 20
  },
  badgeGroup: {
    alignItems: 'center',
    flexBasis: '30%',
    marginVertical: 10
  },
  badgeName: {
    color: COLORS.gray,
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.labels,
    textAlign: 'center'
  }
})

export default BadgesList
