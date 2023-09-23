import { IConquist } from '@_types/conquists'
import Button from '@components/Button'
import i18n from '@i18n/index'
import { FC, useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { View } from 'react-native'
import Modal from 'react-native-modal'
import modalContainer from '@styles/modalContainer'
import NegativeButton from '@components/NegativeButton'
import ConquistDisplay from './ConquistDisplay'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import useDeleteConquist from '@hooks/conquists/deleteConquist'
import Loader from '@components/Loader'
import { QueryStatus } from '@_types/index'
import COLORS from '@utils/colors'

export interface DeleteConquistModalProps {
  item: IConquist | null
  close: () => void
  refetchUser: () => void
}

const DeleteConquistModal: FC<DeleteConquistModalProps> = ({ item, close, refetchUser }) => {
  const { destroy } = useDeleteConquist()
  const [status, setStatus] = useState<QueryStatus>(QueryStatus.resting)

  const onClose = () => {
    setStatus(QueryStatus.resting)
    close()
  }

  const deleteConquist = async () => {
    setStatus(QueryStatus.pending)
    const destroyStatus = await destroy(item.id)

    if (destroyStatus === QueryStatus.success) {
      refetchUser()
      close()
    } else {
      setStatus(destroyStatus)
    }
  }

  if (!item) {
    return null
  }

  return (
    <Modal isVisible={!!item} onBackdropPress={onClose}>
      <Loader isLoading={status === QueryStatus.pending}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{i18n.t('conquists.deleteConfirmation')}</Text>

          <ConquistDisplay item={item} />

          {status === QueryStatus.error && (
            <Text style={[styles.title, styles.errorColor]}>
              {i18n.t('forms.errors.genericError')}
            </Text>
          )}

          <View style={styles.row}>
            <NegativeButton label={i18n.t('actions.exit')} onPress={onClose} />
            <Button label={i18n.t('actions.delete')} onPress={deleteConquist} />
          </View>
        </View>
      </Loader>
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
  },
  errorColor: {
    color: COLORS.red
  }
})

export default DeleteConquistModal
