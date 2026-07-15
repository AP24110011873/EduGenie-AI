import { useEffect, useMemo, useState } from 'react'
import { FiSend, FiRefreshCw, FiMessageSquare, FiZap } from 'react-icons/fi'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { ChatBubble } from '../components/chat/ChatBubble'
import { TypingIndicator } from '../components/chat/TypingIndicator'
import { useAutoScroll } from '../hooks/useAutoScroll'
import { usePageTitle } from '../hooks/usePageTitle'
import { useToast } from '../hooks/useToast'
import { useActivity } from '../hooks/useActivity'
import { getStoredChatHistory, setStoredChatHistory, clearStoredChatHistory } from '../utils/storage'
import { sendMessage } from '../services/chatService'

const starterPrompts = [
  'Explain the difference between supervised and unsupervised learning.',
  'Summarize the benefits of React context API.',
  'Give me a quick study plan for machine learning interviews.',
]

const welcomeMessage = {
  id: 'welcome',
  role: 'assistant',
  content: 'Hello! I am your AI study assistant. Ask me anything and I will answer with markdown, bullets, and code blocks when needed.',
}

export default function Chat() {
  usePageTitle('AI Chat')
  const [messages, setMessages] = useState(() => {
    const storedHistory = getStoredChatHistory()
    return storedHistory.length ? storedHistory : [welcomeMessage]
  })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useAutoScroll(messages.length + loading)
  const { addToast } = useToast()
  const { recordActivity } = useActivity()

  useEffect(() => {
    setStoredChatHistory(messages.filter((item) => item.id !== welcomeMessage.id))
  }, [messages])

  const canSubmit = useMemo(() => message.trim().length > 0 && !loading, [message, loading])

  const handleSend = async (customMessage) => {
    const text = (customMessage || message).trim()
    if (!text || loading) return

    const userMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content: text,
    }

    setMessages((currentMessages) => [...currentMessages, userMessage])
    setMessage('')
    setLoading(true)

    try {
      const response = await sendMessage(text)
      const assistantMessage = {
        id: `${Date.now()}-assistant`,
        role: 'assistant',
        content: response.response,
      }

      setMessages((currentMessages) => [...currentMessages, assistantMessage])
      recordActivity({
        type: 'chat',
        title: 'AI chat response generated',
        description: text,
        meta: { replyLength: response.response?.length || 0 },
      })
      addToast({ variant: 'success', title: 'Response ready', description: 'Gemini returned a fresh learning answer.' })
    } catch (requestError) {
      const errorMessage = requestError?.response?.data?.detail || 'Unable to generate a response right now.'
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          id: `${Date.now()}-error`,
          role: 'assistant',
          content: `Sorry, I could not complete that request.\n\n**Reason:** ${errorMessage}`,
        },
      ])
      addToast({ variant: 'error', title: 'Chat failed', description: errorMessage })
    } finally {
      setLoading(false)
    }
  }

  const clearConversation = () => {
    const nextMessages = [welcomeMessage]
    setMessages(nextMessages)
    clearStoredChatHistory()
    addToast({ variant: 'info', title: 'Conversation cleared', description: 'Chat history has been reset locally.' })
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Card className="flex min-h-[calc(100vh-10rem)] flex-col overflow-hidden p-0">
        <div className="border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-400">AI Chat</p>
              <h1 className="text-2xl font-bold text-white">ChatGPT-style study assistant</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" size="sm" icon={<FiRefreshCw />} onClick={clearConversation}>
                Reset chat
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 sm:px-6">
          {messages.length ? messages.map((item) => <ChatBubble key={item.id} role={item.role} message={item.content} />) : null}
          {loading ? <TypingIndicator /> : null}
          <div ref={endRef} />
        </div>

        <div className="border-t border-white/10 p-4 sm:p-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:border-cyan-400/25 hover:bg-white/8"
                >
                  <FiZap className="mr-2 inline" />
                  {prompt}
                </button>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault()
                handleSend()
              }}
              className="space-y-3"
            >
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    handleSend()
                  }
                }}
                rows={4}
                placeholder="Ask anything about programming, math, science, or the documents you upload..."
                className="w-full resize-none rounded-[1.5rem] border border-white/10 bg-slate-900/70 px-4 py-4 text-sm leading-7 text-white placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/15"
              />

              <div className="flex items-center justify-between gap-4">
                <p className="text-xs text-slate-400">Press Enter to send, Shift+Enter for a new line.</p>
                <Button type="submit" loading={loading} disabled={!canSubmit} icon={<FiSend />}>
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <Card>
          <p className="text-sm text-slate-400">How it works</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Optimized for learning workflows</h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-300">
            <p>Messages are sent to <span className="font-mono text-cyan-200">POST /api/ai/chat</span> with a bearer token.</p>
            <p>Responses render with markdown, code blocks, and copy buttons for clean study notes.</p>
            <p>Your local chat history is preserved in the browser so you can continue where you left off.</p>
          </div>
        </Card>

        <Card>
          <p className="text-sm text-slate-400">Prompt starter</p>
          <h2 className="mt-1 text-xl font-semibold text-white">Use these ideas to explore</h2>
          <div className="mt-5 grid gap-3">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-left text-sm leading-6 text-slate-200 transition hover:border-cyan-400/20 hover:bg-white/8"
              >
                {prompt}
              </button>
            ))}
          </div>
        </Card>

        {!messages.length ? (
          <EmptyState
            icon={<FiMessageSquare />}
            title="Start your first chat"
            description="Ask for explanations, summaries, code help, or study plans and get polished markdown responses."
            actionLabel="Try the first prompt"
            onAction={() => handleSend(starterPrompts[0])}
          />
        ) : null}
      </div>
    </div>
  )
}