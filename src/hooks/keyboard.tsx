import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

const useKeyboard = () => {
  const [keyboardShown, setKeyboardShown] = useState(false)
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height)
      setKeyboardShown(true)
    })
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardShown(false)
    })

    return () => {
      showSubscription.remove()
      hideSubscription.remove()
    }
  }, [])

  return { keyboardShown, keyboardHeight }
}

export default useKeyboard
