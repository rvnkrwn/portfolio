import { jwtDecode } from 'jwt-decode'
import type { userType } from '~/types/user'

export default () => {
  const useAuthToken = () => useState('auth_token')
  const useAuthUser = () => useState('auth_user')
  const isLoggedIn = () => useCookie('isLoggedIn')

  const isLoading = () => useState('isLoading')

  const setToken = (newToken: string) => {
    const authToken = useAuthToken()
    authToken.value = newToken
  }
  const setUser = (newUser: userType) => {
    const authUser = useAuthUser()
    authUser.value = newUser
  }
  const login = async (email: string, password: string) => {
    const data: any = await $fetch('/api/auth/login', {
      body: { email, password },
      method: 'POST',
      credentials: 'include'
    })
    setToken(data.access_token)
    setUser(data.user)
    return data.message
  }

  const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: {access_token: string} = await $fetch('/api/auth/refresh')
        setToken(data.access_token)
        resolve(true)
      } catch (e) {
        isLoggedIn().value = String(false)
        reject(e)
      }
    })
  }

  const getUser = async () => {
    const data: any = await useFetchApi('/api/auth/user')
    setUser(data.user)
    isLoading().value = false
  }

  const reRefreshAccessToken = () => {
    const authToken = useAuthToken()

    if (!authToken.value) {
      return
    }

    const jwt = jwtDecode(authToken.value as string)

    const newRefreshTime = jwt.exp as number - 60000

    setTimeout(async () => {
      await refreshToken()
      reRefreshAccessToken()
    }, newRefreshTime)
  }

  const initAuth = async () => {
    isLoading().value = true
    await refreshToken()
    await getUser()

    reRefreshAccessToken()
  }

  return {
    login,
    useAuthUser,
    useAuthToken,
    initAuth,
    isLoggedIn,
    isLoading
  }
}
