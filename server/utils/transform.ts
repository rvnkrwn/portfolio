export const userTransformer = (user: any) => {
  return {
    userId: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    createdAt: user.created_at,
    updatedAt: user.updated_at
  }
}
