const es = {
  labels: {
    name: 'Nombre',
    country: 'País',
    city: 'Ciudad',
    birthDate: 'Fecha de nacimiento'
  },
  forms: {
    emailPlaceholder: 'ejemplo@tuemail.com',
    passwordPlaceholder: 'Introduce tu contraseña',
    login: 'Iniciar sesión',
    registerText: '¿No tienes cuenta? Regístrate aquí.',
    signup: 'Registrarme',
    namePlaceholder: 'Introduce tu nombre',
    countryPlaceholder: '¿Cuál es tu país?',
    cityPlaceholder: '¿Cuál es tu ciudad?',
    repeatPassword: 'Repite tu contraseña',
    countryNotFound: 'País no encontrado',
    errors: {
      length: 'Tiene que tener al menos {{value}} caracteres.',
      emailError: 'El email no es válido',
      passwordInvalid:
        'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.',
      passwordsMustBeEqual: 'Las contraseñas deben coincidir.',
      signupError:
        'Hubo un problema al registrar el usuario. ¿Puede que ese email ya exista? Vuelve a probar más tarde.',
      loginError: 'Las credenciales no son correctas.'
    }
  }
}

export default es
