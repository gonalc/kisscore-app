import i18n from '../../../i18n'
import TextInput from '../../components/forms/TextInput'
import { FontAwesome5 } from '@expo/vector-icons'
import { FONT_SIZE, LARGE_FONT, NunitoSans } from '../../utils/fonts'
import COLORS from '../../utils/colors'
import { FC, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NegativeButton from '../../components/NegativeButton'
import Button from '../../components/Button'
import { MIN_NAME_LENGTH } from '../../utils/forms'
import useCreateInvitation from '../../hooks/invitations/createInvitation'
import Loader from '../../components/Loader'

type InvitationStatus = 'success' | 'error' | null

interface IInviteForm {
  onCancel: () => void
  leagueId: number
}

const InviteForm: FC<IInviteForm> = ({ onCancel, leagueId }) => {
  const [username, setUsername] = useState('')
  const [invitationStatus, setInvitationStatus] = useState<InvitationStatus>(null)

  const { create, loading } = useCreateInvitation()

  const onCreate = async () => {
    try {
      setInvitationStatus(null)

      await create({
        username,
        leagueId
      })

      setInvitationStatus('success')
    } catch (error) {
      setInvitationStatus('error')
    }
  }

  if (invitationStatus === 'success') {
    return (
      <View>
        <Text style={[styles.message, styles.success]}>
          {i18n.t('invitations.invitationSuccess', { username })}
        </Text>
        <NegativeButton label={i18n.t('actions.back')} onPress={onCancel} />
      </View>
    )
  }

  return (
    <Loader isLoading={loading}>
      <TextInput
        label={i18n.t('labels.username')}
        icon={<FontAwesome5 name="user-astronaut" size={LARGE_FONT} color={COLORS.black} />}
        onChange={setUsername}
        placeholder=""
        value={username}
      />

      <View style={styles.buttonsRow}>
        <NegativeButton label={i18n.t('actions.cancel')} onPress={onCancel} />
        <Button
          disabled={username.length < MIN_NAME_LENGTH}
          label={i18n.t('actions.confirm')}
          onPress={onCreate}
        />
      </View>

      {invitationStatus === 'error' && (
        <Text style={[styles.message, styles.error]}>{i18n.t('invitations.invitationError')}</Text>
      )}
    </Loader>
  )
}

const styles = StyleSheet.create({
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  message: {
    fontSize: FONT_SIZE.body,
    textAlign: 'center',
    fontFamily: NunitoSans
  },
  error: {
    color: COLORS.red,
    marginTop: 10
  },
  success: {
    color: COLORS.blue,
    marginBottom: 10
  }
})

export default InviteForm
