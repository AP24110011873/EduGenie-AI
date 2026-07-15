import { cn } from '../../utils/cn'

const variants = {
  primary: 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-glow hover:brightness-110',
  secondary: 'bg-white/8 text-slate-100 border border-white/10 hover:bg-white/12',
  ghost: 'bg-transparent text-slate-200 hover:bg-white/8',
  destructive: 'bg-rose-500/90 text-white hover:bg-rose-500',
}

const sizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  loading = false,
  icon,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition focus-visible:ring-2 focus-visible:ring-cyan-400/70 disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      ) : icon ? (
        <span className="text-base">{icon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  )
}