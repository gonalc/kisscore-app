import i18n from '../../../i18n'
import TextInput from '../../components/forms/TextInput'
import { FontAwesome5 } from '@expo/vector-icons'
import { LARGE_FONT } from '../../utils/fonts'
import COLORS from '../../utils/colors'
import { FC, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import NegativeButton from '../../components/NegativeButton'
import Button from '../../components/Button'
import { MIN_NAME_LENGTH } from '../../utils/forms'

interface IInviteForm {
  onCancel: () => void
}

const InviteForm: FC<IInviteForm> = ({ onCancel }) => {
  const [username, setUsername] = useState('')

  return (
    <View>
      <TextInput
        label={i18n.t('labels.username')}
        icon={<FontAwesome5 name="user-astronaut" size={LARGE_FONT} color={COLORS.black} />}
        onChange={setUsername}
        placeholder=""
      />

      <View style={styles.buttonsRow}>
        <NegativeButton label={i18n.t('actions.cancel')} onPress={onCancel} />
        <Button
          disabled={username.length < MIN_NAME_LENGTH}
          label={i18n.t('actions.confirm')}
          onPress={() => alert('Cnofirmamos')}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
})

export default InviteForm
