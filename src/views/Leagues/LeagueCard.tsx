import { FC } from 'react'
import { ILeague } from '../../types/leagues'
import { Text } from 'react-native'

interface ILeagueCardProps {
  league: ILeague
}

const LeagueCard: FC<ILeagueCardProps> = ({ league }) => {
  return <Text>{league.name}</Text>
}

export default LeagueCard
