import { H3Event, readBody } from 'h3'
import { prisma } from '~/server/utils/prisma'
export default defineEventHandler(async (event: H3Event) => {
  try {
    return {
      message: 'successfully created'
    }
  } catch (e) {
    return {
      error: 'An error occurred while creating blogs'
    }
  }
})
