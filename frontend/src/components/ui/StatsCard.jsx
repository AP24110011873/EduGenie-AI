import { motion } from 'framer-motion'
import { Card } from './Card'

export function StatsCard({ icon, label, value, hint, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay }}
    >
      <Card className="relative overflow-hidden">
        <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="relative flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-slate-300">{label}</p>
            <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
            {hint ? <p className="mt-2 text-xs text-slate-400">{hint}</p> : null}
          </div>
          <div className="grid h-12 w-12 place-items-center rounded-2xl border border-cyan-400/15 bg-cyan-400/10 text-2xl text-cyan-300">
            {icon}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}