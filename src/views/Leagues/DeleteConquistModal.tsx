import { IConquist } from '@_types/conquists'
import Button from '@components/Button'
import i18n from '@i18n/index'
import { FC } from 'react'
import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import modalContainer from '@styles/modalContainer'
import NegativeButton from '@components/NegativeButton'
import ConquistDisplay from './ConquistDisplay'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'

export interface DeleteConquistModalProps {
  item: IConquist | null
  close: () => void
}

const DeleteConquistModal: FC<DeleteConquistModalProps> = ({ item, close }) => {
  if (!item) {
    return null
  }

  return (
    <Modal isVisible={!!item} onBackdropPress={close}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>{i18n.t('conquists.deleteConfirmation')}</Text>

        <ConquistDisplay item={item} />

        <View style={styles.row}>
          <NegativeButton label={i18n.t('actions.exit')} onPress={close} />
          <Button label={i18n.t('actions.delete')} onPress={close} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    ...modalContainer
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10
  },
  title: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    textAlign: 'center',
    paddingBottom: 10
  }
})

export default DeleteConquistModal
