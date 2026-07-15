import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiArrowRight, FiMail, FiLock, FiUser } from 'react-icons/fi'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { useAuth } from '../hooks/useAuth'
import { useToast } from '../hooks/useToast'
import { usePageTitle } from '../hooks/usePageTitle'

export default function Register() {
  usePageTitle('Register')
  const navigate = useNavigate()
  const { register } = useAuth()
  const { addToast } = useToast()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const updateField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    try {
      await register(form)
      addToast({ variant: 'success', title: 'Account created', description: 'You are signed in and ready to learn.' })
      navigate('/dashboard', { replace: true })
    } catch (requestError) {
      const message = requestError?.response?.data?.detail || 'Unable to register right now.'
      setError(message)
      addToast({ variant: 'error', title: 'Registration failed', description: message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <Card className="mx-auto w-full max-w-xl p-6 sm:p-8 lg:order-2">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-200">Create account</p>
            <h2 className="text-3xl font-black text-white">Register</h2>
            <p className="text-sm leading-6 text-slate-300">Create your workspace and get auto logged in immediately.</p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <Input
              label="Name"
              type="text"
              placeholder="Your name"
              value={form.name}
              onChange={updateField('name')}
              rightElement={<FiUser />}
              required
            />
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
              placeholder="Create a secure password"
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
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-cyan-200 hover:text-cyan-100">
              Login
            </Link>
          </p>
        </Card>

        <div className="glass-panel relative overflow-hidden rounded-[2rem] p-8 lg:order-1">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(37,99,235,0.18),transparent_30%)]" />
          <div className="relative space-y-8">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">Study system</p>
            <h1 className="max-w-lg text-5xl font-black leading-tight text-white">
              One sign-up, one workspace, three core AI tools.
            </h1>
            <p className="max-w-md text-lg leading-8 text-slate-300">
              Start with chat, PDFs, and quizzes in a single polished dashboard built for productivity.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['Chat', 'Markdown answers and code blocks'],
                ['PDF', 'Upload, summarize, and review'],
                ['Quiz', 'Generate MCQs with answers'],
                ['Profile', 'Stay signed in and track activity'],
              ].map(([title, description]) => (
                <div key={title} className="rounded-[1.4rem] border border-white/10 bg-white/5 p-4">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}