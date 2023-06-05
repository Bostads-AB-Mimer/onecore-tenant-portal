import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'

import { MaterialOptions } from '../../../common/types'

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5001'

export interface MaterialOptionResponse {
  data: {
    materialOptions: Array<MaterialOptions> | undefined
  }
}

export const useMaterialOptions = ({
  apartmentId,
}: {
  apartmentId: string | null
}) =>
  useQuery<MaterialOptionResponse, AxiosError>({
    queryKey: ['apartmentId', apartmentId],
    queryFn: async () => {
      if (apartmentId) {
        const { data } = await axios.get<MaterialOptionResponse>(
          `${backendUrl}/material-options`,
          {
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer sometoken',
            },
          }
        )
        console.log('data', data)
        return data
      } else {
        return {
          data: {
            materialOptions: undefined,
          },
        }
      }
    },
    retry: (failureCount: number, error: AxiosError) => {
      if (error.response?.status === 401) {
        return false
      } else {
        return failureCount < 3
      }
    },
  })
