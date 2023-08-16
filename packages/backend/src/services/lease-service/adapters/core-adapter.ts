import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Lease } from '../types'
import Config from '../../../common/config'
import { RentalProperty, RoomType } from '../types'

const coreBaseUrl = Config.core.url
const coreUsername = Config.core.username
const corePassword = Config.core.password
let accessToken: string | undefined = undefined

const getAccessToken = async () => {
  const config = {
    method: 'post',
    url: `${coreBaseUrl}/auth/generatetoken`,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      username: coreUsername,
      password: corePassword,
    },
  }

  const result = await axios(config)

  return result.data.token
}

const createHeaders = (accessToken: string) => {
  const headers = {
    Authorization: 'Bearer ' + accessToken,
  }

  return headers
}

const getFromCore = async (
  config: AxiosRequestConfig<any>
): Promise<AxiosResponse<any, any>> => {
  if (!accessToken) {
    accessToken = await getAccessToken()
  }

  try {
    config.headers = createHeaders(accessToken ?? '')

    return await axios(config)
  } catch (error) {
    const axiosErr = error as AxiosError

    if (axiosErr.response?.status === 401) {
      accessToken = await getAccessToken()
      return await getFromCore(config)
    }

    throw error
  }
}

const getLease = async (nationalRegistrationNumber: string): Promise<Lease> => {
  const leaseResponse = await getFromCore({
    method: 'get',
    url: coreBaseUrl + '/leases/for/' + nationalRegistrationNumber,
  })

  return leaseResponse.data.data[0]
}

const getApartment = async (
  rentalPropertyId: string
): Promise<RentalProperty> => {
  const leaseResponse = await getFromCore({
    method: 'get',
    url: coreBaseUrl + '/rentalproperties/' + rentalPropertyId,
  })

  return leaseResponse.data.data
}

const getFloorPlanStream = async (rentalPropertyId: string) => {
  const url = `${Config.core.url}/rentalproperties/${rentalPropertyId}/floorplan`

  const response = await getFromCore({
    method: 'get',
    url: url,
    responseType: 'stream',
  })

  return response
}

const getRoomTypes = async (aparmentId: string): Promise<Array<RoomType>> => {
  /*Get real data*/
  return [
    { roomTypeId: '1', name: 'Kök & Hall' },
    { roomTypeId: '2', name: 'Badrum' },
    { roomTypeId: '3', name: 'Vardagsrum' },
    { roomTypeId: '4', name: 'Sovrum 1' },
  ]
}

const getRoomType = async (
  aparmentId: string,
  roomTypeId: string
): Promise<RoomType | undefined> => {
  /*Get real data*/
  const roomTypes = await getRoomTypes(aparmentId)

  return roomTypes.find(
    (roomType: RoomType) => roomType.roomTypeId == roomTypeId
  )
}

export { getApartment, getFloorPlanStream, getLease, getRoomType, getRoomTypes }
