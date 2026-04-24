import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Mic, PlaneTakeoff, Plus } from 'lucide-react'

const WEBHOOK_URL =
  import.meta.env.VITE_N8N_WEBHOOK_URL ||
  'https://prowler-poet-punctuate.ngrok-free.dev/webhook/34501890-e3a0-4ab7-a346-593664fc30d9/chat'

const SESSION_KEY = 'aeroiq_session'
const CONVERSATIONS_KEY = 'aeroiq_conversations'
const ACTIVE_CONVERSATION_KEY = 'aeroiq_active_conversation'

const suggestions = [
  'Fastest Delhi to Singapore, 15 May, 2 adults',
  'Cheapest Mumbai to Dubai, 20 May, 1 adult',
  'Best value London to Tokyo, 10 June, 1 adult',
  'Mumbai to Goa round trip, 30 May return 2 June',
]

function ChatPage() {
  const [sessionId] = useState(() => getSessionId())
  const [conversations, setConversations] = useState(() => readConversations())
  const [activeConversationId, setActiveConversationId] = useState(() =>
    window.localStorage.getItem(ACTIVE_CONVERSATION_KEY),
  )
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const bottomRef = useRef(null)
  const textareaRef = useRef(null)

  const activeConversation = useMemo(
    () => conversations.find((conversation) => conversation.id === activeConversationId) || null,
    [activeConversationId, conversations],
  )
  const messages = activeConversation?.messages || []

  useEffect(() => {
    window.localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations))
  }, [conversations])

  useEffect(() => {
    if (activeConversationId) {
      window.localStorage.setItem(ACTIVE_CONVERSATION_KEY, activeConversationId)
    } else {
      window.localStorage.removeItem(ACTIVE_CONVERSATION_KEY)
    }
  }, [activeConversationId])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, isLoading])

  useEffect(() => {
    if (!textareaRef.current) return

    textareaRef.current.style.height = '0px'
    const nextHeight = Math.min(textareaRef.current.scrollHeight, 132)
    textareaRef.current.style.height = `${nextHeight}px`
  }, [input])

  const handleNewChat = () => {
    setActiveConversationId(null)
    setInput('')
    textareaRef.current?.focus()
  }

  const handleSubmit = async () => {
    const userMessage = input.trim()

    if (!userMessage || isLoading) return

    const conversationId = activeConversationId || crypto.randomUUID()
    const now = new Date().toISOString()
    const userEntry = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userMessage,
      timestamp: now,
    }

    setInput('')
    setActiveConversationId(conversationId)
    setConversations((current) => appendMessage(current, conversationId, userMessage, userEntry))
    setIsLoading(true)

    try {
      const reply = await sendMessage(userMessage, sessionId)
      const assistantEntry = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: reply || 'I received your request, but AeroIQ did not return a readable answer.',
        timestamp: new Date().toISOString(),
      }

      setConversations((current) => appendMessage(current, conversationId, userMessage, assistantEntry))
    } catch {
      const errorEntry = {
        id: crypto.randomUUID(),
        role: 'error',
        content: 'Connection issue. Make sure AeroIQ server is running.',
        timestamp: new Date().toISOString(),
      }

      setConversations((current) => appendMessage(current, conversationId, userMessage, errorEntry))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0A0A0A] font-[Inter] text-white">
      <aside className="hidden w-[260px] shrink-0 flex-col border-r border-[#1F1F1F] bg-[#0D0D0D] p-5 md:flex">
        <div>
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#141414]">
              <PlaneTakeoff size={18} className="text-[#3B82F6]" />
            </div>
            <div>
              <div className="text-[15px] font-semibold leading-none text-white">AeroIQ</div>
              <div className="mt-1 text-[13px] text-[#888]">AI Flight Search</div>
            </div>
          </a>

          <button
            type="button"
            onClick={handleNewChat}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-lg border border-[#2a2a2a] bg-transparent px-4 py-3 text-[15px] font-medium text-white transition hover:border-[#3a3a3a] hover:bg-[#171717]"
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>

        <div className="mt-8 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              onClick={() => setActiveConversationId(conversation.id)}
              className={`w-full rounded-lg px-3 py-3 text-left text-[13px] leading-5 transition ${
                activeConversationId === conversation.id
                  ? 'bg-[#1a1a1a] text-white'
                  : 'text-[#888] hover:bg-[#141414] hover:text-white'
              }`}
            >
              {conversation.title}
            </button>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 border-t border-[#1F1F1F] pt-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2a2a2a] bg-[#141414]">
            <PlaneTakeoff size={16} className="text-[#3B82F6]" />
          </div>
          <div className="text-[13px] font-medium text-[#888]">AeroIQ v1.0</div>
        </div>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col bg-[#0A0A0A]">
        <div className="flex items-center justify-between border-b border-[#1F1F1F] px-5 py-4 md:hidden">
          <a href="/" className="flex items-center gap-2 text-[15px] font-semibold text-white">
            <PlaneTakeoff size={17} className="text-[#3B82F6]" />
            AeroIQ
          </a>
          <button
            type="button"
            onClick={handleNewChat}
            className="rounded-full border border-[#2a2a2a] p-2 text-white transition hover:border-[#3a3a3a]"
            aria-label="New chat"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-8 sm:px-12">
          <div className="mx-auto flex min-h-full max-w-[680px] flex-col">
            {messages.length === 0 && !isLoading ? (
              <EmptyState input={input} onSuggestionClick={setInput} />
            ) : (
              <div className="flex flex-1 flex-col justify-end gap-6 pb-6">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                {isLoading ? <LoadingBubble /> : null}
                <div ref={bottomRef} />
              </div>
            )}
          </div>
        </div>

        <div className="px-5 pb-6 sm:px-12">
          <div className="mx-auto max-w-[680px]">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                handleSubmit()
              }}
              className="flex items-end gap-3 rounded-2xl border border-[#2a2a2a] bg-[#141414] p-4 transition focus-within:border-[#3a3a3a]"
            >
              <Mic size={20} className="mb-2 shrink-0 text-[#555]" />
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    handleSubmit()
                  }
                }}
                rows={1}
                placeholder="e.g. Mumbai to Dubai, 20 May, cheapest..."
                className="max-h-[132px] min-h-[40px] flex-1 resize-none overflow-y-auto bg-transparent py-2 text-[15px] leading-[1.65] text-white outline-none placeholder:text-[#555]"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="mb-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-white transition hover:bg-[#3B82F6] disabled:cursor-not-allowed disabled:bg-[#1d3264] disabled:text-white/45"
                aria-label="Send message"
              >
                <ArrowUp size={18} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

