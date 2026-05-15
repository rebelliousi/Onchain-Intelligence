'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, Minimize2 } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  time: string
}

const SUGGESTIONS = [
  'What are the newest risky tokens?',
  'Check top trending assets',
  'Is it safe to trade high-volume memes?',
  'Show me the AURA trust index',
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [hasNewMsg, setHasNewMsg] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
      setHasNewMsg(false)
    }
  }, [isOpen])

  const sendMessage = async (text?: string) => {
    const userText = text || input.trim()
    if (!userText || loading) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // We only send the message text and role
          messages: [...messages, userMsg].map(m => ({
            role: m.role,
            content: m.content,
          })),
        }),
      })

      const data = await response.json()
      const aiText = data.message || 'Signal lost. Re-establishing link to the blockchain...'

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages(prev => [...prev, aiMsg])

      // Show notification if chat is closed
      if (!isOpen) setHasNewMsg(true)

    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Neural link offline. Please verify API configuration.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '24px',
              width: '360px',
              height: '520px',
              borderRadius: '24px',
              background: 'rgba(8,8,8,0.95)',
              border: '1px solid rgba(0,255,209,0.15)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 60px rgba(0,255,209,0.06), 0 30px 60px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 99998,
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexShrink: 0,
            }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(0,255,209,0.1)',
                border: '1px solid rgba(0,255,209,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
                position: 'relative',
              }}>
                <Bot size={16} color="#00FFD1" />
                <div style={{
                  position: 'absolute', bottom: '1px', right: '1px',
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: '#00FFD1',
                  boxShadow: '0 0 6px #00FFD1',
                  border: '1.5px solid #080808',
                }} />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>
                  AURA AI
                </div>
                <div style={{ fontSize: '0.6rem', color: '#00FFD1', letterSpacing: '0.15em', fontWeight: 600 }}>
                  Powered by Groq · Active
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                style={{
                  width: '28px', height: '28px', borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'transparent',
                  color: 'rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <Minimize2 size={14} />
              </button>
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              scrollbarWidth: 'thin',
              scrollbarColor: '#1a1a1a transparent',
            }}>
              
              {/* STATIC INITIAL MESSAGE (UI ONLY) */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                 <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,255,209,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={12} color="#00FFD1" />
                 </div>
                 <div style={{ maxWidth: '75%', padding: '10px 14px', borderRadius: '16px 16px 16px 4px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, fontWeight: 300 }}>
                    Welcome. I am AURA. I am currently monitoring the Solana block for risky new listings and whale radar signals. How can I assist your analysis?
                 </div>
              </div>

              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                    gap: '8px',
                    alignItems: 'flex-end',
                  }}
                >
                  {msg.role === 'assistant' && (
                    <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,255,209,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Bot size={12} color="#00FFD1" />
                    </div>
                  )}

                  <div style={{ maxWidth: '75%' }}>
                    <div style={{
                      padding: '10px 14px',
                      borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                      background: msg.role === 'user' ? 'rgba(0,255,209,0.12)' : 'rgba(255,255,255,0.04)',
                      border: msg.role === 'user' ? '1px solid rgba(0,255,209,0.2)' : '1px solid rgba(255,255,255,0.06)',
                      fontSize: '0.8rem',
                      color: msg.role === 'user' ? '#fff' : 'rgba(255,255,255,0.85)',
                      lineHeight: 1.6,
                      fontWeight: 300,
                    }}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0,255,209,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bot size={12} color="#00FFD1" />
                  </div>
                  <div style={{ padding: '12px 16px', borderRadius: '16px 16px 16px 4px', background: 'rgba(255,255,255,0.04)', display: 'flex', gap: '4px' }}>
                    {[0, 1, 2].map(i => (
                      <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#00FFD1' }} />
                    ))}
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {messages.length === 0 && (
              <div style={{ padding: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {SUGGESTIONS.map(s => (
                  <button key={s} onClick={() => sendMessage(s)} style={{ padding: '5px 10px', borderRadius: '100px', border: '1px solid rgba(0,255,209,0.15)', background: 'rgba(0,255,209,0.05)', color: 'rgba(0,255,209,0.7)', fontSize: '0.6rem', cursor: 'pointer', transition: 'all 0.2s', fontWeight: 300 }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Consult the neural network..."
                disabled={loading}
                style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 14px', color: '#fff', fontSize: '0.8rem', outline: 'none', fontWeight: 300 }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                style={{ width: '38px', height: '38px', borderRadius: '12px', border: 'none', background: input.trim() && !loading ? 'rgba(0,255,209,0.15)' : 'rgba(255,255,255,0.04)', color: input.trim() && !loading ? '#00FFD1' : 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating bubble button */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        style={{ position: 'fixed', bottom: '24px', right: '24px', width: '56px', height: '56px', borderRadius: '50%', background: isOpen ? 'rgba(255,255,255,0.08)' : 'rgba(0,255,209,0.12)', border: `1px solid ${isOpen ? 'rgba(255,255,255,0.1)' : 'rgba(0,255,209,0.3)'}`, boxShadow: isOpen ? 'none' : '0 0 30px rgba(0,255,209,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 99999 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><X size={20} color="white" /></motion.div>
          ) : (
            <motion.div key="o" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'relative' }}>
              <Bot size={22} color="#00FFD1" />
              {hasNewMsg && (
                <div style={{ position: 'absolute', top: -12, right: -12, width: '12px', height: '12px', borderRadius: '50%', background: '#00FFD1', boxShadow: '0 0 10px #00FFD1', border: '2px solid #050505' }} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  )
}