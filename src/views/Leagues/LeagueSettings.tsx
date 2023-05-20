import { FC, ReactNode, useState } from 'react'
import { Pressable, Share, StyleSheet, Text, View } from 'react-native'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { FONT_SIZE, LARGE_FONT, NunitoSans, NunitoSansBold } from '../../utils/fonts'
import COLORS from '../../utils/colors'
import Modal from 'react-native-modal'
import i18n from '../../../i18n'

type TMenuItem = {
  label: string
  icon: ReactNode
  onPress: () => void
}

const LeagueSettings: FC = () => {
  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu((previous) => !previous)
  }

  const onShareInvitation = async () => {
    try {
      const result = await Share.share({
        message: 'This will be the invitation to the league'
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // console.log('Shared with activityType')
        } else {
          // console.log('Shared')
        }
      } else if (result.action === Share.dismissedAction) {
        // console.log('Action dismissed')
      }
    } catch (error) {
      alert(error)
    }
  }

  const menuItems: TMenuItem[] = [
    {
      label: 'invitePlayer',
      icon: <FontAwesome name="share-alt" size={LARGE_FONT} color={COLORS.black} />,
      onPress: onShareInvitation
    }
  ]

  return (
    <>
      <Pressable style={styles.buttonContainer} onPress={toggleMenu}>
        <Ionicons name="settings-sharp" size={LARGE_FONT} color={COLORS.black} />
      </Pressable>

      <Modal isVisible={showMenu} onBackdropPress={toggleMenu}>
        <View style={styles.settingsContainer}>
          <Text style={styles.settingsTitle}>{i18n.t('labels.options')}</Text>

          <View>
            {menuItems.map((menuItem) => {
              const { icon, label, onPress } = menuItem

              return (
                <Pressable
                  key={`league-settings_menu-item_${label}`}
                  style={styles.settingsItem}
                  onPress={onPress}
                >
                  {icon}
                  <Text style={styles.settingsItemText}>{i18n.t(`leagues.settings.${label}`)}</Text>
                </Pressable>
              )
            })}
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingVertical: 10
  },
  settingsContainer: {
    backgroundColor: COLORS.background,
    padding: 20,
    borderRadius: 5
  },
  settingsTitle: {
    fontSize: FONT_SIZE.body,
    textAlign: 'center',
    fontFamily: NunitoSansBold,
    color: COLORS.black,
    marginBottom: 10
  },
  settingsItem: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center'
  },
  settingsItemText: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    color: COLORS.black
  }
})

export default LeagueSettings
