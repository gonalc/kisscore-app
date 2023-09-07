import { ToastAndroid } from 'react-native'
import { isAndroid } from './platform'

type ToastDuration = 'LONG' | 'SHORT'

export function addToast(text: string, duration: ToastDuration = 'LONG') {
  if (isAndroid()) {
    ToastAndroid.show(text, ToastAndroid[duration])
  }
}
