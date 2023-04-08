import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useReducer } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootStackParamList } from '../../../../App'
import i18n from '../../../../i18n'
import Button from '../../../components/Button'
import EmailInput from '../../../components/forms/EmailInput'
import PasswordInput from '../../../components/forms/PasswordInput'
import NegativeButton from '../../../components/NegativeButton'
import Title from '../../../components/Title'
import COLORS from '../../../utils/colors'
import { FONT_SIZE, NunitoSans, SMALL_FONT } from '../../../utils/fonts'
import { emailIsValid, passwordIsValid } from '../../../utils/forms'
import constants from './constants'
import reducer, { ILoginAction, ILoginInitialState } from './reducer'
import { login } from '../../../api/auth'

type THomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

const { MODIFY_FORM, SUBMIT_FORM, LOGIN_ERROR } = constants

function Login() {
  const initialState: ILoginInitialState = {
    email: '',
    emailError: false,
    password: '',
    passwordError: false,
    submitted: false,
    loginError: false
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const navigation = useNavigation<THomeScreenProp>()

  const editForm = (field: keyof typeof initialState) => (value: string) => {
    const payload: ILoginAction['payload'] = { [field]: value }

    if (field === 'email') {
      const isValid = emailIsValid(value)

      payload.emailError = !isValid
    }

    if (field === 'password') {
      const isValid = passwordIsValid(value)

      payload.passwordError = !isValid
    }

    dispatch({ type: MODIFY_FORM, payload })
  }

  const formIsValid = () => {
    return state.email && state.password && !state.emailError && !state.passwordError
  }

  const onSubmit = async () => {
    dispatch({ type: SUBMIT_FORM })

    const { email, password } = state

    const loginData = {
      email,
      password
    }

    try {
      await login(loginData)

      // Need to set the user in context
      // Store JTW in async storage
    } catch (error) {
      dispatch({ type: LOGIN_ERROR })
    }
  }

  const goToSignup = () => {
    navigation.navigate('Signup')
  }

  return (
    <View style={styles.container}>
      <Title />
      <EmailInput
        value={state.email}
        onChange={editForm('email')}
        showError={state.submitted && state.emailError}
      />
      <PasswordInput value={state.password} onChange={editForm('password')} />
      <View style={styles.block}>
        <Button label={i18n.t('forms.login')} onPress={onSubmit} disabled={!formIsValid()} />
      </View>

      <View style={styles.block}>
        <Text style={styles.registerText}>{i18n.t('forms.registerText')}</Text>
      </View>

      {state.loginError && (
        <View>
          <Text style={styles.textError}>{i18n.t('forms.errors.loginError')}</Text>
        </View>
      )}

      <View style={styles.block}>
        <NegativeButton label={i18n.t('forms.signup')} onPress={goToSignup} />
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
  block: {
    marginVertical: 10
  },
  registerText: {
    textAlign: 'center',
    fontSize: SMALL_FONT,
    fontFamily: NunitoSans
  },
  textError: {
    color: COLORS.red,
    fontSize: FONT_SIZE.labels,
    fontFamily: NunitoSans,
    textAlign: 'center',
    marginVertical: 10
  }
})

export default Login
