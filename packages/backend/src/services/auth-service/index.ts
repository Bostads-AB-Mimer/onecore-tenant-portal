import KoaRouter from '@koa/router'

import hash from './hash'
import { createToken } from './jwt'
import createHttpError from 'http-errors'
import { login, authenticate } from './adapters/bankid-adapter'
import config from '../../common/config'

export const routes = (router: KoaRouter) => {
  router.get('(.*)/auth/login', async (ctx) => {
    await login()(ctx)
  })

  router.get('(.*)/auth/logout', async (ctx) => {
    ctx.cookies.set('yggdrasil', null)

    ctx.redirect('/logga-in')
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

      return ctx.redirect('/')
    } catch (error) {
      if (createHttpError.isHttpError(error)) {
        return ctx.redirect(
          '/logga-in?error=' + (error as createHttpError.HttpError).statusCode
        )
      } else {
        return ctx.redirect(
          '/logga-in?error=' + (error as createHttpError.HttpError).statusCode
        )
      }
    }
  })
}
