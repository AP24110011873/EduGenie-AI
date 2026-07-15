import { AnimatePresence, motion } from 'framer-motion'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ToastHost } from './components/feedback/Toast'
import { DashboardLayout } from './layouts/DashboardLayout'
import { ProtectedRoute } from './components/routes/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import PDFSummarizer from './pages/PDFSummarizer'
import QuizGenerator from './pages/QuizGenerator'
import Profile from './pages/Profile'
import NotFound from './pages/NotFound'

function AnimatedPage({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="min-h-full"
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
          <Route path="/register" element={<AnimatedPage><Register /></AnimatedPage>} />
          <Route
            element={(
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            )}
          >
            <Route path="/dashboard" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
            <Route path="/chat" element={<AnimatedPage><Chat /></AnimatedPage>} />
            <Route path="/pdf" element={<AnimatedPage><PDFSummarizer /></AnimatedPage>} />
            <Route path="/quiz" element={<AnimatedPage><QuizGenerator /></AnimatedPage>} />
            <Route path="/profile" element={<AnimatedPage><Profile /></AnimatedPage>} />
          </Route>
          <Route path="/app" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
      <ToastHost />
    </>
  )
}