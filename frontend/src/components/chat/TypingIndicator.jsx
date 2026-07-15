export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 rounded-3xl rounded-bl-md border border-white/10 bg-white/6 px-4 py-3 text-slate-300">
      <span className="text-sm">Generating</span>
      <span className="flex gap-1">
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.2s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.1s]" />
        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-300" />
      </span>
    </div>
  )
}