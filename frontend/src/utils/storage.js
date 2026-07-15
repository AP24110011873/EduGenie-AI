const AUTH_KEY = 'edugenie_auth'
const ACTIVITIES_KEY = 'edugenie_activities'
const CHAT_KEY = 'edugenie_chat_history'

const canUseStorage = () => typeof window !== 'undefined' && Boolean(window.localStorage)

const parseJSON = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

export const storageKeys = {
  AUTH_KEY,
  ACTIVITIES_KEY,
  CHAT_KEY,
}

export function getStoredAuth() {
  if (!canUseStorage()) return { token: null, user: null }
  return parseJSON(window.localStorage.getItem(AUTH_KEY), { token: null, user: null })
}

export function setStoredAuth(authState) {
  if (!canUseStorage()) return
  window.localStorage.setItem(AUTH_KEY, JSON.stringify(authState))
}

export function clearStoredAuth() {
  if (!canUseStorage()) return
  window.localStorage.removeItem(AUTH_KEY)
}

export function getStoredActivities() {
  if (!canUseStorage()) return []
  return parseJSON(window.localStorage.getItem(ACTIVITIES_KEY), [])
}

export function setStoredActivities(activities) {
  if (!canUseStorage()) return
  window.localStorage.setItem(ACTIVITIES_KEY, JSON.stringify(activities))
}

export function getStoredChatHistory() {
  if (!canUseStorage()) return []
  return parseJSON(window.localStorage.getItem(CHAT_KEY), [])
}

export function setStoredChatHistory(history) {
  if (!canUseStorage()) return
  window.localStorage.setItem(CHAT_KEY, JSON.stringify(history))
}

export function clearStoredChatHistory() {
  if (!canUseStorage()) return
  window.localStorage.removeItem(CHAT_KEY)
}

export function createId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}