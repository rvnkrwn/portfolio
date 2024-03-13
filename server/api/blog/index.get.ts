import { H3Event, readBody } from 'h3'
import { prisma } from '~/server/utils/prisma'
export default defineEventHandler(async (event: H3Event) => {
  try {
    const user = event.context.auth
    return {
      message: user
    }
  } catch (e) {
    return {
      error: 'An error occurred while creating blogs'
    }
  }
})
