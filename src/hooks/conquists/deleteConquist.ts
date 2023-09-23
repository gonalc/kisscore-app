import type { IConquist } from '@_types/conquists'
import { QueryStatus } from '@_types/index'
import ConquistsApi from '@api/conquists'

const conquistsApi = new ConquistsApi()

const useDeleteConquist = () => {
  const destroy = async (id: IConquist['id']) => {
    try {
      await conquistsApi.delete(id)

      return QueryStatus.success
    } catch (error) {
      console.error('Error deleting conquist: ', error)

      return QueryStatus.error
    }
  }

  return { destroy }
}

export default useDeleteConquist
