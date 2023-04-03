import { View, StyleSheet } from 'react-native'
import TextInput from '../../../components/forms/TextInput'
import Title from '../../../components/Title'
import COLORS from '../../../utils/colors'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { LARGE_FONT } from '../../../utils/fonts'
import i18n from '../../../../i18n'
import EmailInput from '../../../components/forms/EmailInput'
import PasswordInput from '../../../components/forms/PasswordInput'
import { FC } from 'react'

interface IInputData<T> {
  Component: FC<T>
  props: T
}

type TSignupInputs = Record<string, IInputData<any>>

const Signup = () => {
  const iconProps = {
    color: COLORS.black,
    size: LARGE_FONT
  }

  const inputs: TSignupInputs = {
    name: {
      Component: TextInput,
      props: {
        label: i18n.t('labels.name'),
        icon: <FontAwesome name="user" {...iconProps} />,
        placeholder: i18n.t('forms.namePlaceholder')
      }
    },
    country: {
      Component: TextInput,
      props: {
        label: i18n.t('labels.country'),
        icon: <FontAwesome name="flag" {...iconProps} />,
        placeholder: i18n.t('forms.countryPlaceholder')
      }
    },
    city: {
      Component: TextInput,
      props: {
        label: i18n.t('labels.city'),
        placeholder: i18n.t('forms.cityPlaceholder'),
        icon: <MaterialCommunityIcons name="city" {...iconProps} />
      }
    },
    email: {
      Component: EmailInput,
      props: {
        value: '',
        onChange: (value: string) => console.log('Email changed: ', value)
      }
    },
    password: {
      Component: PasswordInput,
      props: {
        value: '',
        onChange: (value: string) => console.log('Password changed: ', value)
      }
    },
    passwordRepeat: {
      Component: PasswordInput,
      props: {
        value: '',
        onChange: (value: string) => console.log('Password changed: ', value),
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

          return <Component {...props} key={`${key}_signup-input`} />
        })}
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
  }
})

export default Signup
