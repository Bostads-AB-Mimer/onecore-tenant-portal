import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'

import config from '../../common/config'
import {
  getApartment,
  getContact,
  getLease,
} from '../lease-service/adapters/core-adapter'

const getUser = async (personalNumber: string) => {
  const contact = await getContact(personalNumber)

  if (contact) {
    const user = {
      id: contact.contactId,
      locked: false,
      disabled: false,
      failedLoginAttempts: 0,
    }

    return user
  } else {
    return null
  }
}

const setUserFailedLoginAttempts = async (userId: string, attempts: number) => {
  return
}

const setUserLocked = async (userId: string, locked: boolean) => {
  return
}

export const createToken = async (personalNumber: string) => {
  try {
    const user = await getUser(personalNumber)

    if (!user) {
      throw createHttpError(401, new Error(`Unknown user.`))
    }

    if (user.locked) {
      throw createHttpError(403, new Error(`User locked.`))
    }

    if (user.disabled) {
      throw createHttpError(403, new Error(`User disabled.`))
    }

    const lease = await getLease(personalNumber)

    if (!lease) {
      throw createHttpError(401, new Error(`User doesn't have a lease.`))
    }

    const rentalProperty = await getApartment(lease.rentalPropertyId)

    if (!rentalProperty) {
      throw createHttpError(
        401,
        new Error(`User doesn't have a rental property.`)
      )
    }

    await setUserFailedLoginAttempts(user.id, 0)

    // Create token
    const token = jwt.sign(
      {
        sub: user.id,
        username: personalNumber,
        rentalPropertyId: lease.rentalPropertyId,
      },
      config.auth.secret,
      {
        expiresIn: config.auth.expiresIn,
      }
    )

    return { token }
  } catch (error) {
    console.error(error)
    throw error
  }
}
