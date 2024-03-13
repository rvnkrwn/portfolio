import jwt from 'jsonwebtoken'
import { H3Event } from 'h3'
import { transformerPayloadJWT } from '~/server/type/userType'

const config = useRuntimeConfig()

const generateAccessToken = (user: any) => {
  return jwt.sign(
    transformerPayloadJWT(user),
        config.jwtAccessSecret as string,
        { expiresIn: '10m' }
  )
}

const generateRefreshToken = (user: any) => {
  return jwt.sign(
    transformerPayloadJWT(user),
        config.jwtRefreshSecret as string,
        { expiresIn: '5h' }
  )
}

export const decodeRefreshToken = (token: string) => {
  return jwt.verify(
    token,
      config.jwtRefreshSecret as string
  )
}

export const decodeAccessToken = (token: string) => {
  return jwt.verify(
    token,
      config.jwtAccessSecret as string
  )
}
export const generateToken = (user: any) => {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

  return { accessToken, refreshToken }
}
export const saveRefreshToken = (token: string, userId: number) => {
  return prisma.refreshToken.create({
    data: {
      token,
      userId
    }
  })
}

export const getRefreshTokenByToken = (token: string) => {
  return prisma.refreshToken.findUnique({
    where: {
      token
    }
  })
}

export const sendRefreshToken = (event: H3Event, token: string) => {
  setCookie(event, 'refresh_token', token)
}
