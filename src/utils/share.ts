import i18n from '@i18n/index'
import { Share, type ShareContent } from 'react-native'
import { isAndroid } from './platform'

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.cucupapi.kisscoreapp'
const APPLE_STORE_URL = 'NOT READY'

export async function onShareAppLink(username?: string) {
  try {
    let url = isAndroid() ? PLAY_STORE_URL : APPLE_STORE_URL

    if (username) {
      url += `?referral=${username}`
    }

    const content: ShareContent = {
      message: `${i18n.t('joinKisscore')}: ${url}`,
      url
    }

    const result = await Share.share(content)

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // console.log('Shared with activityType')
      } else {
        // console.log('Shared')
      }
    } else if (result.action === Share.dismissedAction) {
      // console.log('Action dismissed')
    }
  } catch (error) {
    alert(error)
  }
}
