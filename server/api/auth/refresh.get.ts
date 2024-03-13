import { decodeRefreshToken, generateToken, getRefreshTokenByToken } from '~/server/utils/jwt'
import { userPayload } from '~/server/type/userType'

export default defineEventHandler(async (event) => {
  try {
    const refreshToken = getCookie(event, 'refresh_token')

    if (!refreshToken) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Refresh token is invalid'
      }))
    }

    const rToken = await getRefreshTokenByToken(refreshToken)

    if (!rToken) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Refresh token is invalid'
      }))
    }

    const token: any = decodeRefreshToken(refreshToken)

    if (!token) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Refresh token is invalid'
      }))
    }

    try {
      const user = await prisma.users.findUnique({
        where: {
          id: token.userId
        }
      })

      const { accessToken } = generateToken(user as unknown as userPayload)

      return {
        access_token: accessToken
      }
    } catch (e) {
      return sendError(event, createError({
        statusCode: 500,
        statusMessage: 'Something went wrong'
      }))
    }
  } catch (e: any) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    }))
  }
})
