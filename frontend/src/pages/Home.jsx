import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiMessageSquare, FiFileText, FiHelpCircle, FiShield, FiZap } from 'react-icons/fi'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { usePageTitle } from '../hooks/usePageTitle'

const features = [
  {
    icon: <FiMessageSquare />,
    title: 'ChatGPT-style tutor',
    description: 'Ask questions, get markdown-rich answers, and keep the conversation focused on learning.',
  },
  {
    icon: <FiFileText />,
    title: 'PDF summarizer',
    description: 'Drop in a document and turn dense study material into structured, readable notes in seconds.',
  },
  {
    icon: <FiHelpCircle />,
    title: 'Quiz generator',
    description: 'Create MCQs from any topic with answers displayed in a polished card layout.',
  },
  {
    icon: <FiShield />,
    title: 'JWT protected workspace',
    description: 'Login once and stay signed in with a clean localStorage-backed auth experience.',
  },
]

export default function Home() {
  usePageTitle('Home')

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-35" />
      <div className="absolute left-1/2 top-[-8rem] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between rounded-[1.75rem] border border-white/10 bg-white/5 px-5 py-4 shadow-glass backdrop-blur-xl">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-200">EduGenie AI</p>
            <p className="mt-1 text-sm text-slate-300">A complete AI learning cockpit</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.1fr_0.9fr] lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100">
              <FiZap />
              AI study tools for modern learners
            </span>

            <div className="space-y-5">
              <h1 className="max-w-2xl text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Learn faster with a{' '}
                <span className="text-gradient">beautiful AI workspace</span>
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
                Chat with Gemini-powered assistance, summarize PDFs into structured notes, and generate quizzes from any topic in one polished dashboard.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button size="lg" icon={<FiArrowRight />}>Start Free</Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="secondary">Open Dashboard</Button>
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ['GPT-style chat', 'Markdown output and code blocks'],
                ['PDF insights', 'Upload and summarize documents'],
                ['Quiz builder', 'Generate MCQs with answers'],
              ].map(([title, description]) => (
                <Card key={title} className="p-4">
                  <p className="text-sm font-semibold text-white">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{description}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="relative"
          >
            <div className="absolute inset-0 -z-10 rounded-[2.25rem] bg-gradient-to-br from-blue-500/20 via-cyan-400/10 to-transparent blur-3xl" />
            <Card className="relative overflow-hidden p-0">
              <div className="border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Live learning dashboard
                </div>
              </div>
              <div className="space-y-5 p-5">
                <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-5">
                  <p className="text-sm text-slate-400">AI Tutor</p>
                  <p className="mt-3 text-lg leading-8 text-white">
                    “Explain the difference between supervised and unsupervised learning with a simple example.”
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm text-cyan-200">
                    <FiMessageSquare />
                    Reply with markdown, lists, and code snippets.
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-slate-400">Smart summary</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">Turn long research PDFs into concise notes with headings and bullets.</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                    <p className="text-sm text-slate-400">Auto quiz</p>
                    <p className="mt-2 text-sm leading-6 text-slate-200">Generate multiple-choice questions and reveal correct answers instantly.</p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </section>

        <section className="grid gap-4 pb-8 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
            >
              <Card className="h-full">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/10 text-xl text-cyan-300">
                  {feature.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  )
}