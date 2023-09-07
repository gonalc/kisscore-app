import { UserContext } from '@contexts/userContext'
import i18n from '@i18n/index'
import COLORS from '@utils/colors'
import { FC, useContext } from 'react'
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native'
import Modal from 'react-native-modal'
import NegativeButton from './NegativeButton'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { FONT_SIZE, NORMAL_FONT, NunitoSans } from '@utils/fonts'
import boxShadow from '@styles/boxShadow'
import { copyToClipboard } from '@utils/clipboard'
import { onShare } from '@utils/share'

export interface ReferralCodeModalProps {
  show: boolean
  close: () => void
}

const ReferralCodeModal: FC<ReferralCodeModalProps> = ({ show, close }) => {
  const { localUser } = useContext(UserContext)
  const { referralCode } = localUser

  const copyCode = async () => {
    await copyToClipboard(referralCode)
  }

  const shareCode = async () => {
    await onShare(referralCode)
  }

  return (
    <Modal isVisible={show} onBackdropPress={close}>
      <View style={styles.container}>
        <Text style={styles.title}>{i18n.t('labels.referralCode')}</Text>

        <TouchableOpacity style={styles.codeContainer} onPress={copyCode}>
          <Text style={styles.code}>{referralCode}</Text>
          <MaterialIcons name="content-copy" size={NORMAL_FONT} color={COLORS.black} />
        </TouchableOpacity>

        <NegativeButton
          label={i18n.t('actions.share')}
          onPress={shareCode}
          icon={<Entypo name="share" size={NORMAL_FONT} color={COLORS.black} />}
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 5
  },
  title: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    color: COLORS.gray,
    textAlign: 'center'
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    backgroundColor: COLORS.white,
    ...boxShadow,
    marginVertical: 20
  },
  code: {
    fontFamily: NunitoSans,
    color: COLORS.black,
    fontSize: FONT_SIZE.body
  }
})

export default ReferralCodeModal
