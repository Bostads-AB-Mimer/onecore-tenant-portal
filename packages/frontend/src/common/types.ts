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
  rentInfo: RentInfo | undefined
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

interface RentInfo {
  currentRent: Rent
  futureRents: Array<Rent> | undefined
}

interface Rent {
  rentId: string
  leaseId: string
  currentRent: number
  additionalChargeDescription: string | undefined
  additionalChargeAmount: number | undefined
  rentStartDate: Date
  rentEndDate: Date | undefined
}

interface MaterialChoice {
  materialChoiceId?: string
  materialOptionId: string
  roomTypeId: string
  status: string
  dateOfSubmission?: Date
  dateOfCancellation?: Date
}

interface MaterialOption {
  materialOptionId: string
  roomTypeId: string
  caption: string
  shortDescription: string
  image: string
  detailsUrL: string
  type: string
  status: string
}

interface RoomType {
  roomTypeId: string
  name: string
}

interface MaterialOptions {
  roomTypeId: string
  roomTypeName: string
  concepts: Array<MaterialOption>
  addOns: Array<MaterialOption>
}

export type {
  Person,
  Lease,
  Apartment,
  LeaseStatus,
  Address,
  Rent,
  RentInfo,
  MaterialOption,
  MaterialOptions,
  MaterialChoice,
}
