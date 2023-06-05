import axios from 'axios'

import { Apartment, RoomType } from '../types'

const getApartment = async (
  apartmentId: string,
  leaseId: string
): Promise<Apartment> => {
  const appliances = await axios(
    'https://random-data-api.com/api/v2/appliances?size=3'
  )
  const applianceNames = appliances.data.reduce((list: string[], item: any) => {
    list.push(item.equipment)
    return list
  }, [])

  return {
    apartmentId,
    leaseId,
    lease: undefined,
    apartmentNumber: Math.round(Math.random() * 1000),
    size: Math.round(Math.random() * 200),
    addressId: '1337',
    address: undefined,
    apartmentType: Math.round((Math.random() + 0.1) * 6) + ' rum och kök',
    additionsIncludedInRent: applianceNames.join(', '),
    otherInfo: 'Uttag stadsnät xxx123123',
  }
}

const getRoomTypes = async (aparmentId: string): Promise<Array<RoomType>> => {
  /*Get real data*/
  return [
    { roomTypeId: '1', name: 'Kök' },
    { roomTypeId: '2', name: 'Badrum' },
    { roomTypeId: '3', name: 'Vardagsrum' },
    { roomTypeId: '4', name: 'Sovrum 1' },
  ]
}

export { getApartment, getRoomTypes }
