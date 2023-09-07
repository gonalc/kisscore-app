import * as Clipboard from 'expo-clipboard'
import { addToast } from './toasts'
import i18n from '@i18n/index'

export async function copyToClipboard(text: string) {
  await Clipboard.setStringAsync(text)

  addToast(i18n.t('labels.textCopied'), 'SHORT')
}
