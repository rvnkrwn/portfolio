export default defineNuxtRouteMiddleware((to, from) => {
  const { isLoggedIn } = useAuth()

  const endpoints = [
    '/admin',
    '/admin/blog',
    '/admin/notifications',
    '/admin/setting',
    '/admin/blog/create'
  ]

  if (endpoints.some(endpoint => to.path === endpoint) && !Boolean(isLoggedIn().value)) {
    return navigateTo('/admin/login')
  } else if (to.path === '/admin/login' && Boolean(isLoggedIn().value)) {
    return navigateTo('/admin')
  }
})
