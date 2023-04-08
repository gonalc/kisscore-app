import constants from './constants'

type TLoginConstants = keyof typeof constants

export interface ILoginInitialState {
  email: string
  emailError: boolean
  password: string
  passwordError: boolean
  submitted: boolean
  loginError: boolean
}

export interface ILoginAction {
  type: TLoginConstants
  payload?: Partial<ILoginInitialState>
}

const { MODIFY_FORM, SUBMIT_FORM, LOGIN_ERROR } = constants

function reducer(state: ILoginInitialState, action: ILoginAction) {
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
        submitted: true,
        loginError: false
      }
    case LOGIN_ERROR:
      return {
        ...state,
        submitted: true,
        loginError: true
      }
  }
}

export default reducer
