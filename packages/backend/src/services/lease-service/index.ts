/**
 * Self-contained service, ready to be extracted into a micro service if appropriate.
 *
 * All adapters such as database clients etc. should go into subfolders of the service,
 * not in a general top-level adapter folder to avoid service interdependencies (but of
 * course, there are always exceptions).
 */
import KoaRouter from '@koa/router'
import { getLease } from './adapters/tenant-lease-adapter'
import { getApartment, getRoomTypes } from './adapters/apartment-adapter'
import { getRentsForLease } from './adapters/rent-adapter'
import { MaterialOptionGroup, RoomType } from './types'
import { getMaterialOptionGroupsByRoomType } from './adapters/material-options-adapter'

const getAccommodation = async (rentalId: string) => {
  const lease = await getLease(rentalId)

  lease.apartment = await getApartment(lease.apartmentId, lease.leaseId)
  lease.apartment.addressId = lease.tenants?.[0].address?.addressId ?? '123'
  lease.apartment.address = lease.tenants?.[0].address

  lease.rentInfo = await getRentsForLease(lease.leaseId)

  return lease
}

const getMaterialOptionGroupsByRoomTypes = async (apartmentId: string) => {
  const roomTypes = await getRoomTypes(apartmentId)

  roomTypes.forEach(async (roomType: RoomType) => {
    roomType.materialOptionGroups = await getMaterialOptionGroupsByRoomType(
      roomType.roomTypeId
    )
  })

  return roomTypes

  // const materialOptions = await Promise.all(
  //   roomTypes.map(async (room: RoomType) => {
  //     const materialOptionGroups = await getMaterialOptionGroupsByRoomType(
  //       room.roomTypeId
  //     )
  //     return materialOptionGroups.map(
  //       (materialOptionGroup: MaterialOptionGroup) => {
  //         materialOptionGroup.roomTypeName = room.name
  //         return materialOptionGroup
  //       }
  //     )
  //   })
  // )

  // return materialOptions
}

/**
 * Returns the details of the logged-in user's lease with populated
 * sub objects
 */
export const routes = (router: KoaRouter) => {
  router.get('(.*)/my-lease', async (ctx) => {
    const lease = await getAccommodation(
      Math.round(Math.random() * 100000).toString()
    )

    ctx.body = {
      data: { lease },
    }
  })

  router.get('(.*)/material-options', async (ctx) => {
    const roomTypes = await getMaterialOptionGroupsByRoomTypes(
      Math.round(Math.random() * 100000).toString()
    )

    ctx.body = {
      data: { roomTypes },
    }
  })
}
