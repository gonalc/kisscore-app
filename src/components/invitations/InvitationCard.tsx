import { FC, useState } from 'react'
import { IInvitation } from '../../types/invitations'
import { Text, View, StyleSheet } from 'react-native'
import boxShadow from '../../styles/boxShadow'
import COLORS from '../../utils/colors'
import { FONT_SIZE, NunitoSans } from '../../utils/fonts'
import Button from '../Button'
import NegativeButton from '../NegativeButton'
import i18n from '../../../i18n'

type ConfirmStage = 'accept' | 'reject' | null

interface IInvitationCardProps {
  invitation: IInvitation
}

const InvitationCard: FC<IInvitationCardProps> = ({ invitation }) => {
  const { leagueName } = invitation

  const [confirmStage, setConfirmStage] = useState<ConfirmStage>(null)

  const renderContent = () => {
    if (confirmStage) {
      return (
        <View style={styles.buttonsRow}>
          <NegativeButton
            label={i18n.t('labels.thinkAboutIt')}
            onPress={() => setConfirmStage(null)}
          />
          <Button label={i18n.t('actions.confirm')} onPress={() => alert('Vamos a aceptar')} />
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
  }
})

export default InvitationCard
