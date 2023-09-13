import axios, { AxiosError } from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query'

import { MaterialOption, RoomType } from '../../../common/types'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

export interface RoomTypesResponse {
  data: {
    roomTypes: Array<RoomType> | undefined
  }
}

export interface MaterialOptionResponse {
  data: MaterialOption | undefined
}

export interface MaterialChoiceResponse {
  status: number
}

export const useMaterialOptions = ({
  apartmentId,
}: {
  apartmentId: string | null
}) =>
  useQuery<RoomTypesResponse, AxiosError>({
    queryKey: ['apartmentId', apartmentId],
    queryFn: async () => {
      if (apartmentId) {
        const { data } = await axios.get<RoomTypesResponse>(
          `${backendUrl}/material-options`,
          {
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer sometoken',
            },
          }
        )
        return data
      } else {
        return {
          data: {
            roomTypes: undefined,
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

export const useMaterialChoices = () =>
  useQuery<RoomTypesResponse, AxiosError>({
    queryKey: ['materialChoices'],
    queryFn: async () => {
      const { data } = await axios.get<RoomTypesResponse>(
        `${backendUrl}/material-choices`,
        {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer sometoken',
          },
        }
      )
      return data
    },
    retry: (failureCount: number, error: AxiosError) => {
      if (error.response?.status === 401) {
        return false
      } else {
        return failureCount < 3
      }
    },
  })

export const useSaveMaterialChoices = (
  onSuccess: Function,
  onError: Function
) => {
  const client = useQueryClient()
  return useMutation<any, any, any>({
    mutationKey: ['useSaveChoices'],
    mutationFn: async (choices) => {
      axios(`${backendUrl}/material-choices`, {
        method: 'post',
        data: {
          choices: choices,
        },
      })
        .then((result) => {
          return { status: result.status }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    onSuccess: (result: any) => {
      client.invalidateQueries(['materialChoices'])
      onSuccess(result)
    },
    onError: () => {
      onError()
    },
  })
}

export const useMaterialOptionDetails = ({
  materialOptionId,
}: {
  materialOptionId?: string
}) =>
  useQuery<MaterialOptionResponse, AxiosError>({
    queryKey: ['materialOptionDetails', materialOptionId],
    queryFn: async () => {
      if (materialOptionId) {
        const { data } = await axios.get<MaterialOptionResponse>(
          `${backendUrl}/material-option-details`,
          {
            headers: {
              Accept: 'application/json',
              Authorization: 'Bearer sometoken',
            },
            params: {
              materialOptionId: materialOptionId,
            },
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
  })
