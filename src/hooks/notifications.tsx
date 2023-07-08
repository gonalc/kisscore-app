/* eslint-disable no-console */
import * as Device from 'expo-device'
import * as Notifications from 'expo-notifications'
import { isAndroid } from '../utils/platform'
import COLORS from '../utils/colors'
import { useEffect, useRef, useState } from 'react'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

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
    console.log('----')
    console.log(token)
    console.log('----')
  } else {
    alert('You must use a physical device for Push Notifications.')
  }

  return token
}

const useNotifications = () => {
  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()

  const [expoPushToken, setExpoPushToken] = useState<string | null>(null)

  useEffect(() => {
    const register = async () => {
      const token = await registerForPushNotificationsAsync()

      setExpoPushToken(token)
    }

    register()

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('NOTIFICATION ===> ', notification)
    })

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('RESPONSE --> ', response)
    })

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return expoPushToken
}

export default useNotifications
