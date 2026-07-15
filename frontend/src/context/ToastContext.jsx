import { createContext, useCallback, useMemo, useState } from 'react'
import { createId } from '../utils/storage'

export const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const removeToast = useCallback((id) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback((toast) => {
    const id = createId()
    const nextToast = {
      id,
      title: toast.title,
      description: toast.description,
      variant: toast.variant || 'info',
    }

    setToasts((currentToasts) => [nextToast, ...currentToasts].slice(0, 4))
    window.setTimeout(() => removeToast(id), 3600)

    return id
  }, [removeToast])

  const value = useMemo(
    () => ({
      toasts,
      addToast,
      removeToast,
    }),
    [toasts, addToast, removeToast],
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}