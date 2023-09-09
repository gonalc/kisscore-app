/* eslint-disable quotes */
const en = {
  greetings: 'Hello, {{name}}!',
  logoutConfirmation: 'Are you sure you want to log out?',
  joinKisscore: 'Join Kisscore',
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
    availableLanguages: 'Available languages',
    conquists: 'Conquists',
    conquestCountries: 'Conquest countries',
    visitedPlaces: 'Visited places',
    referralCode: 'Referral code',
    textCopied: 'Copied to clipboard'
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
    exit: 'Exit',
    share: 'Share'
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
    pasteOrTypeCode: 'Paste or type the code',
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
      shareLink: 'Share link',
      referralCode: 'See referral code'
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
    noConquists: "There are no conquists yet. Let's go for the first one! 💪",
    form: {
      country: 'What was your nationality?',
      birthYear: 'Do you know his year of birth?',
      place: 'In which country did it happen?',
      birthYearExplanation: 'Only the year will be taken into account',
      conquistConfirmation: 'This is your latest conquest.',
      dontKnowYear: "Don't know it"
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
  },
  badges: {
    name: {
      'share-app-1': '1 Person',
      'share-app-5': '5 People',
      'share-app-10': '10 People',
      'conquist-1': '1 Conquest',
      'conquist-5': '5 Conquests',
      'conquist-10': '10 Conquests',
      'conquist-20': '20 Conquest',
      'conquist-50': '50 Conquests',
      'conquist-100': '100 Conquests',
      'country-1': '1 Country',
      'country-5': '5 Countries',
      'country-10': '10 Countries',
      'country-20': '20 Countries',
      'country-50': '50 Countries',
      'country-100': '100 Countries',
      'place-1': '1 Place',
      'place-5': '5 Places',
      'place-10': '10 Locations',
      'place-20': '20 Locations',
      'place-50': '50 Places',
      'place-100': '100 Places'
    },
    groups: {
      'share-app': 'Spread the word',
      country: 'Cross out countries',
      conquist: 'Make conquests',
      place: 'Discover places'
    },
    explanations: {
      'share-app':
        'Get badges for people who register in the app with your code. You can share the app from settings or from within a league, when you invite a player.',
      country: 'Earn badges by discovering new nationalities of the people you hook up with.',
      place: 'Get badges by hooking up with someone in new countries.',
      conquist: 'Earn badges by making out with people.'
    },
    celebrations: {
      'share-app-1': 'Congratulations! You have shared Kisscore with 1 person.',
      'share-app-5': 'Congratulations! You have shared Kisscore with 5 people.',
      'share-app-10': 'Congratulations! You have shared Kisscore with 10 people.'
    }
  }
}

export default en
