import KoaRouter from '@koa/router'

import hash from './hash'
import { createToken } from './jwt'
import createHttpError from 'http-errors'
import { login, authenticate } from './adapters/bankid-adapter'
import config from '../../common/config'

export const routes = (router: KoaRouter) => {
  /**
   * @swagger
   * /auth/generatehash:
   *  get:
   *    summary: Generates a salt and hashes the given password using that salt.
   *    description: Generates a salt and hashes the given password using that salt. Pass cleartext password as query parameter.
   *    parameters:
   *      - in: query
   *        name: password
   *        required: true
   *        type: string
   *        description: The cleartext password that should be hashed
   *    responses:
   *      '200':
   *        description: 'Hashed password and salt'
   *        schema:
   *            type: object
   *            properties:
   *              passwordHash:
   *                type: string
   *              salt:
   *                type: string
   */
  router.get('(.*)/auth/generatehash', async (ctx) => {
    const { query } = ctx

    if (!query.password) {
      ctx.status = 400
      ctx.body = { errorMessage: 'Missing parameter: password' }
      return
    }

    const saltAndHash = await hash.createSaltAndHash(query.password as string)
    ctx.body = saltAndHash
  })

  router.get('(.*)/auth/login', async (ctx) => {
    await login()(ctx)
    // const username = ctx.request.body?.username as string
    // const password = ctx.request.body?.password as string

    // if (!username || !password) {
    //   ctx.status = 400
    //   ctx.body = { errorMessage: 'Missing parameter(s): username, password' }
    //   return
    // }

    // try {
    // const token = await createToken(username, password)

    // ctx.cookies.set('yggdrasil', token.token, {
    //   httpOnly: true,
    //   overwrite: true,
    //   sameSite: 'lax',
    //   secure: false,
    //   domain: config.auth.cookieDomain,
    // })

    //   ctx.body = { message: 'Login successful' }
    // } catch (error) {
    //   if (createHttpError.isHttpError(error)) {
    //     ctx.status = (error as createHttpError.HttpError).statusCode
    //     ctx.body = { message: (error as createHttpError.HttpError).message }
    //   } else {
    //     ctx.status = 500
    //     ctx.body = { message: (error as Error).message }
    //   }
    // }
  })

  router.get('(.*)/auth/authenticate', async (ctx) => {
    const personalNumber = await authenticate()(ctx)

    try {
      const token = await createToken(personalNumber)

      ctx.cookies.set('yggdrasil', token.token, {
        httpOnly: true,
        overwrite: true,
        sameSite: 'lax',
        secure: false,
        domain: config.auth.cookieDomain,
      })

      ctx.body = { message: 'Login successful' }
    } catch (error) {
      if (createHttpError.isHttpError(error)) {
        ctx.status = (error as createHttpError.HttpError).statusCode
        ctx.body = { message: (error as createHttpError.HttpError).message }
      } else {
        ctx.status = 500
        ctx.body = { message: (error as Error).message }
      }
    }

    return ctx.redirect('/')
  })
}
