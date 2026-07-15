import { FiMessageSquare, FiFileText, FiHelpCircle, FiArrowRight, FiActivity } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { StatsCard } from '../components/ui/StatsCard'
import { Button } from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'
import { useActivity } from '../hooks/useActivity'
import { usePageTitle } from '../hooks/usePageTitle'
import { formatTimeAgo, truncateText } from '../utils/format'

const shortcuts = [
  { to: '/chat', label: 'Start chat', icon: <FiMessageSquare /> },
  { to: '/pdf', label: 'Summarize PDF', icon: <FiFileText /> },
  { to: '/quiz', label: 'Generate quiz', icon: <FiHelpCircle /> },
]

export default function Dashboard() {
  usePageTitle('Dashboard')
  const { user } = useAuth()
  const { stats, recentActivity } = useActivity()

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-cyan-100">
                <FiActivity />
                Workspace overview
              </span>
              <div>
                <p className="text-sm text-slate-300">Welcome back</p>
                <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">{user?.name || 'Learner'}</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                  Use the dashboard to track your AI chats, PDF summaries, and quiz generation activity.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {shortcuts.map((shortcut) => (
                <Link key={shortcut.to} to={shortcut.to}>
                  <Button variant="secondary" icon={shortcut.icon}>{shortcut.label}</Button>
                </Link>
              ))}
            </div>
          </div>
        </Card>

        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
          <StatsCard label="Total Chats" value={stats.chats} hint="AI conversations started locally" icon={<FiMessageSquare />} delay={0.03} />
          <StatsCard label="Total PDFs" value={stats.pdfs} hint="Summaries created from uploads" icon={<FiFileText />} delay={0.08} />
          <StatsCard label="Total Quizzes" value={stats.quizzes} hint="Generated question sets" icon={<FiHelpCircle />} delay={0.13} />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">Quick actions</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Jump straight into a tool</h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {shortcuts.map((shortcut) => (
              <Link
                key={shortcut.to}
                to={shortcut.to}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-cyan-400/20 hover:bg-white/8"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400/10 text-xl text-cyan-300">
                    {shortcut.icon}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{shortcut.label}</p>
                    <p className="text-sm text-slate-400">Open the {shortcut.label.toLowerCase()} flow</p>
                  </div>
                </div>
                <FiArrowRight className="text-slate-400 transition group-hover:translate-x-1 group-hover:text-cyan-300" />
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-400">Recent activity</p>
              <h2 className="mt-1 text-xl font-semibold text-white">Your last actions</h2>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {recentActivity.length ? (
              recentActivity.map((item) => (
                <div key={item.id} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-white">{item.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{truncateText(item.description, 130)}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs text-slate-300">
                      {formatTimeAgo(item.timestamp)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState
                icon={<FiActivity />}
                title="No activity yet"
                description="Start a chat, summarize a PDF, or generate a quiz to see your activity here."
                actionLabel="Open AI Chat"
                onAction={() => window.location.assign('/chat')}
              />
            )}
          </div>
        </Card>
      </section>
    </div>
  )
}