import { useReducer } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Input from '../../../components/forms/EmailInput'
import COLORS from '../../../utils/colors'
import { FONT_SIZE, PassionOne } from '../../../utils/fonts'
import { MODIFY_FORM } from './constants'
import reducer, { ILoginInitialState } from './reducer'

function Login() {
  const initialState: ILoginInitialState = {
    email: ''
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const editForm = (field: keyof typeof initialState) => (value: string) => {
    dispatch({ type: MODIFY_FORM, payload: { [field]: value } })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kisscore</Text>
      <Input value={state.email} onChange={editForm('email')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
    padding: 50
  },
  title: {
    fontSize: FONT_SIZE.title,
    fontFamily: PassionOne,
    color: COLORS.red
  }
})

export default Login
