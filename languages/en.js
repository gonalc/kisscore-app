/* eslint-disable quotes */
const en = {
  greetings: 'Hello, {{name}}!',
  logoutConfirmation: 'Are you sure you want to log out?',
  labels: {
    name: 'Name',
    username: 'User name',
    country: 'Country',
    city: 'City',
    birthDate: 'Date of birth',
    birthYear: 'Year of birth',
    playersAmount: '{{count}} Pl.',
    options: 'Options',
    thinkAboutIt: 'I think about it',
    place: 'Location',
    score: 'Points',
    countries: 'Countries',
    places: 'Places',
    availableLanguages: 'Available languages'
  },
  actions: {
    create: 'Create',
    back: 'Back to',
    reject: 'Reject',
    accept: 'Accept',
    confirm: 'Confirm',
    cancel: 'Cancel',
    continue: 'Continue to',
    logout: 'Log off',
    exit: 'Exit'
  },
  forms: {
    emailPlaceholder: 'example@yourmail.com',
    userKey: 'Email or username',
    passwordPlaceholder: 'Enter your password',
    usernamePlaceholder: 'Enter your username',
    login: 'Login',
    registerText: "Don't have an account? Register here.",
    signup: 'Register',
    namePlaceholder: 'Enter your name',
    countryPlaceholder: 'What is your country?',
    cityPlaceholder: 'What is your city?',
    emptyCountry: 'No country selected',
    repeatPassword: 'Repeat your password',
    countryNotFound: 'Country not found',
    createLeaguePlaceholder: 'Super Cup',
    errors: {
      length: 'It must have at least {{value}} characters.',
      emailError: 'The email is invalid',
      passwordInvalid:
        'The password must have at least 8 characters, one uppercase, one lowercase and one number.',
      passwordsMustBeEqual: 'Passwords must match.',
      signupError:
        'There was a problem registering the user. That email or username may already exist. Please try again later.',
      loginError: 'The credentials are not correct.'
    }
  },
  leagues: {
    createLeague: 'Create link',
    noLeagues: 'You are not in any league.',
    settings: {
      invitePlayer: 'Invite player',
      shareLink: 'Share link'
    }
  },
  invitations: {
    title: 'You have invitations pending.',
    acceptConfirmation: 'You are going to accept the invitation to the {{name}} league.',
    rejectConfirmation: 'You are going to decline the invitation to the {{name}} league.',
    invitationSuccess: '{{username}} has been invited to aaa0aaa correctly',
    invitationError: 'There was an error. Perhaps the user name does not exist.'
  },
  conquists: {
    addConquist: 'Add conquest',
    ctaConquered: 'I conquered!',
    form: {
      country: 'What was your nationality?',
      birthYear: 'Do you know his year of birth?',
      place: 'In which country did it happen?',
      birthYearExplanation: 'Only the year will be taken into account',
      conquistConfirmation: 'This is your latest conquest.'
    },
    successfulConquist: 'Congratulations, you have scored {{score}} points!'
  },
  settings: {
    title: 'Settings',
    changeLanguage: 'Change language'
  },
  languages: {
    es: 'Spanish',
    en: 'English'
  }
}

export default en
