interface Person {
  personId: string
  firstName: string
  lastName: string
  nationalRegistrationNumber: string
  birthDate: string
  addressId: string
  address: Address | undefined
  mobilePhone: string
  phoneNumber: string
  emailAddress: string
}

interface Lease {
  leaseId: string
  leaseNumber: string
  leaseStartDate: Date
  leaseEndDate: Date
  status: LeaseStatus
  tenantPersonIds: string[]
  tenants: Person[] | undefined
  apartmentId: string
  apartment: Apartment | undefined
  rentId: string
  rent: Rent
}

interface Apartment {
  apartmentId: string
  leaseId: string
  lease: Lease | undefined
  apartmentNumber: number
  size: number
  addressId: string
  address: Address | undefined
  apartmentType: string
  additionsIncludedInRent: string
  otherInfo: string | undefined
}

interface Address {
  addressId: string
  street: string
  number: string
  postalCode: string
  city: string
}

enum LeaseStatus {
  Active,
}

interface Rent {
  rentId: string
  leaseId: string
  currentRent: number
  additionalChargeDescription: string | undefined
  additionalChargeAmount: number | undefined
}

export { Person, Lease, Apartment, LeaseStatus, Address, Rent }
