import Button from '@components/Button'
import i18n from '@i18n/index'
import modalContainer from '@styles/modalContainer'
import COLORS from '@utils/colors'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import type { FC } from 'react'
import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import type { AchievedBadgeModalProps } from '.'
import Badge from './Badge'

interface AchievedBadgeProps {
  close: () => void
  isVisible: boolean
  badgeData?: AchievedBadgeModalProps
}

const BADGE_SIZE = 200

const AchievedBadgeModal: FC<AchievedBadgeProps> = ({ close, isVisible, badgeData }) => {
  const { badge, group } = badgeData || {}
  const { name } = badge || {}

  return (
    <Modal isVisible={isVisible} onBackdropPress={close}>
      <View style={styles.modalContainer}>
        {group && <Text style={styles.title}>{i18n.t(`badges.groups.${group}`)}</Text>}

        {badge && (
          <>
            <Badge badge={badge} achieved size={BADGE_SIZE} />

            <Text style={styles.celebration}>{i18n.t(`badges.celebrations.${name}`)}</Text>
          </>
        )}

        <Button label={i18n.t('actions.exit')} onPress={close} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    ...modalContainer,
    alignItems: 'center',
    gap: 20
  },
  title: {
    color: COLORS.black,
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.header
  },
  celebration: {
    color: COLORS.black,
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    textAlign: 'center'
  }
})

export default AchievedBadgeModal
