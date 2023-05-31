import { Rent } from '../types'

const getRent = async (rentId: string, leaseId: string): Promise<Rent> => {
  const applianceNames = ['tapet', 'torktumlare']

  return {
    rentId,
    leaseId,
    currentRent: Math.round(Math.random() * 10000),
    additionalChargeDescription: 'Tillval för ' + applianceNames.join(', '),
    additionalChargeAmount: Math.round(Math.random() * 1000),
  }
}

export { getRent }
