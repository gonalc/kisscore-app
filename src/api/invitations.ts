import type { IInvitation, TInvitationCreationPayload } from '@_types/invitations'
import Api from './apiService'

class InvitationsApi {
  private getApi() {
    const api = new Api('invitations')

    return api
  }

  async getUserInvitations(userId: number) {
    try {
      const api = this.getApi()

      const path = `?filters[userId]=${userId}`

      const data = await api.get<IInvitation[]>(path)

      return data
    } catch (error) {
      throw Error(error)
    }
  }

  async inviteUser(payload: TInvitationCreationPayload) {
    try {
      const api = this.getApi()

      const path = 'invite'

      const data = await api.post<IInvitation>({ path, payload })

      return data
    } catch (error) {
      throw Error(error)
    }
  }

  async acceptInvitation(invitation: IInvitation) {
    try {
      const api = this.getApi()

      const path = `accept/${invitation.id}`

      const data = await api.post({ path, payload: invitation })

      return data
    } catch (error) {
      throw Error(error)
    }
  }

  async rejectInvitation(id: number) {
    try {
      const api = this.getApi()

      const data = api.delete(`${id}`)

      return data
    } catch (error) {
      throw Error(error)
    }
  }
}

export default InvitationsApi
