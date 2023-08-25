import type { DBBaseItem } from '.'

export interface IBadge extends DBBaseItem {
  name: string
  iconKey: string
  iconFamily: string
  color: string
}
