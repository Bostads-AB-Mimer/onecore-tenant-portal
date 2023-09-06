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
  getContact,
  getMaterialOption,
  getMaterialChoices,
  getMaterialOptions,
} from './adapters/core-adapter'
import { getRentsForLease } from './adapters/rent-adapter'
import fs from 'fs/promises'

const getAccommodation = async (nationalRegistrationNumber: string) => {
  const lease = await getLease(nationalRegistrationNumber)

  lease.rentalProperty = await getApartment(lease.rentalPropertyId)

  lease.rentInfo = await getRentsForLease(lease.leaseId)

  return lease
}

export const routes = (router: KoaRouter) => {
  /**
   * Returns the details of the logged-in user's lease with populated
   * sub objects such as rental property, other tenants and rent.
   */
  router.get('(.*)/my-lease', async (ctx) => {
    const nationalRegistrationNumber = ctx.state.user.username

    const lease = await getAccommodation(nationalRegistrationNumber)

    ctx.body = {
      data: lease,
    }
  })

  router.get('(.*)/my-details', async (ctx: any) => {
    const nationalRegistrationNumber = ctx.state.user.username
    const contact = await getContact(nationalRegistrationNumber)

    ctx.body = { data: contact }
  })

  router.get('(.*)/material-options', async (ctx) => {
    const nationalRegistrationNumber = ctx.state.user.username
    const lease = await getAccommodation(nationalRegistrationNumber)

    const materialOptions = await getMaterialOptions(lease.rentalPropertyId)

    ctx.body = {
      data: materialOptions,
    }
  })

  router.get('(.*)/material-option-details', async (ctx) => {
    console.log('backend materail-option-details')
    if (ctx.request.query.materialOptionId) {
      console.log(
        'ctx.request.query.materialOptionId',
        ctx.request.query.materialOptionId
      )
      const nationalRegistrationNumber = ctx.state.user.username
      const lease = await getAccommodation(nationalRegistrationNumber)

      const option = await getMaterialOption(
        lease.rentalPropertyId,
        ctx.request.query.materialOptionId.toString()
      )

      // console.log('option', option)
      ctx.body = {
        data: option,
      }
    }
  })

  router.get('(.*)/material-options/assets/:id', async (ctx) => {
    const filename = ctx.params.id
    const path = process.cwd() + '/assets/' + filename
    const data = await fs.readFile(path)

    ctx.body = data
  })

  router.get('(.*)/material-choices', async (ctx) => {
    const nationalRegistrationNumber = ctx.state.user.username
    const lease = await getAccommodation(nationalRegistrationNumber)

    const roomTypes = await getMaterialChoices(lease.rentalPropertyId)

    ctx.body = {
      data: { roomTypes: roomTypes },
    }
  })

  /**
   * Streams the floor plan of the logged in user as an image binary
   */
  router.get('(.*)/my-lease/floorplan', async (ctx) => {
    const nationalRegistrationNumber = ctx.state.user.username
    const rentalPropertyId = (
      await getAccommodation(nationalRegistrationNumber)
    ).rentalPropertyId

    const response = await getFloorPlanStream(rentalPropertyId)
    ctx.type = response.headers['content-type']?.toString() ?? 'image/jpeg'
    ctx.headers['cache-control'] = 'public, max-age=600'
    ctx.body = response.data
  })
}
