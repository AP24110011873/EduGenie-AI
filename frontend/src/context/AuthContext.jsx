import { createContext, useEffect, useMemo, useState } from 'react'
import { clearStoredAuth, getStoredAuth, setStoredAuth } from '../utils/storage'
import { login as loginRequest, register as registerRequest, getProfile } from '../services/authService'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const syncAuth = (nextAuth) => {
    if (!nextAuth?.token) {
      clearStoredAuth()
      setToken(null)
      setUser(null)
      return
    }

    setToken(nextAuth.token)
    setUser(nextAuth.user)
    setStoredAuth(nextAuth)
  }

  useEffect(() => {
    const hydrateAuth = async () => {
      const storedAuth = getStoredAuth()

      if (!storedAuth.token) {
        setLoading(false)
        return
      }

      setToken(storedAuth.token)
      setUser(storedAuth.user)

      try {
        const profile = await getProfile()
        const refreshedAuth = { token: storedAuth.token, user: profile }
        setStoredAuth(refreshedAuth)
        setUser(profile)
      } catch {
        clearStoredAuth()
        setToken(null)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    const handleExternalLogout = () => {
      clearStoredAuth()
      setToken(null)
      setUser(null)
    }

    hydrateAuth()
    window.addEventListener('edugenie:auth:logout', handleExternalLogout)

    return () => {
      window.removeEventListener('edugenie:auth:logout', handleExternalLogout)
    }
  }, [])

  const login = async (credentials) => {
    const response = await loginRequest(credentials)
    syncAuth(response)
    return response
  }

  const register = async (payload) => {
    await registerRequest(payload)
    return login({
      email: payload.email,
      password: payload.password,
    })
  }

  const logout = () => {
    clearStoredAuth()
    setToken(null)
    setUser(null)
    window.dispatchEvent(new Event('edugenie:auth:logout'))
  }

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(token && user),
      login,
      register,
      logout,
      setUser,
    }),
    [loading, token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}