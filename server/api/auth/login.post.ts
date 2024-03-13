import { H3Event, readBody } from 'h3'
import bcrypt from 'bcryptjs'
import { prisma } from '~/server/utils/prisma'
import { generateToken, saveRefreshToken, sendRefreshToken } from '~/server/utils/jwt'
import { userTransformer } from '~/server/utils/transform'

const matchingPassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash)
}

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { email, password } = await readBody(event)

    if (!email || !password) {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: 'Incomplete input. Please fill in all required fields.'
      }))
    }

    const user: any = await prisma.users.findUnique({
      where: {
        email
      }
    })

    if (!user) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials. Please check your username and password.'
      }))
    }

    const matchedPassword = matchingPassword(password, user.password)

    if (!matchedPassword) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials. Please check your username and password.'
      }))
    }

    const { accessToken, refreshToken } = generateToken(user)

    await saveRefreshToken(refreshToken, user.id)

    sendRefreshToken(event, refreshToken)
    return {
      message: 'Login successful',
      accessToken,
      user: userTransformer(user)
    }
  } catch (e) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'An error occurred while logging in'
    }))
  }
})
