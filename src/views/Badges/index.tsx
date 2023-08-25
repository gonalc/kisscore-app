import { useState } from 'react'
import BadgesList from './BadgesList'
import InfoModal from './InfoModal'
import type { IBadge } from '@_types/badges'
import AchievedBadgeModal from './AchievedBadgeModal'

export type AchievedBadgeModalProps = {
  badge: IBadge
  group?: string
}

const Badges = () => {
  const [infoModal, setInfoModal] = useState<string | null>(null)
  const [achievedBadgeModal, setAchievedBadgeMoal] = useState<AchievedBadgeModalProps | null>(null)

  return (
    <>
      <BadgesList setInfoModal={setInfoModal} setAchievedBadgeMoal={setAchievedBadgeMoal} />

      <InfoModal close={() => setInfoModal(null)} text={infoModal} isVisible={!!infoModal} />
      <AchievedBadgeModal
        isVisible={!!achievedBadgeModal}
        close={() => setAchievedBadgeMoal(null)}
        badgeData={achievedBadgeModal}
      />
    </>
  )
}

export default Badges
