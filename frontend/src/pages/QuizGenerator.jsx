import { useState } from 'react'
import { FiHelpCircle, FiRefreshCw, FiPlayCircle } from 'react-icons/fi'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { Input } from '../components/ui/Input'
import { QuizCard } from '../components/quiz/QuizCard'
import { usePageTitle } from '../hooks/usePageTitle'
import { useActivity } from '../hooks/useActivity'
import { useToast } from '../hooks/useToast'
import { generateQuiz } from '../services/quizService'

const difficultyOptions = ['easy', 'medium', 'hard']

export default function QuizGenerator() {
  usePageTitle('Quiz Generator')
  const [form, setForm] = useState({ topic: '', difficulty: 'medium', questions: 5 })
  const [quiz, setQuiz] = useState([])
  const [loading, setLoading] = useState(false)
  const { addToast } = useToast()
  const { recordActivity } = useActivity()

  const updateField = (field) => (event) =>
    setForm((current) => ({
      ...current,
      [field]: field === 'questions' ? Number(event.target.value) : event.target.value,
    }))

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.topic.trim()) {
      addToast({ variant: 'error', title: 'Topic required', description: 'Enter a topic before generating a quiz.' })
      return
    }

    setLoading(true)

    try {
      const response = await generateQuiz({
        topic: form.topic,
        difficulty: form.difficulty,
        questions: form.questions,
      })

      setQuiz(response.quiz || [])
      recordActivity({
        type: 'quiz',
        title: `Generated quiz on ${response.topic}`,
        description: `Difficulty: ${response.difficulty}, Questions: ${response.quiz?.length || 0}`,
        meta: response,
      })
      addToast({ variant: 'success', title: 'Quiz generated', description: `${response.quiz?.length || 0} questions ready.` })
    } catch (requestError) {
      const message = requestError?.response?.data?.detail || 'Unable to generate a quiz right now.'
      addToast({ variant: 'error', title: 'Quiz generation failed', description: message })
    } finally {
      setLoading(false)
    }
  }

  const clearQuiz = () => {
    setQuiz([])
    addToast({ variant: 'info', title: 'Quiz cleared', description: 'Generate a new MCQ set anytime.' })
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-400">Quiz generator</p>
            <h1 className="mt-1 text-2xl font-bold text-white">Create MCQs from any topic</h1>
          </div>
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-400/10 text-xl text-cyan-300">
            <FiHelpCircle />
          </div>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Topic"
            placeholder="e.g. React Hooks, Neural Networks, World War II"
            value={form.topic}
            onChange={updateField('topic')}
            required
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-200">Difficulty</span>
              <select
                value={form.difficulty}
                onChange={updateField('difficulty')}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/15"
              >
                {difficultyOptions.map((option) => (
                  <option key={option} value={option} className="bg-slate-900">
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <Input
              label="Number of questions"
              type="number"
              min="1"
              max="20"
              value={form.questions}
              onChange={updateField('questions')}
              required
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" loading={loading} icon={<FiPlayCircle />}>
              Generate quiz
            </Button>
            <Button type="button" variant="secondary" icon={<FiRefreshCw />} onClick={clearQuiz}>
              Reset results
            </Button>
          </div>
        </form>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm leading-7 text-slate-300">
          Quizzes are generated via <span className="font-mono text-cyan-200">POST /api/quiz/generate</span> with bearer authentication.
        </div>
      </Card>

      <div className="space-y-6">
        {quiz.length ? (
          <div className="grid gap-4">
            {quiz.map((item, index) => (
              <QuizCard
                key={`${item.question}-${index}`}
                index={index}
                question={item.question}
                options={item.options}
                answer={item.answer}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<FiHelpCircle />}
            title="No quiz generated yet"
            description="Enter a topic, choose a difficulty, and create a polished MCQ set with correct answers shown in each card."
          />
        )}
      </div>
    </div>
  )
}