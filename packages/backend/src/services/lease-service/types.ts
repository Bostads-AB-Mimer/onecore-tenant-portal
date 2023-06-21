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
  materialChoiceId: string
  materialOptionId: string
  materialOptionGroupId: string
  apartmentId: string
  roomTypeId: string
  materialOption?: MaterialOption | undefined
  // materialOptionGroup?: MaterialOptionGroup | undefined
  // roomType?: RoomType | undefined
  status: string //TODO enum of Draft/Submitted/Cancelled
  dateOfSubmission?: Date
  dateOfCancellation?: Date
}

interface MaterialOptionGroup {
  materialOptionGroupId: string
  roomTypeId: string
  roomTypeName?: string
  name?: string
  actionName?: string
  materialOptions?: Array<MaterialOption>
  materialChoices?: Array<MaterialChoice>
  type: string //TODO enum of Concept/AddOn/SingleChoice
}

interface MaterialOption {
  materialOptionId: string
  caption: string
  shortDescription?: string
  description?: string
  coverImage?: string
  images?: Array<string>
  roomTypeName?: string
  materialOptionGroupName?: string
}

interface RoomType {
  roomTypeId: string
  name: string
  materialOptionGroups?: Array<MaterialOptionGroup>
}

export {
  Person,
  Lease,
  Apartment,
  LeaseStatus,
  Address,
  Rent,
  RentInfo,
  MaterialOption,
  MaterialOptionGroup,
  RoomType,
  MaterialChoice,
}
