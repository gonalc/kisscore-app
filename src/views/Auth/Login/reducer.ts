import { MODIFY_FORM } from './constants'

export interface ILoginInitialState {
  email: string
}

interface ILoginAction {
  type: string
  payload: Record<string, string>
}

function reducer(state: ILoginInitialState, action: ILoginAction) {
  const { type, payload } = action

  switch (type) {
    case MODIFY_FORM:
      return {
        ...state,
        ...payload
      }
  }
}

export default reducer
