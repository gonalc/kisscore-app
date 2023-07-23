import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useContext, useReducer } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootStackParamList } from '../../../../App'
import Button from '@components/Button'
import PasswordInput from '@components/forms/PasswordInput'
import NegativeButton from '@components/NegativeButton'
import Title from '@components/Title'
import COLORS from '@utils/colors'
import { FONT_SIZE, LARGE_FONT, NunitoSans, SMALL_FONT } from '@utils/fonts'
import { MIN_NAME_LENGTH, passwordIsValid } from '@utils/forms'
import constants from './constants'
import reducer, { ILoginAction, ILoginInitialState } from './reducer'
import { ILoginData, login } from '@api/auth'
import { storeSessionData } from '@utils/storage'
import TextInput from '@components/forms/TextInput'
import { FontAwesome5 } from '@expo/vector-icons'
import { UserContext } from '@contexts/userContext'
import i18n from '@i18n/index'

type THomeScreenProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

const { MODIFY_FORM, SUBMIT_FORM, LOGIN_ERROR } = constants

function Login() {
  const { setLocalUser } = useContext(UserContext)

  const initialState: ILoginInitialState = {
    userKey: '',
    userKeyError: null,
    password: '',
    passwordError: false,
    submitted: false,
    loginError: false
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const navigation = useNavigation<THomeScreenProp>()

  const editForm = (field: keyof typeof initialState) => (value: string) => {
    const payload: ILoginAction['payload'] = { [field]: value }

    if (field === 'userKey') {
      const isValid = value.length >= MIN_NAME_LENGTH

      payload.userKeyError = isValid ? null : 'length'
    }

    if (field === 'password') {
      const isValid = passwordIsValid(value)

      payload.passwordError = !isValid
    }

    dispatch({ type: MODIFY_FORM, payload })
  }

  const formIsValid = () => {
    return state.userKey && state.password && !state.userKeyError && !state.passwordError
  }

  const onSubmit = async () => {
    dispatch({ type: SUBMIT_FORM })

    const { userKey, password } = state

    const loginData: ILoginData = {
      userKey,
      password
    }

    try {
      const { jwt, user } = await login(loginData)

      await storeSessionData(user, jwt)
      setLocalUser(user)

      navigation.navigate('LeaguesScreens')
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
      <TextInput
        value={state.userKey}
        onChange={editForm('userKey')}
        label={i18n.t('forms.userKey')}
        placeholder={i18n.t('forms.emailPlaceholder')}
        icon={<FontAwesome5 name="user-astronaut" size={LARGE_FONT} color={COLORS.black} />}
        error={state.submitted && state.userKeyError && state.userKeyError ? 'length' : null}
        errorPayload={{ value: MIN_NAME_LENGTH }}
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
    backgroundColor: COLORS.background,
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
