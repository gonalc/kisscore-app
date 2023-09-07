import { FC } from 'react'
import TextInput from './TextInput'
import i18n from '@i18n/index'
import { Entypo, MaterialIcons } from '@expo/vector-icons'
import { NORMAL_FONT } from '@utils/fonts'
import COLORS from '@utils/colors'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { pasteFromClipboard } from '@utils/clipboard'

export interface IReferralCodeInputProps {
  value: string
  onChange: (value: string) => void
}

const ReferralCodeInput: FC<IReferralCodeInputProps> = ({ value, onChange }) => {
  const pasteCode = async () => {
    const code = await pasteFromClipboard()

    onChange(code)
  }

  return (
    <View style={styles.container}>
      <TextInput
        label={i18n.t('labels.referralCode')}
        value={value}
        icon={<Entypo name="ticket" size={NORMAL_FONT} color={COLORS.black} />}
        placeholder={i18n.t('forms.pasteOrTypeCode')}
        onChange={onChange}
      />

      <TouchableOpacity style={styles.pasteContainer} onPress={pasteCode}>
        <MaterialIcons name="content-paste" size={NORMAL_FONT} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  pasteContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    padding: 10,
    backgroundColor: 'transparent',
    justifyContent: 'center'
  }
})

export default ReferralCodeInput
