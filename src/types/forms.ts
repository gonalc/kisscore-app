import type { FC } from 'react'
import type { ITextInputProps } from '@components/forms/TextInput'
import type { IDateInputProps } from '@components/forms/DateInput'
import type { IEmailInputProps } from '@components/forms/EmailInput'
import type { IPasswordInputProps } from '@components/forms/PasswordInput'
import type { ISignupState } from '@views/Auth/Signup/reducer'
import type { ICountryInputProps } from '@components/forms/CountryInput'
import type { IReferralCodeInputProps } from '@components/forms/ReferralCodeInput'

export type TErrorType = 'length'

interface IBasicTextInput {
  Component: FC<ITextInputProps>
  props: ITextInputProps
}

interface IBirthDateInput {
  Component: FC<IDateInputProps>
  props: IDateInputProps
}

interface ICountryInput {
  Component: FC<ICountryInputProps>
  props: ICountryInputProps
}

interface IEmailInput {
  Component: FC<IEmailInputProps>
  props: IEmailInputProps
}

interface IPasswordInput {
  Component: FC<IPasswordInputProps>
  props: IPasswordInputProps
}

interface IReferralCodeInput {
  Component: FC<IReferralCodeInputProps>
  props: IReferralCodeInputProps
}

export interface ISignupInputs {
  name: IBasicTextInput
  birthdate: IBirthDateInput
  country: ICountryInput
  city: IBasicTextInput
  email: IEmailInput
  username: IBasicTextInput
  password: IPasswordInput
  passwordRepeat: IPasswordInput
  referralCode: IReferralCodeInput
}

export type TFormErrors = Pick<
  ISignupState,
  'nameError' | 'emailError' | 'passwordError' | 'passwordRepeatError' | 'usernameError'
>
