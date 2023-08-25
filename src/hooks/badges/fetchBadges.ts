import type { IBadge } from '@_types/badges'
import BadgesApi from '@api/badges'
import { useEffect, useState } from 'react'

const badgesApi = new BadgesApi()

const useFetchBadges = () => {
  const [badges, setBadges] = useState<IBadge[]>([])
  const [loading, setLoading] = useState(false)

  const fetch = async () => {
    setLoading(true)

    const result = await badgesApi.getAll()

    setBadges(result)
    setLoading(false)
  }

  useEffect(() => {
    fetch()
  }, [])

  return { badges, loading, fetch }
}

export default useFetchBadges
