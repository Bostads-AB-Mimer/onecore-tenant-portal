import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'

import config from '../../common/config'
import { getContact, getLease } from '../lease-service/adapters/core-adapter'

const getUser = async (personalNumber: string) => {
  const contact = await getContact(personalNumber)
  const lease = await getLease(personalNumber)

  if (contact && lease) {
    const user = {
      id: contact.contactId,
      locked: false,
      disabled: false,
      failedLoginAttempts: 0,
      rentalPropertyId: lease.rentalPropertyId,
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

    if (user.locked === true) {
      throw createHttpError(403, new Error(`User locked.`))
    }

    if (user.disabled === true) {
      throw createHttpError(403, new Error(`User disabled.`))
    }

    await setUserFailedLoginAttempts(user.id, 0)

    // Create token
    const token = jwt.sign(
      {
        sub: user.id,
        username: personalNumber,
        rentalPropertyId: user.rentalPropertyId,
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
