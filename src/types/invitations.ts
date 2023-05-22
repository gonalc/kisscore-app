export interface IInvitation {
  id: number
  userId: number
  leagueId: number
  leagueName: string
  createdAt: Date
}

export type TInvitationCreationPayload = {
  username: string
  leagueId: number
}
