import { UserContext } from '@contexts/userContext'
import useUpdateUser from '@hooks/users/updateUser'
import i18n from '@i18n/index'
import { useNavigation } from '@react-navigation/native'
import COLORS from '@utils/colors'
import { FONT_SIZE, NunitoSans, NunitoSansBold } from '@utils/fonts'
import { clearAsyncStorage } from '@utils/storage'
import type { THomeScreenProp } from '@views/Settings'
import { type FC, useContext } from 'react'
import { StyleSheet, View, Text, Pressable } from 'react-native'
import Modal from 'react-native-modal'

interface LogoutModalProps {
  show: boolean
  close: () => void
}

const LogoutModal: FC<LogoutModalProps> = ({ show, close }) => {
  const navigation = useNavigation<THomeScreenProp>()
  const { localUser, setLocalUser } = useContext(UserContext)
  const { update: updateUser } = useUpdateUser()

  const logout = async () => {
    await updateUser(localUser.id, { fcmToken: null })
    setLocalUser(null)
    await clearAsyncStorage()

    navigation.navigate('Login')
  }

  return (
    <Modal isVisible={show} onBackdropPress={close}>
      <View style={styles.modalBody}>
        <Text style={[styles.itemText, styles.centered, styles.bold]}>
          {i18n.t('logoutConfirmation')}
        </Text>

        <View style={styles.buttonsRow}>
          <Pressable style={styles.modalButton} onPress={close}>
            <Text style={styles.itemText}>{i18n.t('actions.cancel')}</Text>
          </Pressable>
          <Pressable style={styles.modalButton} onPress={logout}>
            <Text style={styles.itemText}>{i18n.t('actions.logout')}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  itemText: {
    color: COLORS.black,
    fontSize: FONT_SIZE.body,
    fontFamily: NunitoSans
  },
  modalBody: {
    borderRadius: 5,
    backgroundColor: COLORS.background,
    padding: 10
  },
  centered: {
    textAlign: 'center'
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  bold: {
    fontFamily: NunitoSansBold
  }
})

export default LogoutModal
