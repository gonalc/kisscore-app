import type { IBadge } from '@_types/badges'

const UNGROUPED_KEY = 'ungrouped'

export const badgesOrderGroups = [
  'conquist',
  'country',
  'place',
  'share-app',
  UNGROUPED_KEY
] as const

export type BadgesHash = Record<IBadge['group'], IBadge[]>

export function groupBadges(badges: IBadge[]): BadgesHash {
  const badgesHash: BadgesHash = {}

  badges.forEach((badge) => {
    const { group } = badge

    if (group && group in badgesHash) {
      badgesHash[group].push(badge)
    } else if (group) {
      badgesHash[group] = [badge]
    } else if (UNGROUPED_KEY in badgesHash) {
      badgesHash[UNGROUPED_KEY].push(badge)
    } else {
      badgesHash[UNGROUPED_KEY] = [badge]
    }
  })

  return badgesHash
}
