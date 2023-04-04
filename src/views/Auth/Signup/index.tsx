import { View, StyleSheet } from 'react-native'
import TextInput from '../../../components/forms/TextInput'
import Title from '../../../components/Title'
import COLORS from '../../../utils/colors'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { LARGE_FONT } from '../../../utils/fonts'
import i18n from '../../../../i18n'
import EmailInput from '../../../components/forms/EmailInput'
import PasswordInput from '../../../components/forms/PasswordInput'
import { useReducer } from 'react'
import DateInput from '../../../components/forms/DateInput'
import reducer, { ISignupAction, ISignupState } from './reducer'
import constants from './constants'
import Button from '../../../components/Button'
import { AVERAGE_AGE, MIN_NAME_LENGTH, maximumSignupDate } from '../../../utils/forms'
import { ISignupInputs, TFormErrors } from '../../../types/forms'
import { today } from '../../../utils/dates'
import CountryInput from '../../../components/forms/CountryInput'

const { MODIFY_FORM, SUBMIT_FORM } = constants

const Signup = () => {
  const initialState: ISignupState = {
    name: '',
    nameError: null,
    birthDate: today.subtract(AVERAGE_AGE, 'years').valueOf(),
    country: '',
    city: '',
    email: '',
    password: '',
    passwordRepeat: '',
    submitted: false
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const iconProps = {
    color: COLORS.black,
    size: LARGE_FONT
  }

  const validateForm = () => {
    const formErrors: TFormErrors = {
      nameError: null
    }

    let hasErrors = false

    const { name } = state

    if (name.length < MIN_NAME_LENGTH) {
      formErrors.nameError = 'length'
      hasErrors = true
    } else {
      formErrors.nameError = null
    }

    return { formErrors, hasErrors }
  }

  const onChange = (field: string) => (value: string | number) => {
    const payload: ISignupAction['payload'] = { [field]: value }

    console.log({ field, value })

    dispatch({ type: MODIFY_FORM, payload })
  }

  const onSubmit = () => {
    console.log('STATE: ', state)
    const { formErrors, hasErrors } = validateForm()

    console.log({ formErrors, hasErrors })

    dispatch({ type: SUBMIT_FORM, payload: formErrors })
  }

  const inputs: ISignupInputs = {
    name: {
      Component: TextInput,
      props: {
        label: i18n.t('labels.name'),
        icon: <FontAwesome name="user" {...iconProps} />,
        placeholder: i18n.t('forms.namePlaceholder'),
        onChange,
        error: state.nameError,
        errorPayload: { value: MIN_NAME_LENGTH }
      }
    },
    birthDate: {
      Component: DateInput,
      props: {
        label: i18n.t('labels.birthDate'),
        onChange: (value) => {
          console.log({ value })
        },
        value: state.birthDate,
        maximumDate: new Date(maximumSignupDate)
      }
    },
    country: {
      Component: TextInput,
      props: {
        label: i18n.t('labels.country'),
        icon: <FontAwesome name="flag" {...iconProps} />,
        placeholder: i18n.t('forms.countryPlaceholder'),
        onChange
      }
    },
    city: {
      Component: TextInput,
      props: {
        label: i18n.t('labels.city'),
        placeholder: i18n.t('forms.cityPlaceholder'),
        icon: <MaterialCommunityIcons name="city" {...iconProps} />,
        onChange
      }
    },
    email: {
      Component: EmailInput,
      props: {
        value: '',
        onChange
      }
    },
    password: {
      Component: PasswordInput,
      props: {
        value: '',
        onChange
      }
    },
    passwordRepeat: {
      Component: PasswordInput,
      props: {
        value: '',
        onChange,
        placeholder: i18n.t('forms.repeatPassword')
      }
    }
  }

  return (
    <View style={styles.container}>
      <Title />
      <View>
        {Object.entries(inputs).map(([key, input]) => {
          const { Component, props } = input

          return <Component {...props} onChange={onChange(key)} key={`${key}_signup-input`} />
        })}

        <View style={styles.buttonContainer}>
          <Button label={i18n.t('forms.signup')} onPress={onSubmit} />
        </View>

        <CountryInput />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'stretch',
    padding: 50
  },
  buttonContainer: {
    marginVertical: 10
  }
})

export default Signup
