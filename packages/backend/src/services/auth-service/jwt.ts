import jwt from 'jsonwebtoken'
import createHttpError from 'http-errors'

import config from '../../common/config'
import { getContact } from '../lease-service/adapters/core-adapter'

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

    // if (user.passwordHash !== (await hash.hashPassword(password, user.salt))) {
    //   const fails = user.failedLoginAttempts + 1

    //   await setUserFailedLoginAttempts(user.id, fails)

    //   if (fails >= config.auth.maxFailedLoginAttempts) {
    //     await setUserLocked(user.id, true)
    //   }

    //   throw createHttpError(401, new Error(`Unknown user or invalid password.`))
    // }

    // Clear failed login attempts
    await setUserFailedLoginAttempts(user.id, 0)

    // Create token
    const token = jwt.sign(
      {
        sub: user.id,
        username: user.id,
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
