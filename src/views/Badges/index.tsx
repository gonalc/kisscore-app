import { StyleSheet, Text, View } from 'react-native'
import COLORS from '@utils/colors'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import i18n from '@i18n/index'
import Modal from 'react-native-modal'
import { useState } from 'react'
import Button from '@components/Button'
import modalContainer from '@styles/modalContainer'
import BadgesList from './BadgesList'

const Badges = () => {
  const [infoModal, setInfoModal] = useState<string | null>(null)

  return (
    <>
      <BadgesList setInfoModal={setInfoModal} />

      <Modal isVisible={!!infoModal} onBackdropPress={() => setInfoModal(null)}>
        <View style={styles.modalContainer}>
          <Text style={styles.text}>{i18n.t(`badges.explanations.${infoModal}`)}</Text>

          <Button label={i18n.t('actions.exit')} onPress={() => setInfoModal(null)} />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  modalContainer,
  text: {
    color: COLORS.black,
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body
  }
})

export default Badges
