import { useNavigation } from '@react-navigation/native'
import { useReducer } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import i18n from '../../../../i18n'
import Button from '../../../components/Button'
import EmailInput from '../../../components/forms/EmailInput'
import PasswordInput from '../../../components/forms/PasswordInput'
import NegativeButton from '../../../components/NegativeButton'
import COLORS from '../../../utils/colors'
import { FONT_SIZE, NunitoSans, PassionOne, SMALL_FONT } from '../../../utils/fonts'
import { emailIsValid, passwordIsValid } from '../../../utils/forms'
import { MODIFY_FORM, SUBMIT_FORM } from './constants'
import reducer, { ILoginAction, ILoginInitialState } from './reducer'

function Login() {
  const initialState: ILoginInitialState = {
    email: '',
    emailError: false,
    password: '',
    passwordError: false,
    submitted: false
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const navigation = useNavigation()

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
    return !state.emailError && !state.passwordError
  }

  const onSubmit = () => {
    dispatch({ type: SUBMIT_FORM })

    const { email, password } = state

    const loginData = {
      email,
      password
    }

    console.log({ loginData })
  }

  const goToSignup = () => {
    navigation.navigate('Signup')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kisscore</Text>
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
  title: {
    fontSize: FONT_SIZE.title,
    fontFamily: PassionOne,
    color: COLORS.red,
    marginVertical: 20,
    textAlign: 'center'
  },
  block: {
    marginVertical: 10
  },
  registerText: {
    textAlign: 'center',
    fontSize: SMALL_FONT,
    fontFamily: NunitoSans
  }
})

export default Login
