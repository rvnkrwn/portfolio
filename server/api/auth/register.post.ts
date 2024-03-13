import { H3Event, readBody } from 'h3'
import bcrypt from 'bcryptjs'
import { prisma } from '~/server/utils/prisma'

const safePassword = (password: string) => {
  return bcrypt.hashSync(password, 10)
}

export default defineEventHandler(async (event: H3Event) => {
  try {
    const { password, ...data } = await readBody(event)
    const hashedPassword = await safePassword(password)
    const payload = { password: hashedPassword, ...data }
    await prisma.users.create({ data: payload })
    return {
      message: 'successfully created'
    }
  } catch (e) {
    return {
      error: 'An error occurred while creating user'
    }
  }
})
