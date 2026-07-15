import { cn } from '../../utils/cn'

export function Loader({ label = 'Loading', fullScreen = false, className }) {
  const content = (
    <div className={cn('flex items-center gap-3 text-sm text-slate-300', className)}>
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-400/30 border-t-cyan-300" />
      <span>{label}</span>
    </div>
  )

  if (!fullScreen) return content

  return (
    <div className="flex min-h-[50vh] items-center justify-center rounded-[1.75rem] glass-panel">
      {content}
    </div>
  )
}