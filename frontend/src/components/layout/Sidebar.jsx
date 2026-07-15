import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMessageSquare, FiHome, FiFileText, FiHelpCircle, FiUser, FiZap } from 'react-icons/fi'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: <FiHome /> },
  { to: '/chat', label: 'AI Chat', icon: <FiMessageSquare /> },
  { to: '/pdf', label: 'PDF Summarizer', icon: <FiFileText /> },
  { to: '/quiz', label: 'Quiz Generator', icon: <FiHelpCircle /> },
  { to: '/profile', label: 'Profile', icon: <FiUser /> },
]

export function Sidebar({ open, onClose }) {
  return (
    <>
      <motion.aside
        initial={false}
        animate={{ x: open ? 0 : '-100%' }}
        transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        className="fixed inset-y-0 left-0 z-40 flex w-80 flex-col border-r border-white/10 bg-slate-950/90 p-5 backdrop-blur-2xl lg:sticky lg:top-0 lg:h-screen lg:translate-x-0"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-lg font-black text-white shadow-glow">
              <FiZap />
            </div>
            <div>
              <p className="text-lg font-extrabold tracking-wide text-white">EduGenie AI</p>
              <p className="text-xs uppercase tracking-[0.26em] text-slate-400">Study cockpit</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-300 lg:hidden">
            ×
          </button>
        </div>

        <nav className="mt-8 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive ? 'bg-cyan-400/10 text-cyan-100 ring-1 ring-cyan-400/20' : 'text-slate-300 hover:bg-white/6 hover:text-white'}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto rounded-[1.6rem] border border-white/10 bg-gradient-to-br from-white/8 to-white/4 p-4">
          <p className="text-sm font-semibold text-white">AI study companion</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Keep chats, quizzes, and summaries in one workspace with a polished dark interface.
          </p>
        </div>
      </motion.aside>

      {open ? <div className="fixed inset-0 z-30 bg-slate-950/60 backdrop-blur-sm lg:hidden" onClick={onClose} /> : null}
    </>
  )
}