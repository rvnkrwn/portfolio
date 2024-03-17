import { H3Event } from 'h3'
import UrlPattern from 'url-pattern'
import { decodeAccessToken } from '~/server/utils/jwt'
import { userPayload } from '~/server/type/userType'
import { userTransformer } from '~/server/utils/transform'

export default defineEventHandler(async (event: H3Event) => {
  try {
    const endpoints = [
      '/api/auth/user',
      '/api/blog'
    ]

    const isHandlerByThisMiddleware = endpoints.some((endpoint) => {
      const pattern = new UrlPattern(endpoint)

      return pattern.match(event.node.req.url as string)
    })

    if (!isHandlerByThisMiddleware || (event.method === 'GET' && event.node.req.url === '/api/blog')) { return }

    const token = event.req.headers.authorization?.split(' ')[1]

    if (!token) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      }))
    }

    const decoded: userPayload | any = decodeAccessToken(token)

    if (!decoded) {
      deleteCookie(event, 'refresh_token')
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Unauthorized'
      }))
    }

    const userId = decoded?.userId

    try {
      const user = await prisma.users.findUnique({
        where: {
          id: userId
        }
      })

      event.context.auth = userTransformer(user)
    } catch (error) {
      return sendError(event, createError({
        statusCode: 500,
        statusMessage: 'Something went wrong sss'
      }))
    }
  } catch (e) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'Something went wrongs'
    }))
  }
})
