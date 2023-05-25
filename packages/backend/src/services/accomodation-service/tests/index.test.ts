import request from 'supertest'
import Koa from 'koa'
import KoaRouter from '@koa/router'
import bodyParser from 'koa-bodyparser'
import { routes } from '../index'
import * as randomDataApiAdapter from '../adapters/tenant-lease-adapter'

const app = new Koa()
const router = new KoaRouter()
routes(router)
app.use(bodyParser())
app.use(router.routes())

describe('accomodation-service', () => {
  describe('GET /accomodation', () => {
    it('responds', async () => {
      const res = await request(app.callback()).get('/accomodation')
      expect(res.status).toBe(200)
      expect(res.body.data.lease).toBeDefined()
    })
  })
})
