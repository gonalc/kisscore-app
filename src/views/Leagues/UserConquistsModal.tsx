import type { IUserWithConquists } from '@_types/users'
import Loader from '@components/Loader'
import useGetSingleUser from '@hooks/users/getSingleUser'
import { type FC } from 'react'
import { StyleSheet, View } from 'react-native'
import Modal from 'react-native-modal'
import UserConquists from './UserConquists'
import Button from '@components/Button'
import i18n from '@i18n/index'

interface IUserConquistsModalProps {
  isVisible: boolean
  onClose: () => void
  playerId: number
}

const UserConquistsModal: FC<IUserConquistsModalProps> = ({ isVisible, onClose, playerId }) => {
  const {
    loading,
    user,
    fetch: fetchUser
  } = useGetSingleUser<IUserWithConquists>(playerId, {
    include: 'conquists'
  })

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <Loader isLoading={loading}>
        <View style={styles.conquistsWrapper}>
          <UserConquists conquists={user?.conquists} refetchUser={fetchUser} />
        </View>

        <View style={styles.buttonWrapper}>
          <Button label={i18n.t('actions.exit')} onPress={onClose} />
        </View>
      </Loader>
    </Modal>
  )
}

const styles = StyleSheet.create({
  conquistsWrapper: {
    maxHeight: '80%'
  },
  buttonWrapper: {
    padding: 10
  }
})

export default UserConquistsModal
