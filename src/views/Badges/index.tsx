import Loader from '@components/Loader'
import useFetchBadges from '@hooks/badges/fetchBadges'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import * as Icons from '@expo/vector-icons'
import Hexagon from '@components/Hexagon'
import COLORS from '@utils/colors'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import i18n from '@i18n/index'
import Modal from 'react-native-modal'
import { useContext, useState } from 'react'
import Button from '@components/Button'
import modalContainer from '@styles/modalContainer'
import useGetSingleUser from '@hooks/users/getSingleUser'
import { UserContext } from '@contexts/userContext'
import type { IUserWithBadges } from '@_types/users'

const Badges = () => {
  const { localUser } = useContext(UserContext)

  const { badges, loading } = useFetchBadges()
  const { user, loading: userLoading } = useGetSingleUser<IUserWithBadges>(localUser.id, {
    include: 'badges'
  })
  const userBadgesIds = user?.badges?.map((badge) => badge.id) || []

  const [infoModal, setInfoModal] = useState<string | null>(null)

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

      <Modal isVisible={!!infoModal} onBackdropPress={() => setInfoModal(null)}>
        <View style={styles.modalContainer}>
          <Text style={styles.groupLabel}>{i18n.t(`badges.explanations.${infoModal}`)}</Text>

          <Button label={i18n.t('actions.exit')} onPress={() => setInfoModal(null)} />
        </View>
      </Modal>
    </Loader>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10
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
  },
  groupLabel: {
    color: COLORS.black,
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body
  },
  modalContainer
})

export default Badges
