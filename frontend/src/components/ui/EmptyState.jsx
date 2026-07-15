import { Button } from './Button'
import { Card } from './Card'

export function EmptyState({ icon, title, description, actionLabel, onAction }) {
  return (
    <Card className="flex flex-col items-center justify-center py-14 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-3xl bg-white/8 text-3xl text-cyan-300">{icon}</div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm leading-6 text-slate-300">{description}</p>
      {actionLabel ? (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  )
}