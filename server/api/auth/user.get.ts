import { H3Event } from 'h3'

export default defineEventHandler((event: H3Event) => {
  return {
    user: event.context.auth
  }
})
