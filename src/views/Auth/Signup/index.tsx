import { View, StyleSheet } from 'react-native'
import TextInput from '../../../components/forms/TextInput'
import Title from '../../../components/Title'
import COLORS from '../../../utils/colors'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { LARGE_FONT } from '../../../utils/fonts'
import i18n from '../../../../i18n'
import EmailInput from '../../../components/forms/EmailInput'
import PasswordInput from '../../../components/forms/PasswordInput'
import { FC, useReducer } from 'react'
import DateInput from '../../../components/forms/DateInput'
import reducer, { ISignupAction, ISignupState } from './reducer'
import constants from './constants'
import Button from '../../../components/Button'

interface IInputData<T> {
  Component: FC<T>
  props: T
}

type TSignupInputs = Record<string, IInputData<any>>

const { MODIFY_FORM } = constants

const Signup = () => {
  const initialState: ISignupState = {
    name: '',
    birthDate: '',
    country: '',
    city: '',
    email: '',
    password: '',
    repeatedPassword: '',
    submitted: false
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const iconProps = {
    color: COLORS.black,
    size: LARGE_FONT
  }

  const onChange = (field: keyof typeof inputs) => (value: string) => {
    const payload: ISignupAction['payload'] = { [field]: value }

    dispatch({ type: MODIFY_FORM, payload })
  }

  const onSubmit = () => {
    console.log('STATE: ', state)
  }

  const inputs: TSignupInputs = {
    name: {
      Component: TextInput,
      props: {
        label: i18n.t('labels.name'),
        icon: <FontAwesome name="user" {...iconProps} />,
        placeholder: i18n.t('forms.namePlaceholder'),
        onChangeText: onChange
      }
    },
    birthdate: {
      Component: DateInput,
      props: {
        label: i18n.t('labels.birthDate'),
        onChange
      }
    },
    country: {
      Component: TextInput,
      props: {
        label: i18n.t('labels.country'),
        icon: <FontAwesome name="flag" {...iconProps} />,
        placeholder: i18n.t('forms.countryPlaceholder'),
        onChangeText: onChange
      }
    },
    city: {
      Component: TextInput,
      props: {
        label: i18n.t('labels.city'),
        placeholder: i18n.t('forms.cityPlaceholder'),
        icon: <MaterialCommunityIcons name="city" {...iconProps} />,
        onChangeText: onChange
      }
    },
    email: {
      Component: EmailInput,
      props: {
        value: '',
        onChange
      }
    },
    password: {
      Component: PasswordInput,
      props: {
        value: '',
        onChange
      }
    },
    passwordRepeat: {
      Component: PasswordInput,
      props: {
        value: '',
        onChange,
        placeholder: i18n.t('forms.repeatPassword')
      }
    }
  }

  return (
    <View style={styles.container}>
      <Title />
      <View>
        {Object.entries(inputs).map(([key, input]) => {
          const { Component, props } = input

          return <Component {...props} onChange={onChange(key)} key={`${key}_signup-input`} />
        })}

        <View style={styles.buttonContainer}>
          <Button label={i18n.t('forms.signup')} onPress={onSubmit} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'stretch',
    padding: 50
  },
  buttonContainer: {
    marginVertical: 10
  }
})

export default Signup
