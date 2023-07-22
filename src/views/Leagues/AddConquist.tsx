import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import COLORS from '@utils/colors'
import Button from '@components/Button'
import { FC, useState } from 'react'
import Modal from 'react-native-modal'
import i18n from '../../../i18n'
import { FONT_SIZE, LARGE_FONT, NunitoSans, NunitoSansBold } from '@utils/fonts'
import CountryInput from '@components/forms/CountryInput'
import { ICreationConquist } from '@_types/conquists'
import { YEAR_FORMAT } from '@utils/dates'
import NegativeButton from '@components/NegativeButton'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import ConquistCountryItem from './ConquistCountryItem'
import useCreateConquist from '@hooks/conquists/createConquist'
import Loader from '@components/Loader'
import { isAndroid } from '@utils/platform'
import TextInput from '@components/forms/TextInput'

enum CreateConquistSteps {
  COUNTRY,
  BIRTH_YEAR,
  PLACE,
  SUMMARY
}

type NewConquistForm = Omit<ICreationConquist, 'birthYear'> & {
  birthYear: string
}

interface IAddConquistProps {
  fetch: () => void
}

const AddConquist: FC<IAddConquistProps> = ({ fetch }) => {
  const initialConquist: NewConquistForm = {
    country: '',
    birthYear: '',
    place: ''
  }

  const { loading, create, created } = useCreateConquist()

  const [showForm, setShowForm] = useState(false)
  const [formStep, setFormStep] = useState<CreateConquistSteps>(CreateConquistSteps.COUNTRY)
  const [creationConquist, setCreationConquist] = useState<NewConquistForm>(initialConquist)

  const showToast = () => {
    if (created && isAndroid()) {
      const { score } = created

      ToastAndroid.show(i18n.t('conquists.successfulConquist', { score }), ToastAndroid.LONG)
    }
  }

  const resetForm = () => {
    setFormStep(CreateConquistSteps.COUNTRY)
    setCreationConquist({ ...initialConquist })
  }

  const onModalHide = () => {
    fetch()
    resetForm()
    showToast()
  }

  const onSubmit = async () => {
    try {
      await create({
        ...creationConquist,
        birthYear: Number(creationConquist.birthYear)
      })
      setShowForm(false)
    } catch (error) {
      console.error('Error creating conquist: ', error)
    }
  }

  const onPrevious = () => {
    if (formStep === CreateConquistSteps.COUNTRY) {
      setShowForm(false)
    } else {
      setFormStep((step) => step - 1)
    }
  }

  const onNext = () => {
    setFormStep((step) => step + 1)
  }

  const getNextButtonDisable = () => {
    switch (formStep) {
      case CreateConquistSteps.COUNTRY:
        return !creationConquist.country
      case CreateConquistSteps.BIRTH_YEAR:
        return creationConquist.birthYear.length !== YEAR_FORMAT.length
      case CreateConquistSteps.PLACE:
        return !creationConquist.place
      default:
        return false
    }
  }

  const editConquistToCreate =
    <T extends keyof ICreationConquist>(field: T) =>
    (value: NewConquistForm[T]) => {
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
          <TextInput
            label=""
            value={creationConquist.birthYear.toString()}
            maxLength={4}
            onChange={editConquistToCreate('birthYear')}
            placeholder={YEAR_FORMAT}
            icon={
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={LARGE_FONT}
                color={COLORS.black}
              />
            }
            keyboardType="number-pad"
          />
        </View>
      )
    }

    if (formStep === CreateConquistSteps.PLACE) {
      return (
        <View>
          <Text style={styles.label}>{i18n.t('conquists.form.place')}</Text>
          <CountryInput value={creationConquist.place} onChange={editConquistToCreate('place')} />
        </View>
      )
    }

    if (formStep === CreateConquistSteps.SUMMARY) {
      return (
        <View>
          <Text style={styles.label}>{i18n.t('conquists.form.conquistConfirmation')}</Text>

          <Text style={styles.summaryLabel}>
            {`${i18n.t('labels.country')}: `}
            <ConquistCountryItem countryCode={creationConquist.country} />
          </Text>
          <Text style={styles.summaryLabel}>
            {`${i18n.t('labels.birthYear')}: `}
            <Text style={styles.summaryValue}>
              {dayjs(creationConquist.birthYear).format(YEAR_FORMAT)}
            </Text>
          </Text>
          <Text style={styles.summaryLabel}>
            {`${i18n.t('labels.place')}: `}
            <ConquistCountryItem countryCode={creationConquist.place} />
          </Text>
        </View>
      )
    }
  }

  const getNextButton = () => {
    if (formStep < CreateConquistSteps.SUMMARY) {
      return (
        <Button
          label={i18n.t('actions.continue')}
          onPress={onNext}
          disabled={getNextButtonDisable()}
        />
      )
    }

    return <Button label={i18n.t('actions.create')} onPress={onSubmit} />
  }

  return (
    <View style={styles.container}>
      <Button label={i18n.t('conquists.ctaConquered')} onPress={() => setShowForm(true)} />

      <Modal
        isVisible={showForm}
        onBackdropPress={() => setShowForm(false)}
        onModalHide={onModalHide}
      >
        <Loader isLoading={loading}>
          <View style={styles.modalContainer}>
            <Text style={styles.formTitle}>{i18n.t('conquists.addConquist')}</Text>

            {renderStep()}

            <View style={styles.buttonsRow}>
              <NegativeButton label={i18n.t('actions.back')} onPress={onPrevious} />
              {getNextButton()}
            </View>
          </View>
        </Loader>
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
  },
  summaryLabel: {
    fontFamily: NunitoSans,
    fontSize: FONT_SIZE.body,
    color: COLORS.black
  },
  summaryValue: {
    fontFamily: NunitoSansBold
  }
})

export default AddConquist
