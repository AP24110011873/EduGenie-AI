import { useMemo, useState } from 'react'
import { FiLogOut, FiCopy, FiUser, FiMail, FiClock, FiActivity } from 'react-icons/fi'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { EmptyState } from '../components/ui/EmptyState'
import { useAuth } from '../hooks/useAuth'
import { useActivity } from '../hooks/useActivity'
import { usePageTitle } from '../hooks/usePageTitle'
import { useToast } from '../hooks/useToast'
import { formatDateTime, formatTimeAgo, getInitials, truncateText } from '../utils/format'

export default function Profile() {
  usePageTitle('Profile')
  const { user, logout } = useAuth()
  const { recentActivity, stats } = useActivity()
  const { addToast } = useToast()
  const [logoutOpen, setLogoutOpen] = useState(false)

  const initials = useMemo(() => getInitials(user?.name || 'User'), [user?.name])

  const copyEmail = async () => {
    if (!user?.email) return

    await navigator.clipboard.writeText(user.email)
    addToast({ variant: 'success', title: 'Copied', description: 'Email copied to clipboard.' })
  }

  const handleLogout = () => {
    logout()
    window.location.assign('/login')
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="grid h-20 w-20 place-items-center rounded-[2rem] bg-gradient-to-br from-blue-500 to-cyan-400 text-2xl font-black text-white shadow-glow">
            {initials}
          </div>
          <div className="space-y-2">
            <p className="text-sm text-slate-400">Profile</p>
            <h1 className="text-3xl font-black text-white">{user?.name || 'Learner'}</h1>
            <p className="text-sm text-slate-300">Your authenticated workspace identity.</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
            <FiUser className="text-cyan-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Name</p>
              <p className="text-sm font-semibold text-white">{user?.name || 'Unknown'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
            <FiMail className="text-cyan-300" />
            <div className="min-w-0 flex-1">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Email</p>
              <p className="truncate text-sm font-semibold text-white">{user?.email || 'Unknown'}</p>
            </div>
            <button onClick={copyEmail} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-200 hover:bg-white/10" aria-label="Copy email">
              <FiCopy />
            </button>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
            <FiClock className="text-cyan-300" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Session</p>
              <p className="text-sm font-semibold text-white">Authenticated local session</p>
            </div>
          </div>

          <Button variant="destructive" icon={<FiLogOut />} className="w-full" onClick={() => setLogoutOpen(true)}>
            Logout
          </Button>
        </div>
      </Card>

      <div className="space-y-6">
        <Card>
          <p className="text-sm text-slate-400">Activity snapshot</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Recent learning actions</h2>

          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Chats</p>
              <p className="mt-2 text-3xl font-bold text-white">{stats.chats}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">PDFs</p>
              <p className="mt-2 text-3xl font-bold text-white">{stats.pdfs}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Quizzes</p>
              <p className="mt-2 text-3xl font-bold text-white">{stats.quizzes}</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">Recent activity</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Latest events</h2>
            </div>
            <FiActivity className="text-xl text-cyan-300" />
          </div>

          <div className="mt-5 space-y-3">
            {recentActivity.length ? (
              recentActivity.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{truncateText(item.description, 140)}</p>
                    </div>
                    <div className="text-right text-xs text-slate-400">
                      <p>{formatTimeAgo(item.timestamp)}</p>
                      <p className="mt-1 hidden sm:block">{formatDateTime(item.timestamp)}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                icon={<FiActivity />}
                title="No activity yet"
                description="Once you chat, summarize a PDF, or create a quiz, the latest actions will appear here."
              />
            )}
          </div>
        </Card>
      </div>

      <Modal
        open={logoutOpen}
        title="Logout from EduGenie AI?"
        description="Your local session will be cleared and you will be returned to the login screen."
        onClose={() => setLogoutOpen(false)}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <Button variant="secondary" onClick={() => setLogoutOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" icon={<FiLogOut />} onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </Modal>
    </div>
  )
}