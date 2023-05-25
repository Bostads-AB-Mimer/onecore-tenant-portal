import KoaRouter from '@koa/router'
import { routes as accomodationRoutes } from './services/accomodation-service'

const router = new KoaRouter()

accomodationRoutes(router)

export default router
