export default defineNuxtRouteMiddleware((to, from) => {
    const {useAuthUser} = useAuth()
    const isLoggedIn = !!useAuthUser().value
    if (to.path !== '/admin') {
        return navigateTo('/')
    }
})
