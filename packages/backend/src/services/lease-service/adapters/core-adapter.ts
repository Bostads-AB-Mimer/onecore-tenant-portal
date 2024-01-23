import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import { Contact, Lease, MaterialChoice, MaterialOption } from '../types'
import Config from '../../../common/config'
import { RentalProperty, MaterialOptionGroup } from '../types'

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

const getContact = async (
  nationalRegistrationNumber: string
): Promise<Contact> => {
  const contactResponse = await getFromCore({
    method: 'get',
    url: coreBaseUrl + '/contact/' + nationalRegistrationNumber,
  })
  return contactResponse.data.data
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

const getMaterialOptions = async (
  rentalPropertyId: string
): Promise<Array<MaterialOptionGroup>> => {
  const materialOptionsResponse = await getFromCore({
    method: 'get',
    url: `${coreBaseUrl}/rentalproperties/${rentalPropertyId}/material-options`,
  })

  return materialOptionsResponse.data
}

const getMaterialOption = async (
  rentalPropertyId: string,
  materialOptionId: string
): Promise<MaterialOption | undefined> => {
  const materialOptionsResponse = await getFromCore({
    method: 'get',
    url: `${coreBaseUrl}/rentalproperties/${rentalPropertyId}/material-option/${materialOptionId}`,
  })

  return materialOptionsResponse.data
}

const getMaterialChoices = async (rentalPropertyId: string) => {
  const materialChoicesResponse = await getFromCore({
    method: 'get',
    url: `${coreBaseUrl}/rentalproperties/${rentalPropertyId}/rooms-with-material-choices`,
  })

  return materialChoicesResponse.data
}

const saveMaterialChoice = async (
  rentalPropertyId: string,
  materialChoices: Array<MaterialChoice>
) => {
  const result = await getFromCore({
    method: 'post',
    url: `${coreBaseUrl}/rentalproperties/${rentalPropertyId}/material-choices`,
    data: materialChoices,
  })

  return result
}

export {
  getApartment,
  getFloorPlanStream,
  getLease,
  getContact,
  getMaterialOptions,
  getMaterialOption,
  getMaterialChoices,
  saveMaterialChoice,
}