function EmptyState({ input, onSuggestionClick }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <h1 className="text-[32px] font-light leading-tight text-white">Where would you like to fly?</h1>
      <p className="mt-4 text-base text-[#888]">Ask AeroIQ anything about flights</p>
      <div className="mt-8 grid w-full max-w-[620px] grid-cols-1 gap-3 sm:grid-cols-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => onSuggestionClick(suggestion)}
            className={`rounded-xl border bg-[#1a1a1a] px-4 py-3 text-left text-[15px] leading-6 text-white transition hover:border-[#3a3a3a] ${
              input === suggestion
                ? 'border-[#3a3a3a]'
                : 'border-[#2a2a2a]'
            }`}
          >
            <span className="mr-2">{['⚡', '✈️', '🌍', '🔄'][index]}</span>
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  )
}

function MessageBubble({ message }) {
  const isUser = message.role === 'user'
  const isError = message.role === 'error'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-3 ${isUser ? 'max-w-[70%] flex-row-reverse' : 'max-w-[80%]'}`}>
        {!isUser ? (
          <div
            className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
              isError ? 'bg-red-500/10 text-red-300' : 'bg-[#141414] text-[#3B82F6]'
            }`}
          >
            <PlaneTakeoff size={14} />
          </div>
        ) : null}

        <div>
          <div
            className={`px-4 py-3 text-[15px] leading-[1.65] text-white ${
              isUser
                ? 'rounded-[18px] rounded-br-[4px] bg-[#2563EB]'
                : isError
                  ? 'rounded-[18px] rounded-bl-[4px] border border-red-500/20 bg-red-950/30 text-red-100'
                  : 'rounded-[18px] rounded-bl-[4px] bg-[#141414]'
            }`}
          >
            <div className="whitespace-pre-wrap">{message.content}</div>
          </div>
          <div className={`mt-2 text-[12px] text-[#555] ${isUser ? 'text-right' : 'text-left'}`}>
            {formatTime(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  )
}

function LoadingBubble() {
  return (
    <div className="flex justify-start">
      <div className="flex max-w-[80%] gap-3">
        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#141414] text-[#3B82F6]">
          <PlaneTakeoff size={14} />
        </div>
        <motion.div
          animate={{ opacity: [0.72, 1, 0.72] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-[18px] rounded-bl-[4px] bg-[#141414] px-4 py-4"
        >
          <div className="flex items-center gap-1.5">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.12, ease: 'easeInOut' }}
                className="h-2 w-2 rounded-full bg-[#888]"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

async function sendMessage(userMessage, sessionId) {
  const response = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chatInput: userMessage,
      sessionId,
    }),
  })

  if (!response.ok) {
    throw new Error(`AeroIQ request failed with ${response.status}`)
  }

  const data = await response.json()
  return data.output
}

function getSessionId() {
  const storedSessionId = window.localStorage.getItem(SESSION_KEY)

  if (storedSessionId) {
    return storedSessionId
  }

  const nextSessionId = crypto.randomUUID()
  window.localStorage.setItem(SESSION_KEY, nextSessionId)
  return nextSessionId
}

function readConversations() {
  try {
    const stored = window.localStorage.getItem(CONVERSATIONS_KEY)
    const conversations = stored ? JSON.parse(stored) : []
    return Array.isArray(conversations) ? conversations : []
  } catch {
    return []
  }
}

function appendMessage(conversations, conversationId, firstUserMessage, message) {
  const now = new Date().toISOString()
  const existingConversation = conversations.find((conversation) => conversation.id === conversationId)

  if (!existingConversation) {
    return [
      {
        id: conversationId,
        title: createConversationTitle(firstUserMessage),
        createdAt: now,
        updatedAt: now,
        messages: [message],
      },
      ...conversations,
    ]
  }

  return conversations
    .map((conversation) =>
      conversation.id === conversationId
        ? {
            ...conversation,
            title: conversation.title || createConversationTitle(firstUserMessage),
            updatedAt: now,
            messages: [...conversation.messages, message],
          }
        : conversation,
    )
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
}

function createConversationTitle(message) {
  const title = message.replace(/\s+/g, ' ').trim().slice(0, 40)
  return title || 'New flight search'
}

function formatTime(timestamp) {
  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

export default ChatPage
