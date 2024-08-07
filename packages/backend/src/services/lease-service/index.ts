/**
 * Self-contained service, ready to be extracted into a microservice if appropriate.
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
  saveMaterialChoice,
} from './adapters/core-adapter'
import { getRentsForLease } from './adapters/rent-adapter'
import fs from 'fs/promises'
import { MaterialChoice } from './types'
import { generateRouteMetadata } from 'onecore-utilities'

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
    const metadata = generateRouteMetadata(ctx)
    const nationalRegistrationNumber = ctx.state.user.username

    const lease = await getAccommodation(nationalRegistrationNumber)

    ctx.body = {
      content: lease,
      ...metadata,
    }
  })

  router.get('(.*)/my-details', async (ctx: any) => {
    const metadata = generateRouteMetadata(ctx)
    const nationalRegistrationNumber = ctx.state.user.username
    const contact = await getContact(nationalRegistrationNumber)

    ctx.body = { content: contact, ...metadata }
  })

  router.get('(.*)/material-options', async (ctx) => {
    const metadata = generateRouteMetadata(ctx)
    const materialOptions = await getMaterialOptions(
      ctx.state.user.rentalPropertyId
    )

    ctx.body = {
      content: materialOptions,
      ...metadata,
    }
  })

  router.get('(.*)/material-option-details', async (ctx) => {
    const metadata = generateRouteMetadata(ctx, ['materialOptionId'])
    if (ctx.request.query.materialOptionId) {
      const option = await getMaterialOption(
        ctx.state.user.rentalPropertyId,
        ctx.request.query.materialOptionId.toString()
      )

      ctx.body = {
        content: option,
        ...metadata,
      }
    }
  })

  router.get('(.*)/material-options/assets/:id', async (ctx) => {
    const metadata = generateRouteMetadata(ctx)
    const filename = ctx.params.id
    const path = process.cwd() + '/assets/' + filename
    const data = await fs.readFile(path)

    ctx.body = { content: data, ...metadata }
  })

  router.get('(.*)/material-choices', async (ctx) => {
    const metadata = generateRouteMetadata(ctx)
    const roomTypes = await getMaterialChoices(ctx.state.user.rentalPropertyId)

    ctx.body = { content: roomTypes, ...metadata }
  })

  router.post('(.*)/material-choices', async (ctx) => {
    const metadata = generateRouteMetadata(ctx)
    if (ctx.request.body) {
      const choices: Array<MaterialChoice> = ctx.request.body?.choices.map(
        (choice: MaterialChoice) => {
          return {
            materialOptionId: choice.materialOptionId,
            roomTypeId: choice.roomTypeId,
            apartmentId: ctx.state.user.rentalPropertyId,
          }
        }
      )
      await saveMaterialChoice(ctx.state.user.rentalPropertyId, choices)

      ctx.body = { message: 'Save successful', ...metadata }
    } else {
      ctx.body = { message: 'No choices proviced', ...metadata }
    }
  })

  /**
   * Streams the floor plan of the logged in user as an image binary
   */
  router.get('(.*)/my-lease/floorplan', async (ctx) => {
    const metadata = generateRouteMetadata(ctx)
    const response = await getFloorPlanStream(ctx.state.user.rentalPropertyId)

    ctx.type = response.headers['content-type']?.toString() ?? 'image/jpeg'
    ctx.headers['cache-control'] = 'public, max-age=600'
    ctx.body = { content: response.data, ...metadata }
  })
}
