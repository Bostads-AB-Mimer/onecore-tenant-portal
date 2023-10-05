import { Context } from 'koa'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import createHttpError from 'http-errors'
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
    console.error(error)
    return ''
  }
}

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
    accessToken = await getAccessToken()
  }

  try {
    params.headers = createHeaders(accessToken ?? '')
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

const login = () => {
  return async (ctx: Context) => {
    //Replacing ::ffff: is a fix since the bankID micro service doesn't allow for the IPv6 kind of IP addresses
    const endUserIp =
      ctx.request.ip == '::1'
        ? '127.0.0.1'
        : ctx.request.ip.replace('::ffff:', '')

    const redirectQuery =
      ctx.query.redirectUrl && ctx.query.redirectUrl != ''
        ? '?redirectUrl=' + ctx.query.redirectUrl.toString()
        : ''

    const data = {
      method: 'Auth',
      transactionParameters: {
        auth: {
          endUserIp: endUserIp,
          requirement: {
            pinCode: null,
            machineReadableTravelDocument: null,
            cardReader: null,
            certificatePolicies: null,
            personalNumber: null,
          },
          userNonVisibleData: 'Jag autentiserar mig hos Mimer Bostads AB',
          userVisibleData: 'Jag autentiserar mig hos Mimer Bostads AB.',
          userVisibleDataFormat: 'simpleMarkdownV1',
        },
      },
      redirectUrl: Config.bankId.redirectUrl + redirectQuery,
    }

    try {
      const response = await bankIdAPI({
        method: 'post',
        url: Config.bankId.url + '/transactions',
        data,
      })

      ctx.redirect(response.data.accessUrl)
    } catch (error) {
      ctx.next(error)
    }
  }
}

const authenticate = () => {
  return async (ctx: Context) => {
    const transactionId = ctx.query.transaction_id

    try {
      const response = await bankIdAPI({
        method: 'get',
        url: Config.bankId.url + '/transactions/' + transactionId,
      })
      if (response.data?.status == 'Complete') {
        const personalNumber =
          response.data?.processingInfo?.completionData.user.personalNumber

        return personalNumber
      } else {
        throw createHttpError(401, new Error('Login failed'))
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}

export { login, authenticate }
