import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiArrowRight, FiMail, FiLock } from 'react-icons/fi'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Login() {
  usePageTitle('Login')
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()
  const { addToast } = useToast()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const updateField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await login(form)
      addToast({ variant: 'success', title: 'Welcome back', description: 'You are now signed in to EduGenie AI.' })
      navigate(location.state?.from?.pathname || '/dashboard', { replace: true })
    } catch (requestError) {
      const message = requestError?.response?.data?.detail || 'Unable to login. Please check your credentials.'
      setError(message)
      addToast({ variant: 'error', title: 'Login failed', description: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="glass-panel relative hidden overflow-hidden rounded-[2rem] p-8 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(37,99,235,0.2),transparent_36%)]" />
          <div className="relative space-y-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">Secure learning</p>
            <h1 className="max-w-lg text-5xl font-black leading-tight text-white">
              Log in to your AI study control room.
            </h1>
            <p className="max-w-md text-lg leading-8 text-slate-300">
              Access your chat history, PDF summaries, quiz generation, and recent activity in a single workspace.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['JWT auth', 'Local storage backed session management'],
                ['Auto login', 'Register once and jump straight in'],
                ['Responsive UI', 'Works across desktop, tablet, and mobile'],
                ['Context API', 'No Redux, clean and lightweight'],
              ].map(([title, description]) => (
                <div key={title} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card className="mx-auto w-full max-w-xl p-6 sm:p-8">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Welcome back</p>
            <h2 className="text-3xl font-black text-white">Login</h2>
            <p className="text-sm leading-6 text-slate-300">Continue with your email address and password.</p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={updateField('email')}
              rightElement={<FiMail />}
              required
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={updateField('password')}
              rightElement={<FiLock />}
              required
            />

            {error ? (
              <div className="rounded-2xl border border-rose-400/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-100">
                {error}
              </div>
            ) : null}

            <Button type="submit" size="lg" className="w-full" loading={loading} icon={<FiArrowRight />}>
              Login
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            New here?{' '}
            <Link to="/register" className="font-semibold text-cyan-200 hover:text-cyan-100">
              Create an account
            </Link>
          </p>
        </Card>
      </div>
    </div>
  )
}