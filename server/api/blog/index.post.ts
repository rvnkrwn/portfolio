import { H3Event, readBody } from 'h3'
import { prisma } from '~/server/utils/prisma'
export default defineEventHandler(async (event: H3Event) => {
  try {
    const data = await readBody(event)
    await prisma.blogs.create({ data })
    return {
      message: 'successfully created'
    }
  } catch (e) {
    return {
      error: 'An error occurred while creating blogs'
    }
  }
})
