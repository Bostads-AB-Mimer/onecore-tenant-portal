import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'

import config from '../../common/config'
import { getContact, getLease } from '../lease-service/adapters/core-adapter'

const getUser = async (personalNumber: string) => {
  const contact = await getContact(personalNumber)

  if (contact) {
    const user = {
      id: contact.contactId, // testuser.id,
      locked: false,
      disabled: false,
      failedLoginAttempts: 0,
      // passwordHash: testuser.hash,
      // salt: testuser.salt,
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

// export const createToken = async (username: string, password: string) => {
export const createToken = async (personalNumber: string) => {
  try {
    const user = await getUser(personalNumber)

    if (!user) {
      throw createHttpError(401, new Error(`Unknown user.`))
    }

    if (user.locked === true) {
      throw createHttpError(403, new Error(`User locked: ${personalNumber}.`))
    }

    if (user.disabled === true) {
      throw createHttpError(403, new Error(`User disabled: ${personalNumber}.`))
    }

    await setUserFailedLoginAttempts(user.id, 0)

    const lease = await getLease(personalNumber)

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
