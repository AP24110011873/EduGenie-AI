import axios from 'axios'
import { API_BASE_URL } from '../config/env'
import { clearStoredAuth, getStoredAuth } from '../utils/storage'

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const { token } = getStoredAuth()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearStoredAuth()
      window.dispatchEvent(new Event('edugenie:auth:logout'))
    }

    return Promise.reject(error)
  },
)