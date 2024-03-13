import { H3Event, readBody } from 'h3'
import { prisma } from '~/server/utils/prisma'

const makeSlug = (title: string) => {
  return title.toLowerCase().split(' ').join('-')
}
export default defineEventHandler(async (event: H3Event) => {
  try {
    const user = event.context.auth
    const {title, content} = await readBody(event)

    if (!title || !content) {
      return sendError(event, createError({
        statusCode: 400,
        statusMessage: 'Incomplete input. Please fill in all required fields.'
      }))
    }

    const payload = {
      author_id: user.userId as number,
      slug: makeSlug(title),
      title: title as string,
      content: content as string,
    }

    await prisma.blogs.create({data: payload})
    return {
      message: 'successfully created'
    }
  } catch (e) {
    return sendError(event, createError({
      statusCode: 500,
      statusMessage: 'An error occurred while logging in'
    }))
  }
})
