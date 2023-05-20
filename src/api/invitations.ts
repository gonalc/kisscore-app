import axios, { AxiosResponse } from 'axios'
import { APIResponse, BASE_URL } from './url'
import type { IInvitation } from '../types/invitations'

const INVITATIONS_URL = `${BASE_URL}/invitations`

export async function getUserInvitations(userId: number) {
  try {
    const url = `${INVITATIONS_URL}?filters[userId]=${userId}`

    const result: AxiosResponse<APIResponse<IInvitation[]>> = await axios.get(url)

    return result.data.data
  } catch (error) {
    throw Error(error)
  }
}

export async function acceptInvitation(invitation: IInvitation) {
  try {
    const url = `${INVITATIONS_URL}/accept/${invitation.id}`

    const result: AxiosResponse<APIResponse<unknown>> = await axios.post(url, invitation)

    return result.data.data
  } catch (error) {
    throw Error(error)
  }
}

export async function rejectInvitation(id: number) {
  try {
    const url = `${INVITATIONS_URL}/${id}`

    const result: AxiosResponse<APIResponse<unknown>> = await axios.delete(url)

    return result.data.data
  } catch (error) {
    throw Error(error)
  }
}
