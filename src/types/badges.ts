import type { Color } from '@utils/colors'
import type { DBBaseItem } from '.'

export interface IBadge extends DBBaseItem {
  name: string
  iconKey: string
  iconFamily: string
  color: Color
  group?: string | null
}
