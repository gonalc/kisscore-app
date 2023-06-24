const es = {
  greetings: '¡Hola, {{name}}!',
  logoutConfirmation: '¿Estás seguro/a de que deseas cerrar sesión?',
  labels: {
    name: 'Nombre',
    username: 'Nombre de usuario',
    country: 'País',
    city: 'Ciudad',
    birthDate: 'Fecha de nacimiento',
    birthYear: 'Año de nacimiento',
    playersAmount: '{{count}} Jug.',
    options: 'Opciones',
    thinkAboutIt: 'Me lo pienso',
    place: 'Lugar',
    score: 'Puntos',
    countries: 'Países',
    places: 'Lugares'
  },
  actions: {
    create: 'Crear',
    back: 'Volver',
    reject: 'Rechazar',
    accept: 'Aceptar',
    confirm: 'Confirmar',
    cancel: 'Cancelar',
    continue: 'Continuar',
    logout: 'Cerrar sesión'
  },
  forms: {
    emailPlaceholder: 'ejemplo@tuemail.com',
    userKey: 'Email o nombre de usuario',
    passwordPlaceholder: 'Introduce tu contraseña',
    usernamePlaceholder: 'Introduce tu username',
    login: 'Iniciar sesión',
    registerText: '¿No tienes cuenta? Regístrate aquí.',
    signup: 'Registrarme',
    namePlaceholder: 'Introduce tu nombre',
    countryPlaceholder: '¿Cuál es tu país?',
    cityPlaceholder: '¿Cuál es tu ciudad?',
    emptyCountry: 'No se ha seleccionado el país',
    repeatPassword: 'Repite tu contraseña',
    countryNotFound: 'País no encontrado',
    createLeaguePlaceholder: 'Súper Copa',
    errors: {
      length: 'Tiene que tener al menos {{value}} caracteres.',
      emailError: 'El email no es válido',
      passwordInvalid:
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.',
      passwordsMustBeEqual: 'Las contraseñas deben coincidir.',
      signupError:
        'Hubo un problema al registrar el usuario. Puede que ese email o el nombre de usuario ya existan. Vuelve a probar más tarde.',
      loginError: 'Las credenciales no son correctas.'
    }
  },
  leagues: {
    createLeague: 'Crear liga',
    noLeagues: 'No estás dentro de ninguna liga.',
    settings: {
      invitePlayer: 'Invitar jugador',
      shareLink: 'Compartir link'
    }
  },
  invitations: {
    title: 'Tienes invitaciones pendientes.',
    acceptConfirmation: 'Vas a aceptar la invitación a la liga {{name}}.',
    rejectConfirmation: 'Vas a rechazar la invitación a la liga {{name}}.',
    invitationSuccess: 'Se ha invitado a {{username}} correctamente',
    invitationError: 'Hubo un error. Quizás el nombre de usuario no existe.'
  },
  conquists: {
    addConquist: 'Añadir conquista',
    ctaConquered: '¡Conquisté!',
    form: {
      country: '¿Cuál era su nacionalidad?',
      birthYear: '¿Te sabes su año de nacimiento?',
      place: '¿En qué país sucedió?',
      birthYearExplanation: 'Solo se tendrá en cuenta el año',
      conquistConfirmation: 'Esta es tu última conquista.'
    },
    successfulConquist: '¡Enhorabuena, has conseguido {{score}} puntos!'
  },
  settings: {
    title: 'Ajustes'
  }
}

export default es
