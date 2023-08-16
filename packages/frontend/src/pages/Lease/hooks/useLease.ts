import axios, { AxiosError } from 'axios'
import { useQuery } from 'react-query'

import { Lease } from '../../../common/types'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

export interface LeaseResponse {
  data: Lease | undefined
}

export const useLease = ({ leaseId }: { leaseId: string | null }) => {
  return useQuery<LeaseResponse, AxiosError>({
    queryKey: ['lease', leaseId],
    queryFn: async () => {
      if (leaseId) {
        const { data } = await axios.get<LeaseResponse>(
          `${backendUrl}/my-lease`,
          {
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer sometoken',
            },
            withCredentials: true,
          }
        )

        return data
      } else {
        return {
          data: undefined,
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
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}
