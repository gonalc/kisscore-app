import type { IBadge } from '@_types/badges'
import Hexagon, { DEFAULT_SIZE } from '@components/Hexagon'
import * as Icons from '@expo/vector-icons'
import COLORS from '@utils/colors'
import { FONT_SIZE } from '@utils/fonts'
import type { FC } from 'react'

interface BadgeProps {
  badge: IBadge
  achieved: boolean
  size?: number
}

const Badge: FC<BadgeProps> = ({ badge, achieved, size }) => {
  const { iconFamily, iconKey, color } = badge

  const Icon = Icons[iconFamily]

  const badgeColor = achieved ? color : undefined
  const iconColor = achieved ? COLORS.white : COLORS.gray

  const iconRatio = FONT_SIZE.badge / DEFAULT_SIZE
  const iconSize = size ? size * iconRatio : FONT_SIZE.badge

  return (
    <Hexagon backgroundColor={badgeColor} size={size}>
      <Icon name={iconKey} size={iconSize} color={iconColor} />
    </Hexagon>
  )
}

export default Badge
