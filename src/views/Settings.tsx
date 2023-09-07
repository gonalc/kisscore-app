import { Pressable, StyleSheet, Text, View } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import COLORS from '@utils/colors'
import { FONT_SIZE, NORMAL_FONT, NunitoSans } from '@utils/fonts'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import { type ReactNode, useContext, useState } from 'react'
import LanguageController from '@components/LanguageController'
import { UserContext } from '@contexts/userContext'
import i18n from '@i18n/index'
import { onShareAppLink } from '@utils/share'
import Constants from 'expo-constants'
import CreateLeagueModal from './Leagues/CreateLeagueModal'
import LogoutModal from '@components/LogoutModal'
import ReferralCodeModal from '@components/ReferralCodeModal'

export type THomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'LeaguesScreens'>

type MenuItem = {
  icon: ReactNode
  text: string
  action: () => void
}

interface MenuItemsHash {
  [key: string]: MenuItem
}

const Settings = () => {
  const { localUser } = useContext(UserContext)

  const [logoutConfirmation, setLogoutConfirmation] = useState(false)
  const [showLanguageModal, setShowLanguageModal] = useState(false)
  const [leagueCreationModal, setLeagueCreationModal] = useState(false)
  const [referralCodeModal, setReferralCodeModal] = useState(false)

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
    referralCode: {
      icon: <Entypo name="ticket" size={NORMAL_FONT} color={COLORS.black} />,
      text: i18n.t('leagues.settings.referralCode'),
      action: () => setReferralCodeModal(true)
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

      <LogoutModal show={logoutConfirmation} close={() => setLogoutConfirmation(false)} />

      <ReferralCodeModal show={referralCodeModal} close={() => setReferralCodeModal(false)} />

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
  version: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    color: COLORS.black
  }
})

export default Settings
