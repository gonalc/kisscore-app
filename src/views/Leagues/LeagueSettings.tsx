import { type FC, ReactNode, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Ionicons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { FONT_SIZE, LARGE_FONT, NunitoSans, NunitoSansBold } from '@utils/fonts'
import COLORS from '@utils/colors'
import Modal from 'react-native-modal'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring
} from 'react-native-reanimated'
import InviteForm from './InviteForm'
import i18n from '@i18n/index'
import { onShareAppLink } from '@utils/share'

type TMenuItem = {
  label: string
  icon: ReactNode
  onPress: () => void
  animatedStyles: Record<string, unknown>
}

interface ILeagueSettingsProps {
  leagueId: number
}

const DURATION = 300

const LeagueSettings: FC<ILeagueSettingsProps> = ({ leagueId }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [invitingUser, setInvitingUser] = useState(false)

  const itemsOpacity = useSharedValue(1)
  const inviteOffset = useSharedValue(0)

  const inviteFormOffset = useSharedValue(0)
  const inviteFormOpacity = useSharedValue(0)

  const animatedOpacityStyles = useAnimatedStyle(() => {
    return {
      opacity: itemsOpacity.value
    }
  })

  const animatedInviteStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: inviteOffset.value }]
    }
  })

  const inviteFormStyles = useAnimatedStyle(() => {
    return {
      opacity: inviteFormOpacity.value,
      transform: [{ translateY: inviteFormOffset.value }]
    }
  })

  const resetAnimations = () => {
    itemsOpacity.value = withSpring(1)
    inviteOffset.value = withSpring(0)

    inviteFormOffset.value = withSpring(0)
    inviteFormOpacity.value = withSpring(0)
  }

  const closeMenu = () => {
    resetAnimations()

    setShowMenu(false)
  }

  const startInviting = () => {
    itemsOpacity.value = withSpring(0)
    inviteOffset.value = withDelay(DURATION, withSpring(-50))

    inviteFormOffset.value = withDelay(DURATION * 1.5, withSpring(-50))
    inviteFormOpacity.value = withDelay(DURATION * 1.5, withSpring(1))

    setInvitingUser(true)
  }

  const finishInviting = () => {
    resetAnimations()

    setInvitingUser(false)
  }

  const menuItems: TMenuItem[] = [
    {
      label: 'shareLink',
      icon: <FontAwesome name="share-alt" size={LARGE_FONT} color={COLORS.black} />,
      onPress: onShareAppLink,
      animatedStyles: animatedOpacityStyles
    },
    {
      label: 'invitePlayer',
      icon: <FontAwesome5 name="user-plus" size={LARGE_FONT} color={COLORS.black} />,
      onPress: startInviting,
      animatedStyles: animatedInviteStyles
    }
  ]

  return (
    <>
      <Pressable style={styles.buttonContainer} onPress={() => setShowMenu(true)}>
        <Ionicons name="settings-sharp" size={LARGE_FONT} color={COLORS.black} />
      </Pressable>

      <Modal isVisible={showMenu} onBackdropPress={closeMenu}>
        <View style={styles.settingsContainer}>
          <Text style={styles.settingsTitle}>{i18n.t('labels.options')}</Text>

          <View>
            {menuItems.map((menuItem) => {
              const { icon, label, onPress, animatedStyles } = menuItem

              return (
                <Animated.View key={`league-settings_menu-item_${label}`} style={animatedStyles}>
                  <Pressable style={styles.settingsItem} onPress={onPress}>
                    {icon}
                    <Text style={styles.settingsItemText}>
                      {i18n.t(`leagues.settings.${label}`)}
                    </Text>
                  </Pressable>
                </Animated.View>
              )
            })}
            <Animated.View style={inviteFormStyles}>
              {invitingUser && <InviteForm onCancel={finishInviting} leagueId={leagueId} />}
            </Animated.View>
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
    alignItems: 'center',
    marginVertical: 10
  },
  settingsItemText: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    color: COLORS.black
  }
})

export default LeagueSettings
