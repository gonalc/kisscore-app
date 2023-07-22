import { LinearGradient } from 'expo-linear-gradient'
import { FC } from 'react'
import COLORS from '@utils/colors'

const HeaderBackground: FC = () => {
  return (
    <LinearGradient
      colors={[COLORS.red, COLORS.pink]}
      style={{ flex: 1 }}
      start={{
        x: 0,
        y: 0
      }}
      end={{
        x: 1,
        y: 1
      }}
    />
  )
}

export default HeaderBackground
