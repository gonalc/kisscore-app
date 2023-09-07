import AsyncStorage from '@react-native-async-storage/async-storage'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import COLORS from '@utils/colors'
import { FONT_SIZE, NORMAL_FONT, NunitoSans, NunitoSansBold } from '@utils/fonts'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import { type ReactNode, useContext, useState } from 'react'
import Modal from 'react-native-modal'
import LanguageController from '@components/LanguageController'
import { UserContext } from '@contexts/userContext'
import i18n from '@i18n/index'
import { onShareAppLink } from '@utils/share'
import Constants from 'expo-constants'
import useUpdateUser from '@hooks/users/updateUser'
import CreateLeagueModal from './Leagues/CreateLeagueModal'

type THomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'LeaguesScreens'>

type MenuItem = {
  icon: ReactNode
  text: string
  action: () => void
}

interface MenuItemsHash {
  [key: string]: MenuItem
}

const Settings = () => {
  const navigation = useNavigation<THomeScreenProp>()
  const { localUser, setLocalUser } = useContext(UserContext)
  const { update: updateUser } = useUpdateUser()

  const [logoutConfirmation, setLogoutConfirmation] = useState(false)
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [leagueCreationModal, setLeagueCreationModal] = useState(false)

  const logout = async () => {
    await updateUser(localUser.id, { fcmToken: null })
    setLocalUser(null)
    await AsyncStorage.clear()

    navigation.navigate('Login')
  }

  const menuItems: MenuItemsHash = {
    // language: {
    //   icon: <Ionicons name="language" size={NORMAL_FONT} color={COLORS.black} />,
    //   text: i18n.t('settings.changeLanguage'),
    //   action: () => setShowLanguageModal(true)
    // },
    createLeague: {
      icon: <Ionicons name="trophy" size={NORMAL_FONT} color={COLORS.black} />,
      text: i18n.t('leagues.createLeague'),
      action: () => setLeagueCreationModal(true)
    },
    shareAppLink: {
      icon: <Entypo name="share" size={NORMAL_FONT} color={COLORS.black} />,
      text: i18n.t('leagues.settings.shareLink'),
      action: () => onShareAppLink(localUser?.username)
    },
    logout: {
      icon: <AntDesign name="logout" size={NORMAL_FONT} color={COLORS.black} />,
      text: i18n.t('actions.logout'),
      action: () => setLogoutConfirmation(true)
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{i18n.t('settings.title')}</Text>

        {Object.entries(menuItems).map(([itemKey, menuItem]) => {
          const { icon, action, text } = menuItem

          return (
            <Pressable style={styles.menuItem} onPress={action} key={itemKey}>
              {icon}
              <Text style={styles.itemText}>{text}</Text>
            </Pressable>
          )
        })}
      </View>

      <View>
        <Text style={styles.version}>v{Constants.manifest?.version}</Text>
      </View>

      <Modal isVisible={logoutConfirmation} onBackdropPress={() => setLogoutConfirmation(false)}>
        <View style={styles.modalBody}>
          <Text style={[styles.itemText, styles.centered, styles.bold]}>
            {i18n.t('logoutConfirmation')}
          </Text>

          <View style={styles.buttonsRow}>
            <Pressable style={styles.modalButton} onPress={() => setLogoutConfirmation(false)}>
              <Text style={styles.itemText}>{i18n.t('actions.cancel')}</Text>
            </Pressable>
            <Pressable style={styles.modalButton} onPress={logout}>
              <Text style={styles.itemText}>{i18n.t('actions.logout')}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <LanguageController
        isVisible={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
      />

      <CreateLeagueModal
        isVisible={leagueCreationModal}
        close={() => setLeagueCreationModal(false)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.header,
    color: COLORS.black,
    marginBottom: 10
  },
  menuItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingVertical: 10
  },
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
  },
  version: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    color: COLORS.black
  }
})

export default Settings
