import { cn } from '../../utils/cn'

export function Card({ className, children }) {
  return <div className={cn('glass-panel rounded-[1.75rem] p-5 md:p-6', className)}>{children}</div>
}