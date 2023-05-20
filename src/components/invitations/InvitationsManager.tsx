import { useState } from 'react'
import useFetchInvitations from '../../hooks/invitations/fetchInvitations'
import Modal from 'react-native-modal'
import { ScrollView, StyleSheet, View } from 'react-native'
import COLORS from '../../utils/colors'
import InvitationCard from './InvitationCard'
import i18n from '../../../i18n'
import { FONT_SIZE, NunitoSans } from '../../utils/fonts'
import Button from '../Button'

const InvitationsManager = () => {
  const { invitations } = useFetchInvitations()
  const [showModal, setShowModal] = useState(false)

  if (!invitations?.length) {
    return null
  }

  return (
    <>
      <View style={styles.container}>
        <Button label={i18n.t('invitations.title')} onPress={() => setShowModal(true)} />
      </View>

      <Modal isVisible={showModal} onBackdropPress={() => setShowModal(false)}>
        <View style={styles.modalContainer}>
          <ScrollView>
            {invitations.map((invitation) => {
              const { id } = invitation

              return <InvitationCard key={`invitation-for-league_${id}`} invitation={invitation} />
            })}
          </ScrollView>
          <Button label="Cerrar" onPress={() => setShowModal(false)} />
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: 25
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 5
  },
  title: {
    fontFamily: NunitoSans,
    textAlign: 'center',
    color: COLORS.black,
    fontSize: FONT_SIZE.body,
    marginBottom: 10
  }
})

export default InvitationsManager
