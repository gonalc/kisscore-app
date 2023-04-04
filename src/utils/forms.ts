export const emailIsValid = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const VALID_EMAIL_REGEXP = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  const MIN_EMAIL_LENGTH = 5

  const validEmailFormat = VALID_EMAIL_REGEXP.test(email)

  return email.length >= MIN_EMAIL_LENGTH && validEmailFormat
}

/**
 * Password must include:
 * - 8 characters
 * - Number
 * - Letter
 * - Uppercase
 * - Lowercase
 */
export const passwordIsValid = (password: string): boolean => {
  const VALID_PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/

  const validPassword = VALID_PASSWORD_REGEXP.test(password)

  return validPassword
}

export const MIN_NAME_LENGTH = 3
