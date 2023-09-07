import { TErrorType } from '@_types/forms'
import constants from './constants'

type TSignupConstants = keyof typeof constants

export interface ISignupState {
  name: string
  nameError: TErrorType | null
  birthdate: number
  country: string
  city: string
  email: string
  emailError: boolean
  username: string
  usernameError: TErrorType | null
  password: string
  passwordError: boolean
  passwordRepeat: string
  passwordRepeatError: boolean
  submitted: boolean
  signupError: boolean
  referralCode: string
}

export interface ISignupAction {
  type: TSignupConstants
  payload?: Partial<ISignupState>
}

const { MODIFY_FORM, SUBMIT_FORM, SIGNUP_ERROR } = constants

function reducer(state: ISignupState, action: ISignupAction) {
  const { type, payload = {} } = action

  switch (type) {
    case MODIFY_FORM:
      return {
        ...state,
        ...payload
      }
    case SUBMIT_FORM:
      return {
        ...state,
        ...payload,
        submitted: true,
        signupError: false
      }
    case SIGNUP_ERROR:
      return {
        ...state,
        signupError: true
      }
  }
}

export default reducer
