import { StyleSheet, Text, View } from 'react-native'
import COLORS from '../../utils/colors'
import Button from '../../components/Button'
import { useState } from 'react'
import Modal from 'react-native-modal'
import i18n from '../../../i18n'
import { FONT_SIZE, NunitoSans, NunitoSansBold } from '../../utils/fonts'
import CountryInput from '../../components/forms/CountryInput'
import { ICreationConquist } from '../../types/conquists'
import { today } from '../../utils/dates'
import { AVERAGE_AGE } from '../../utils/forms'
import NegativeButton from '../../components/NegativeButton'
import DateInput from '../../components/forms/DateInput'

enum CreateConquistSteps {
  COUNTRY,
  BIRTH_YEAR,
  PLACE
}

const AddConquist = () => {
  const initialConquist: ICreationConquist = {
    country: '',
    birthYear: today.subtract(AVERAGE_AGE, 'years').valueOf(),
    place: ''
  }

  const [showForm, setShowForm] = useState(false)
  const [formStep, setFormStep] = useState<CreateConquistSteps>(CreateConquistSteps.COUNTRY)
  const [creationConquist, setCreationConquist] = useState<ICreationConquist>(initialConquist)

  const onPrevious = () => {
    setFormStep((step) => step - 1)
  }

  const onNext = () => {
    setFormStep((step) => step + 1)
  }

  const getNextButtonDisable = () => {
    switch (formStep) {
      case CreateConquistSteps.COUNTRY:
        return !creationConquist.country
      case CreateConquistSteps.BIRTH_YEAR:
        return !creationConquist.birthYear
      default:
        return true
    }
  }

  const editConquistToCreate =
    <T extends keyof ICreationConquist>(field: T) =>
    (value: ICreationConquist[T]) => {
      setCreationConquist((previous) => ({
        ...previous,
        [field]: value
      }))
    }

  const renderStep = () => {
    if (formStep === CreateConquistSteps.COUNTRY) {
      return (
        <View>
          <Text style={styles.label}>{i18n.t('conquists.form.country')}</Text>
          <CountryInput
            value={creationConquist.country}
            onChange={editConquistToCreate('country')}
          />
        </View>
      )
    }

    if (formStep === CreateConquistSteps.BIRTH_YEAR) {
      return (
        <View>
          <Text style={styles.label}>{i18n.t('conquists.form.birthYear')}</Text>
          <DateInput
            label={i18n.t('conquists.form.birthYearExplanation')}
            value={creationConquist.birthYear}
            onChange={editConquistToCreate('birthYear')}
          />
        </View>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Button label="Conquisté!" onPress={() => setShowForm(true)} />

      <Modal isVisible={showForm} onBackdropPress={() => setShowForm(false)}>
        <View style={styles.modalContainer}>
          <Text style={styles.formTitle}>{i18n.t('conquists.addConquist')}</Text>

          {renderStep()}

          <View style={styles.buttonsRow}>
            <NegativeButton
              label={i18n.t('actions.back')}
              onPress={onPrevious}
              disabled={formStep === CreateConquistSteps.COUNTRY}
            />
            <Button
              label={i18n.t('actions.continue')}
              onPress={onNext}
              disabled={getNextButtonDisable()}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: 20
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    padding: 20,
    borderRadius: 5
  },
  formTitle: {
    fontFamily: NunitoSansBold,
    fontSize: FONT_SIZE.body,
    color: COLORS.black
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-around',
    marginTop: 10
  },
  label: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    color: COLORS.black,
    marginVertical: 10
  }
})

export default AddConquist
