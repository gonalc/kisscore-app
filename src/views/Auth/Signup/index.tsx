import { View, StyleSheet, Text, ScrollView } from 'react-native'
import TextInput from '@components/forms/TextInput'
import Title from '@components/Title'
import COLORS from '@utils/colors'
import { FontAwesome, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'
import { FONT_SIZE, LARGE_FONT, NunitoSans } from '@utils/fonts'
import EmailInput from '@components/forms/EmailInput'
import PasswordInput from '@components/forms/PasswordInput'
import { useContext, useReducer } from 'react'
import DateInput from '@components/forms/DateInput'
import reducer, { type ISignupAction, type ISignupState } from './reducer'
import constants from './constants'
import Button from '@components/Button'
import {
  AVERAGE_AGE,
  MIN_NAME_LENGTH,
  emailIsValid,
  maximumSignupDate,
  passwordIsValid
} from '@utils/forms'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import i18n from '@i18n/index'
import { getInstallationReferral } from '@utils/referral'
import { UserContext } from '@contexts/userContext'
import { storeSessionData } from '@utils/storage'
import type { RootStackParamList } from 'App'
import type { ICreationUser } from '@_types/users'
import AuthApi from '@api/auth'
import CountryInput from '@components/forms/CountryInput'
import { today } from '@utils/dates'
import type { ISignupInputs, TFormErrors } from '@_types/forms'
import ReferralCodeInput from '@components/forms/ReferralCodeInput'

type THomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Signup'>

const authApi = new AuthApi()

const { MODIFY_FORM, SUBMIT_FORM, SIGNUP_ERROR } = constants

const Signup = () => {
  const { setLocalUser } = useContext(UserContext)

  const navigation = useNavigation<THomeScreenProp>()

  const initialState: ISignupState = {
    name: '',
    nameError: null,
    birthdate: today.subtract(AVERAGE_AGE, 'years').valueOf(),
    country: '',
    city: '',
    email: '',
    emailError: false,
    username: '',
    usernameError: null,
    password: '',
    passwordError: false,
    passwordRepeat: '',
    passwordRepeatError: false,
    submitted: false,
    signupError: false,
    referralCode: ''
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const iconProps = {
    color: COLORS.black,
    size: LARGE_FONT
  }

  const validateForm = () => {
    const formErrors: TFormErrors = {
      nameError: null,
      emailError: false,
      passwordError: false,
      passwordRepeatError: false,
      usernameError: null
    }

    let hasErrors = false

    const { name, email, password, passwordRepeat, username } = state

    // Validate name
    if (name.length < MIN_NAME_LENGTH) {
      formErrors.nameError = 'length'
      hasErrors = true
    } else {
      formErrors.nameError = null
    }

    // Validate username
    if (username.length < MIN_NAME_LENGTH) {
      formErrors.usernameError = 'length'
      hasErrors = true
    } else {
      hasErrors = false
    }

    // Validate email
    const isValidEmail = emailIsValid(email)
    formErrors.emailError = !isValidEmail

    if (!isValidEmail) {
      hasErrors = true
    }

    // Validate password
    const isValidPassword = passwordIsValid(password)
    formErrors.passwordError = !isValidPassword

    if (!isValidPassword) {
      hasErrors = true
    }

    // Validate repeated password
    const areEqual = password === passwordRepeat
    formErrors.passwordRepeatError = !areEqual

    if (!areEqual) {
      hasErrors = true
    }

    return { formErrors, hasErrors }
  }

  const onChange = (field: string) => (value: string | number) => {
    const payload: ISignupAction['payload'] = { [field]: value }

    dispatch({ type: MODIFY_FORM, payload })
  }

  const onSubmit = async () => {
    const { formErrors, hasErrors } = validateForm()

    dispatch({ type: SUBMIT_FORM, payload: formErrors })

    if (!hasErrors) {
      const { name, email, password, country, city, birthdate, username } = state

      const formData: ICreationUser = {
        name,
        username,
        email,
        password,
        country,
        city,
        birthdate: new Date(birthdate)
      }

      try {
        const referral = await getInstallationReferral()

        const { jwt, user } = await authApi.signup(formData, referral)

        setLocalUser(user)

        await storeSessionData(user, jwt)

        navigation.navigate('LeaguesScreens')
      } catch (error) {
        dispatch({ type: SIGNUP_ERROR })
      }
    }
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
    username: {
      Component: TextInput,
      props: {
        onChange,
        value: state.username,
        label: i18n.t('labels.username'),
        icon: <FontAwesome5 name="user-tag" {...iconProps} />,
        placeholder: i18n.t('forms.usernamePlaceholder'),
        error: state.usernameError,
        errorPayload: { value: MIN_NAME_LENGTH }
      }
    },
    birthdate: {
      Component: DateInput,
      props: {
        label: i18n.t('labels.birthDate'),
        onChange: () => null,
        value: state.birthdate,
        maximumDate: new Date(maximumSignupDate)
      }
    },
    country: {
      Component: CountryInput,
      props: {
        placeholder: i18n.t('forms.countryPlaceholder'),
        onChange,
        value: state.country
      }
    },
    city: {
      Component: TextInput,
      props: {
        label: i18n.t('labels.city'),
        placeholder: i18n.t('forms.cityPlaceholder'),
        icon: <MaterialCommunityIcons name="city" {...iconProps} />,
        onChange,
        value: state.city
      }
    },
    email: {
      Component: EmailInput,
      props: {
        onChange,
        value: state.email,
        showError: state.emailError
      }
    },
    password: {
      Component: PasswordInput,
      props: {
        value: state.password,
        onChange,
        showError: state.passwordError
      }
    },
    passwordRepeat: {
      Component: PasswordInput,
      props: {
        value: state.passwordRepeat,
        onChange,
        placeholder: i18n.t('forms.repeatPassword'),
        showError: state.passwordRepeatError,
        errorMessage: 'forms.errors.passwordsMustBeEqual'
      }
    },
    referralCode: {
      Component: ReferralCodeInput,
      props: {
        value: state.referralCode,
        onChange
      }
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Title />
      <View>
        {Object.entries(inputs).map(([key, input]) => {
          const { Component, props } = input

          return <Component {...props} onChange={onChange(key)} key={`${key}_signup-input`} />
        })}

        <View style={styles.buttonContainer}>
          <Button label={i18n.t('forms.signup')} onPress={onSubmit} />
        </View>

        {state.signupError && (
          <View>
            <Text style={styles.textError}>{i18n.t('forms.errors.signupError')}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    padding: 50
  },
  contentContainer: {
    paddingBottom: 50
  },
  buttonContainer: {
    marginVertical: 10
  },
  textError: {
    color: COLORS.red,
    fontSize: FONT_SIZE.labels,
    fontFamily: NunitoSans,
    textAlign: 'center',
    marginVertical: 10
  }
})

export default Signup
