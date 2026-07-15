import { motion } from 'framer-motion'
import { Card } from '../ui/Card'

export function QuizCard({ question, options, answer, index }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.24, delay: index * 0.05 }}>
      <Card className="h-full">
        <div className="flex items-center justify-between gap-4">
          <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
            Question {index + 1}
          </span>
        </div>
        <h3 className="mt-4 text-lg font-semibold leading-8 text-white">{question}</h3>

        <div className="mt-5 grid gap-3">
          {options.map((option) => {
            const isCorrect = option === answer

            return (
              <div
                key={option}
                className={`rounded-2xl border px-4 py-3 text-sm transition ${isCorrect ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100' : 'border-white/10 bg-white/5 text-slate-200'}`}
              >
                {option}
              </div>
            )
          })}
        </div>

        <div className="mt-5 rounded-2xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          <span className="font-semibold">Correct answer: </span>
          {answer}
        </div>
      </Card>
    </motion.div>
  )
}