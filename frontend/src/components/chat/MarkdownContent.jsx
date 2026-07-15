import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useState } from 'react'
import { FiCopy, FiCheck } from 'react-icons/fi'

function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false)
  const codeString = String(children).replace(/\n$/, '')

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeString)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="group relative my-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/90">
      <button
        type="button"
        onClick={handleCopy}
        className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/8 px-3 py-1.5 text-xs font-medium text-slate-200 opacity-100 transition hover:bg-white/12"
      >
        {copied ? <FiCheck /> : <FiCopy />}
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre className="overflow-x-auto p-4 pt-12 text-sm leading-6 text-slate-100">
        <code>{codeString}</code>
      </pre>
    </div>
  )
}

export function MarkdownContent({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h1 className="mb-4 text-2xl font-bold text-white">{children}</h1>,
        h2: ({ children }) => <h2 className="mb-3 mt-6 text-xl font-semibold text-white">{children}</h2>,
        h3: ({ children }) => <h3 className="mb-2 mt-5 text-lg font-semibold text-white">{children}</h3>,
        p: ({ children }) => <p className="mb-3 leading-7 text-slate-200">{children}</p>,
        ul: ({ children }) => <ul className="mb-4 ml-5 list-disc space-y-2 text-slate-200">{children}</ul>,
        ol: ({ children }) => <ol className="mb-4 ml-5 list-decimal space-y-2 text-slate-200">{children}</ol>,
        li: ({ children }) => <li className="leading-7">{children}</li>,
        a: ({ children, href }) => (
          <a href={href} target="_blank" rel="noreferrer" className="text-cyan-300 underline decoration-cyan-300/50 underline-offset-4">
            {children}
          </a>
        ),
        table: ({ children }) => (
          <div className="mb-4 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full border-collapse text-left text-sm text-slate-200">{children}</table>
          </div>
        ),
        th: ({ children }) => <th className="border-b border-white/10 bg-white/5 px-4 py-3 font-semibold text-white">{children}</th>,
        td: ({ children }) => <td className="border-b border-white/10 px-4 py-3 align-top">{children}</td>,
        blockquote: ({ children }) => (
          <blockquote className="mb-4 rounded-2xl border-l-4 border-cyan-400/60 bg-cyan-400/10 px-4 py-3 text-slate-100">
            {children}
          </blockquote>
        ),
        code: ({ inline, children }) =>
          inline ? (
            <code className="rounded-md bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-cyan-200">{children}</code>
          ) : (
            <CodeBlock>{children}</CodeBlock>
          ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}