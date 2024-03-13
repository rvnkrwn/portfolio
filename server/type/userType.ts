export interface userPayload {
    userId: number,
    name: string,
    email: string
}

export const transformerPayloadJWT = (user: any) => {
  const data: userPayload = {
    userId: user.id,
    name: user.name,
    email: user.email
  }

  return data
}
