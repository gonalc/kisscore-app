import Button from '@components/Button'
import i18n from '@i18n/index'
import modalContainer from '@styles/modalContainer'
import COLORS from '@utils/colors'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import type { FC } from 'react'
import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import Modal from 'react-native-modal'

interface InfoModalProps {
  close: () => void
  isVisible: boolean
  text?: string
}

const InfoModal: FC<InfoModalProps> = ({ close, isVisible, text }) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={close}>
      <View style={styles.modalContainer}>
        {text && <Text style={styles.text}>{i18n.t(`badges.explanations.${text}`)}</Text>}

        <Button label={i18n.t('actions.exit')} onPress={close} />
      </View>
    </Modal>
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

export default InfoModal
