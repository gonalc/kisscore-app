/* eslint-disable no-console */
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { isAndroid } from '../utils/platform'
import COLORS from '../utils/colors'
import { useEffect, useRef, useState } from 'react'
import useUpdateUser from './users/updateUser'
import { getStoredUser } from '../utils/storage'

enum NotificationType {
  INVITATION = 'invitation'
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

const useNotifications = <T,>(type?: NotificationType) => {
  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()

  const { update } = useUpdateUser()

  const [notifications, setNotifications] = useState<T[]>([])

  async function updateUserToken(fcmToken: string) {
    const userId = (await getStoredUser())?.id

    if (userId) {
      await update(userId, { fcmToken })
    }
  }

  async function registerForPushNotificationsAsync() {
    let token: string

    if (Device.isDevice) {
      if (isAndroid()) {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: COLORS.lightRed
        })
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync()

      let finalStatus = existingStatus

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }

      if (finalStatus !== 'granted') {
        alert('Failed to get push notification token.')
        return
      }

      token = (await Notifications.getExpoPushTokenAsync()).data

      await updateUserToken(token)
    } else {
      alert('You must use a physical device for Push Notifications.')
    }

    return token
  }

  useEffect(() => {
    registerForPushNotificationsAsync()

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      const notificationType: NotificationType = notification.request.content.data.type
      const { payload } = notification.request.content.data

      if (!type || type === notificationType) {
        setNotifications((previous) => [...previous, payload])
      }
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('RESPONSE --> ', JSON.stringify(response, null, 1))
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return notifications
}

export default useNotifications
