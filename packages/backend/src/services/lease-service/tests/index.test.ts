import request from 'supertest'
import Koa from 'koa'
import KoaRouter from '@koa/router'
import bodyParser from 'koa-bodyparser'
import { routes } from '../index'
import koaJwt from 'koa-jwt'
import jwt from 'jsonwebtoken'

import * as coreAdapter from '../adapters/core-adapter'
import config from '../../../common/config'

const app = new Koa()
const router = new KoaRouter()
routes(router)
app.use(bodyParser())
app.use(koaJwt({ secret: config.auth.secret, cookie: 'onecore' }))
app.use(router.routes())

describe('lease-service index', () => {
  describe('GET /material-choices', () => {
    it('responds', async () => {
      const token = jwt.sign(
        {
          sub: 'foo',
          username: 'bar',
          rentalPropertyId: '1',
        },
        config.auth.secret,
        {
          expiresIn: config.auth.expiresIn,
        }
      )

      const materialChoicesSpy = jest
        .spyOn(coreAdapter, 'getMaterialChoices')
        .mockResolvedValue({
          roomTypes: [
            {
              roomTypeId: 'BADRUM',
              name: 'BADRUM',
              materialOptionGroups: [Array],
            },
            { roomTypeId: 'KÖK', name: 'KÖK', materialOptionGroups: [Array] },
            {
              roomTypeId: 'RUM 1',
              name: 'RUM 1',
              materialOptionGroups: [Array],
            },
            {
              roomTypeId: 'VARDAGSRUM',
              name: 'VARDAGSRUM',
              materialOptionGroups: [Array],
            },
          ],
        })

      const res = await request(app.callback())
        .get('/material-choices')
        .set('Authorization', 'Bearer ' + token)

      expect(res.status).toBe(200)
      expect(materialChoicesSpy).toHaveBeenCalled()
      expect(res.body.content.roomTypes).toBeDefined()
    })
  })
})
