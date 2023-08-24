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
  getRoomTypes,
  getRoomType,
} from './adapters/core-adapter'
import { getRentsForLease } from './adapters/rent-adapter'
import { RoomType } from './types'
import {
  getMaterialOptionGroupsByRoomType,
  getMaterialOption,
  getMaterialOptionGroup,
  getMaterialChoices,
} from './adapters/material-options-adapter'
import fs from 'fs/promises'

const getAccommodation = async (nationalRegistrationNumber: string) => {
  const lease = await getLease(nationalRegistrationNumber)

  lease.rentalProperty = await getApartment(lease.rentalPropertyId)

  lease.rentInfo = await getRentsForLease(lease.leaseId)

  return lease
}

const getRoomTypeWithMaterialOptions = async (apartmentId: string) => {
  const roomTypes = await getRoomTypes(apartmentId)

  roomTypes.forEach(async (roomType: RoomType) => {
    roomType.materialOptionGroups = await getMaterialOptionGroupsByRoomType(
      roomType.roomTypeId
    )
  })

  return roomTypes
}

const getSingleMaterialOption = async (
  apartmentId: string,
  roomTypeId: string,
  materialOptionGroupId: string,
  materialOptionId: string
) => {
  const roomType = await getRoomType(apartmentId, roomTypeId)
  const group = await getMaterialOptionGroup(roomTypeId, materialOptionGroupId)
  const option = await getMaterialOption(
    roomTypeId,
    materialOptionGroupId,
    materialOptionId
  )

  if (option) {
    option.roomTypeName = roomType && roomType.name
    option.materialOptionGroupName = option && group && group.name
  }

  return option
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

  router.get('(.*)/material-options', async (ctx) => {
    const roomTypes = await getRoomTypeWithMaterialOptions(
      Math.round(Math.random() * 100000).toString()
    )

    ctx.body = {
      data: { roomTypes },
    }
  })

  router.get('(.*)/material-option-details', async (ctx) => {
    if (
      ctx.request.query.roomTypeId &&
      ctx.request.query.materialOptionGroupId &&
      ctx.request.query.materialOptionId
    ) {
      const option = await getSingleMaterialOption(
        Math.round(Math.random() * 100000).toString(),
        ctx.request.query.roomTypeId[0],
        ctx.request.query.materialOptionGroupId[0],
        ctx.request.query.materialOptionId[0]
      )

      ctx.body = {
        data: { materialOption: option },
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
    let roomTypes = new Array<RoomType>()
    if (ctx.request.query.apartmentId && ctx.request.query.apartmentId[0]) {
      const apartmentId = ctx.request.query.apartmentId[0]
      roomTypes = await getRoomTypes(apartmentId)

      for (const roomType of roomTypes) {
        const materialGroups = await getMaterialChoices({
          apartmentId: apartmentId,
          roomTypeId: roomType.roomTypeId,
        })
        roomType.materialOptionGroups = materialGroups
      }
    }
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
