import { cn } from '../../utils/cn'

export function Input({ label, error, hint, className, rightElement, ...props }) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-medium text-slate-200">{label}</span> : null}
      <div className="relative">
        <input
          className={cn(
            'w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white shadow-inner shadow-slate-950/30 placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20',
            rightElement ? 'pr-12' : '',
            error ? 'border-rose-400/60 focus:border-rose-400/70 focus:ring-rose-400/15' : '',
            className,
          )}
          {...props}
        />
        {rightElement ? (
          <div className="absolute inset-y-0 right-3 flex items-center text-slate-400">{rightElement}</div>
        ) : null}
      </div>
      {hint && !error ? <p className="text-xs text-slate-400">{hint}</p> : null}
      {error ? <p className="text-xs text-rose-300">{error}</p> : null}
    </label>
  )
}