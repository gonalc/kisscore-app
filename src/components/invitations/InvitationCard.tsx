import { FC, useState } from 'react'
import { IInvitation } from '@_types/invitations'
import { Text, View, StyleSheet } from 'react-native'
import boxShadow from '@styles/boxShadow'
import COLORS from '@utils/colors'
import { FONT_SIZE, NunitoSans } from '@utils/fonts'
import Button from '../Button'
import NegativeButton from '../NegativeButton'
import useConfirmInvitation from '@hooks/invitations/confirmInvitation'
import Loader from '../Loader'
import i18n from '@i18n/index'

type ConfirmStage = 'accept' | 'reject' | null

interface IInvitationCardProps {
  invitation: IInvitation
  fetchInvitations: () => void
  fetchLeagues: () => void
}

const InvitationCard: FC<IInvitationCardProps> = ({
  invitation,
  fetchInvitations,
  fetchLeagues
}) => {
  const { leagueName } = invitation

  const { confirm, loading } = useConfirmInvitation()

  const [confirmStage, setConfirmStage] = useState<ConfirmStage>(null)

  const confirmInvitation = async () => {
    if (confirmInvitation) {
      await confirm(confirmStage, invitation)
      fetchInvitations()
      fetchLeagues()
    }
  }

  const renderContent = () => {
    if (confirmStage) {
      return (
        <View>
          <Text style={styles.confirmationText}>
            {i18n.t(`invitations.${confirmStage}Confirmation`, { name: leagueName })}
          </Text>
          <Loader isLoading={loading}>
            <View style={styles.buttonsRow}>
              <NegativeButton
                label={i18n.t('labels.thinkAboutIt')}
                onPress={() => setConfirmStage(null)}
              />
              <Button
                label={i18n.t(`actions.${confirmStage === 'reject' ? 'reject' : 'confirm'}`)}
                onPress={confirmInvitation}
              />
            </View>
          </Loader>
        </View>
      )
    }

    return (
      <View style={styles.buttonsRow}>
        <NegativeButton
          label={i18n.t('actions.reject')}
          onPress={() => setConfirmStage('reject')}
        />
        <Button label={i18n.t('actions.accept')} onPress={() => setConfirmStage('accept')} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.leagueName}>{leagueName}</Text>

      {renderContent()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...boxShadow,
    backgroundColor: COLORS.white,
    padding: 10,
    margin: 10,
    marginBottom: 20,
    borderRadius: 5
  },
  leagueName: {
    fontFamily: NunitoSans,
    color: COLORS.black,
    fontSize: FONT_SIZE.body,
    textAlign: 'center',
    marginBottom: 10
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-around'
  },
  confirmationText: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    color: COLORS.black,
    textAlign: 'center',
    marginBottom: 10
  }
})

export default InvitationCard
