import { FC } from 'react'
import { ITextInputProps } from '../components/forms/TextInput'
import { IDateInputProps } from '../components/forms/DateInput'
import { IEmailInputProps } from '../components/forms/EmailInput'
import { IPasswordInputProps } from '../components/forms/PasswordInput'
import { ISignupState } from '../views/Auth/Signup/reducer'

export type TErrorType = 'length'

interface IBasicTextInput {
  Component: FC<ITextInputProps>
  props: ITextInputProps
}

interface IBirthDateInput {
  Component: FC<IDateInputProps>
  props: IDateInputProps
}

interface IEmailInput {
  Component: FC<IEmailInputProps>
  props: IEmailInputProps
}

interface IPasswordInput {
  Component: FC<IPasswordInputProps>
  props: IPasswordInputProps
}

export interface ISignupInputs {
  name: IBasicTextInput
  birthDate: IBirthDateInput
  country: IBasicTextInput
  city: IBasicTextInput
  email: IEmailInput
  password: IPasswordInput
  passwordRepeat: IPasswordInput
}

export type TFormErrors = Pick<ISignupState, 'nameError'>
