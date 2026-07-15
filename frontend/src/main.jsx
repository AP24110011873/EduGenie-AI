import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from './context/AuthContext'
import { ActivityProvider } from './context/ActivityContext'
import { ToastProvider } from './context/ToastContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <ActivityProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ActivityProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
)