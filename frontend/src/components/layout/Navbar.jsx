import { useMemo, useState } from 'react'
import { FiBell, FiMenu, FiSearch, FiLogOut, FiChevronDown } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useToast } from '../../hooks/useToast'
import { getInitials } from '../../utils/format'

const quickRoutes = [
  { terms: ['dashboard', 'home'], route: '/dashboard' },
  { terms: ['chat', 'assistant', 'ai'], route: '/chat' },
  { terms: ['pdf', 'summary', 'summarize'], route: '/pdf' },
  { terms: ['quiz', 'test', 'mcq'], route: '/quiz' },
  { terms: ['profile', 'account'], route: '/profile' },
]

export function Navbar({ onMenuToggle, notifications = 0 }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { addToast } = useToast()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const userInitials = useMemo(() => getInitials(user?.name || 'User'), [user?.name])

  const handleSearch = (event) => {
    event.preventDefault()

    const value = query.trim().toLowerCase()
    if (!value) return

    const match = quickRoutes.find((item) => item.terms.some((term) => value.includes(term)))

    if (match) {
      navigate(match.route)
      setQuery('')
      return
    }

    addToast({
      variant: 'info',
      title: 'Search tip',
      description: 'Try searching for chat, PDF, quiz, dashboard, or profile.',
    })
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl">
      <div className="flex items-center gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <button
          onClick={onMenuToggle}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 lg:hidden"
          aria-label="Open sidebar"
        >
          <FiMenu />
        </button>

        <form onSubmit={handleSearch} className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
          <FiSearch className="text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search chats, quizzes, summaries, or profile"
            className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder:text-slate-500"
          />
        </form>

        <button className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10">
          <FiBell />
          {notifications > 0 ? (
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_0_4px_rgba(56,189,248,0.2)]" />
          ) : null}
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left hover:bg-white/10"
          >
            <div className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-white">
              {userInitials}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-white">{user?.name || 'Learner'}</p>
              <p className="text-xs text-slate-400">{user?.email || 'Loading profile'}</p>
            </div>
            <FiChevronDown className={`text-slate-400 transition ${menuOpen ? 'rotate-180' : ''}`} />
          </button>

          {menuOpen ? (
            <div className="absolute right-0 mt-3 w-56 rounded-[1.5rem] border border-white/10 bg-slate-950/95 p-2 shadow-glass backdrop-blur-xl">
              <button
                onClick={() => {
                  navigate('/profile')
                  setMenuOpen(false)
                }}
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-slate-200 hover:bg-white/6"
              >
                <span className="text-base">{userInitials}</span>
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-rose-200 hover:bg-rose-500/10"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  )
}