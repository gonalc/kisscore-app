import type { IInvitation, TInvitationCreationPayload } from '../types/invitations'
import Api from './apiService'

const api = new Api('invitations')

export async function getUserInvitations(userId: number) {
  try {
    const path = `?filters[userId]=${userId}`

    const data = await api.get<IInvitation[]>(path)

    return data
  } catch (error) {
    throw Error(error)
  }
}

export async function inviteUser(payload: TInvitationCreationPayload) {
  try {
    const path = 'invite'

    const data = await api.post<IInvitation>({ path, payload })

    return data
  } catch (error) {
    throw Error(error)
  }
}

export async function acceptInvitation(invitation: IInvitation) {
  try {
    const path = `accept/${invitation.id}`

    const data = await api.post({ path, payload: invitation })

    return data
  } catch (error) {
    throw Error(error)
  }
}

export async function rejectInvitation(id: number) {
  try {
    const data = api.delete(`${id}`)

    return data
  } catch (error) {
    throw Error(error)
  }
}
