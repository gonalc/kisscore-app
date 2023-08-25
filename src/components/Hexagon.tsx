import COLORS, { type Color } from '@utils/colors'
import type { FC } from 'react'
import { View } from 'react-native'
import { Defs, Path, Pattern, Svg, Use } from 'react-native-svg'

interface HexagonProps {
  backgroundColor?: Color
  size?: number
  children?: JSX.Element
}

export const DEFAULT_SIZE = 70
const RATIO = 78 / DEFAULT_SIZE

const Hexagon: FC<HexagonProps> = ({
  size = DEFAULT_SIZE,
  backgroundColor = 'white',
  children
}) => {
  const height = size * RATIO

  return (
    <Svg
      width={size}
      height={height}
      viewBox="0 0 70 78"
      fill="none"
      style={{
        position: 'relative'
      }}
    >
      <Path
        d="M30 1.887a10 10 0 0110 0l24.641 14.226a10 10 0 015 8.66v28.454a10 10 0 01-5 8.66L40 76.113a10 10 0 01-10 0L5.359 61.887a10 10 0 01-5-8.66V24.774a10 10 0 015-8.66L30 1.886z"
        fill={`${COLORS[backgroundColor]}`}
      />
      <Defs>
        <Pattern id="prefix__pattern0" patternContentUnits="objectBoundingBox" width={1} height={1}>
          <Use xlinkHref="#prefix__image0" transform="scale(.005)" />
        </Pattern>
        {/* <Image
          id="prefix__image0"
          width={200}
          height={200}
          xlinkHref={img}
          preserveAspectRatio="xMidYMid slice"
        /> */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            backgroundColor: 'transparent'
          }}
        >
          {children}
        </View>
      </Defs>
    </Svg>
  )
}

export default Hexagon
