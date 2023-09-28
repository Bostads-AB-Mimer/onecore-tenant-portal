import { Context } from 'koa'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import Config from '../../../common/config'

let accessToken: string | undefined = undefined

const getAccessToken = async () => {
  const data = qs.stringify({
    grant_type: 'client_credentials',
    client_secret: Config.bankId.clientSecret,
    client_id: Config.bankId.clientId,
    scope: Config.bankId.scope,
  })

  const config = {
    method: 'post',
    url: `https://login.microsoftonline.com/${Config.bankId.tenantId}/oauth2/v2.0/token`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data,
  }
  try {
    const result = await axios(config)

    return result.data.access_token
  } catch (error) {
    console.log('couldnt get token')
    console.error(error)
    return ''
  }
}

//fix this subscription key
const createHeaders = (accessToken: string) => {
  const headers = {
    Authorization: 'Bearer ' + accessToken,
    'Ocp-Apim-Subscription-Key': Config.bankId.subscriptionKey,
  }

  return headers
}

const bankIdAPI = async (
  params: AxiosRequestConfig
): Promise<AxiosResponse<any, any>> => {
  if (!accessToken) {
    console.log('get access token')
    accessToken = await getAccessToken()
    console.log('accessToken', accessToken)
  }

  try {
    params.headers = createHeaders(accessToken ?? '')
    console.log('params before api call', JSON.stringify(params))
    return await axios(params)
  } catch (error) {
    const axiosErr = error as AxiosError

    if (axiosErr.response?.status === 401) {
      accessToken = await getAccessToken()
      return await bankIdAPI(params)
    }

    throw error
  }
}

/* TODO
 * Replace with BankID-inloggning:
 * - POST to BankID API - Test
 * - url: /transactions
 */
const login = () => {
  return async (ctx: Context) => {
    const data = {
      method: 'Auth',
      transactionParameters: {
        auth: {
          endUserIp: ctx.request.ip,
          requirement: {
            pinCode: null,
            machineReadableTravelDocument: null,
            cardReader: null,
            certificatePolicies: null,
            personalNumber: null,
          },
          userNonVisibleData: 'Jag autentiserar mig hos mimer',
          userVisibleData: 'Jag autentiserar mig hos mimer.',
          userVisibleDataFormat: 'simpleMarkdownV1',
        },
      },
      redirectUrl: Config.bankId.redirectUrl,
    }

    try {
      const response = await bankIdAPI({
        method: 'post',
        url: Config.bankId.url + '/transactions',
        data,
      })
      console.log('response', response)

      ctx.redirect(response.data.accessUrl)
    } catch (error) {
      console.error(error)
      //   ctx.next(error)
    }
  }
}

/*
 * TODO: Get transaction from BankID-api
 */
const authenticate = () => {
  return async (ctx: Context) => {
    const transactionId = ctx.param.transactionId

    //get transaction by transactionId
    try {
      const response = await bankIdAPI({
        method: 'get',
        url: Config.bankId.url + '/transactions/' + transactionId,
      })
      console.log('response', response)
      if (response.data?.status == 'Complete') {
        const personalNumber =
          response.data?.processingInfo?.completionData.personalNumber

        return personalNumber
      } else {
        //TODO: Handle request not complete
      }
    } catch (error) {
      ctx.next(error)
    }
  }
}

export { login, authenticate }
