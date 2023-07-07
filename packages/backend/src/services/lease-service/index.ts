/**
 * Self-contained service, ready to be extracted into a micro service if appropriate.
 *
 * All adapters such as database clients etc. should go into subfolders of the service,
 * not in a general top-level adapter folder to avoid service interdependencies (but of
 * course, there are always exceptions).
 */
import KoaRouter from '@koa/router'
import {
  getLease,
  getApartment,
  getFloorPlanStream,
} from './adapters/core-adapter'
import { getRentsForLease } from './adapters/rent-adapter'

const getAccommodation = async (nationalRegistrationNumber: string) => {
  const lease = await getLease(nationalRegistrationNumber)

  lease.rentalProperty = await getApartment(lease.rentalPropertyId)

  lease.rentInfo = await getRentsForLease(lease.leaseId)

  return lease
}

interface MockCookie {
  nationalRegistrationNumber: string
  rentalPropertyId?: string
}

const mockedCookie: MockCookie = {
  nationalRegistrationNumber: '194712306903' /*'200403017809'*/,
}

export const routes = (router: KoaRouter) => {
  /**
   * Returns the details of the logged-in user's lease with populated
   * sub objects such as rental property, other tenants and rent.
   */
  router.get('(.*)/my-lease', async (ctx) => {
    const lease = await getAccommodation(
      mockedCookie.nationalRegistrationNumber
    )

    ctx.body = {
      data: lease,
    }
  })

  /**
   * Streams the floor plan of the logged in user as an image binary
   */
  router.get('(.*)/my-lease/floorplan', async (ctx) => {
    if (!mockedCookie.rentalPropertyId) {
      mockedCookie.rentalPropertyId = (
        await getAccommodation(mockedCookie.nationalRegistrationNumber)
      ).rentalPropertyId
    }

    const response = await getFloorPlanStream(mockedCookie.rentalPropertyId)
    ctx.type = response.headers['content-type']?.toString() ?? 'image/jpeg'
    ctx.headers['cache-control'] = 'public, max-age=600'
    ctx.body = response.data
  })
}
