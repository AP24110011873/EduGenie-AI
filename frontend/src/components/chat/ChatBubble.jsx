import { motion } from 'framer-motion'
import { FiUser, FiCpu } from 'react-icons/fi'
import { MarkdownContent } from './MarkdownContent'
import { cn } from '../../utils/cn'

export function ChatBubble({ message, role }) {
  const isUser = role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn('flex w-full gap-3', isUser ? 'justify-end' : 'justify-start')}
    >
      {!isUser ? (
        <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
          <FiCpu />
        </div>
      ) : null}

      <div className={cn('max-w-[min(100%,42rem)] rounded-3xl px-4 py-3', isUser ? 'rounded-br-md bg-blue-500/15 text-white' : 'rounded-bl-md glass-panel')}>
        <div className={cn('mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.24em]', isUser ? 'justify-end text-sky-200/80' : 'text-cyan-200/80')}>
          <span>{isUser ? 'You' : 'EduGenie AI'}</span>
          <span className="text-[0.55rem]">•</span>
          <span>{isUser ? 'message' : 'assistant'}</span>
        </div>

        {isUser ? (
          <p className="whitespace-pre-wrap text-sm leading-7 text-slate-100">{message}</p>
        ) : (
          <MarkdownContent content={message} />
        )}
      </div>

      {isUser ? (
        <div className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/8 text-slate-200">
          <FiUser />
        </div>
      ) : null}
    </motion.div>
  )
}