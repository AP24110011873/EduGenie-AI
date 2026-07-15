const stripTrailingSlash = (value) => value.replace(/\/$/, '')

export const API_BASE_URL = stripTrailingSlash(
  import.meta.env.VITE_API_URL || 'http://localhost:8000',
)