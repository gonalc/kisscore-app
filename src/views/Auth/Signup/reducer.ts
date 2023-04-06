import { TErrorType } from '../../../types/forms'
import constants from './constants'

type TSignupConstants = keyof typeof constants

export interface ISignupState {
  name: string
  nameError: TErrorType | null
  birthDate: number
  country: string
  city: string
  email: string
  emailError: boolean
  password: string
  passwordError: boolean
  passwordRepeat: string
  submitted: boolean
}

export interface ISignupAction {
  type: TSignupConstants
  payload?: Partial<ISignupState>
}

const { MODIFY_FORM, SUBMIT_FORM } = constants

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
        submitted: true
      }
  }
}

export default reducer
