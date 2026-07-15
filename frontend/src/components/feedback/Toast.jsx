import { AnimatePresence, motion } from 'framer-motion'
import { FiAlertCircle, FiCheckCircle, FiInfo, FiX } from 'react-icons/fi'
import { useToast } from '../../hooks/useToast'

const icons = {
  success: <FiCheckCircle />,
  error: <FiAlertCircle />,
  info: <FiInfo />,
}

const toneClasses = {
  success: 'border-emerald-400/30 bg-emerald-500/10 text-emerald-100',
  error: 'border-rose-400/30 bg-rose-500/10 text-rose-100',
  info: 'border-cyan-400/30 bg-cyan-500/10 text-cyan-100',
}

function Toast({ toast, onDismiss }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24 }}
      className={`w-full rounded-2xl border p-4 shadow-glass backdrop-blur-xl ${toneClasses[toast.variant]}`}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-lg">{icons[toast.variant] || icons.info}</div>
        <div className="flex-1">
          <h4 className="text-sm font-semibold">{toast.title}</h4>
          {toast.description ? <p className="mt-1 text-sm/6 text-white/80">{toast.description}</p> : null}
        </div>
        <button onClick={onDismiss} className="text-white/70 hover:text-white" aria-label="Dismiss toast">
          <FiX />
        </button>
      </div>
    </motion.div>
  )
}

export function ToastHost() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[60] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div key={toast.id} layout>
            <Toast toast={toast} onDismiss={() => removeToast(toast.id)} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}