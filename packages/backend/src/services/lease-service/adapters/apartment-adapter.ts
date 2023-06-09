import axios from 'axios'

import { Apartment } from '../types'

const getApartment = async (
  apartmentId: string,
  leaseId: string
): Promise<Apartment> => {
  const applianceNames = ['Tvättmaskin', 'Centraldammsugare']

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

export { getApartment }
