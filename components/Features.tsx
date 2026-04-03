'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Phone, PhoneForwarded, CalendarCheck, Star, CreditCard, MessageSquare, Zap, Send } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

// ── Scenarios ─────────────────────────────────────────────────────────
const SCENARIOS = [
  {
    id: 0,
    chip: 'Burst pipe',
    callerName: 'Mike T.',
    callerType: 'Emergency',
    message: '"I have a burst pipe — my basement is flooding right now!"',
    aiResponse: '"This is urgent. I\'m connecting you to the owner immediately — please stay on the line."',
    tagColor: '#EF4444',
    tagBg: '#FEF2F2',
    outcomes: [
      { label: 'Live transfer', Icon: PhoneForwarded, c: '#EF4444', bg: '#FEF2F2', br: '#FECACA' },
      { label: 'SMS sent to owner', Icon: MessageSquare, c: '#0D5C3A', bg: '#F0FDF4', br: '#BBF7D0' },
      { label: 'Call logged', Icon: Zap, c: '#6B7280', bg: '#F9F9F9', br: '#E5E7EB' },
    ],
  },
  {
    id: 1,
    chip: 'Roof quote',
    callerName: 'Sarah K.',
    callerType: 'Booking',
    message: '"Hi, I need someone to look at my roof — there\'s some damage from the storm last week."',
    aiResponse: '"Of course — I can get someone out there. Are you free this Thursday afternoon or Friday morning?"',
    tagColor: '#2563EB',
    tagBg: '#EFF6FF',
    outcomes: [
      { label: 'Appointment booked', Icon: CalendarCheck, c: '#2563EB', bg: '#EFF6FF', br: '#BFDBFE' },
      { label: 'SMS confirmation', Icon: MessageSquare, c: '#0D5C3A', bg: '#F0FDF4', br: '#BBF7D0' },
      { label: 'Review requested', Icon: Star, c: '#D97706', bg: '#FFFBEB', br: '#FDE68A' },
    ],
  },
  {
    id: 2,
    chip: 'Power out',
    callerName: 'Jennifer W.',
    callerType: 'Emergency',
    message: '"Half the house just lost power — nothing on that circuit is working."',
    aiResponse: '"Partial outages can be a safety risk. I\'m flagging this as urgent and getting an electrician to call you back right now."',
    tagColor: '#EF4444',
    tagBg: '#FEF2F2',
    outcomes: [
      { label: 'Live transfer', Icon: PhoneForwarded, c: '#EF4444', bg: '#FEF2F2', br: '#FECACA' },
      { label: 'Priority flagged', Icon: Zap, c: '#D97706', bg: '#FFFBEB', br: '#FDE68A' },
      { label: 'SMS sent to owner', Icon: MessageSquare, c: '#0D5C3A', bg: '#F0FDF4', br: '#BBF7D0' },
    ],
  },
  {
    id: 3,
    chip: 'Leaky faucet',
    callerName: 'Carlos M.',
    callerType: 'Booking',
    message: '"My kitchen faucet won\'t stop dripping — it\'s been going on for days."',
    aiResponse: '"Happy to help! I have Thursday at 2pm or Friday morning open. Which works better for you?"',
    tagColor: '#2563EB',
    tagBg: '#EFF6FF',
    outcomes: [
      { label: 'Appointment booked', Icon: CalendarCheck, c: '#2563EB', bg: '#EFF6FF', br: '#BFDBFE' },
      { label: 'Payment ready', Icon: CreditCard, c: '#7C3AED', bg: '#F5F3FF', br: '#DDD6FE' },
      { label: 'Review requested', Icon: Star, c: '#D97706', bg: '#FFFBEB', br: '#FDE68A' },
    ],
  },
]

type Phase = 'idle' | 'caller' | 'typing' | 'response' | 'outcomes'

function analyze(text: string): typeof SCENARIOS[0] {
  const isEmerg = /burst|flood|fire|emergency|no power|power out|gas leak|no heat/.test(text.toLowerCase())
  return isEmerg ? SCENARIOS[0] : SCENARIOS[1]
}

// ── Call Simulator ─────────────────────────────────────────────────────
function CallSimulator() {
  const [scenario, setScenario] = useState(SCENARIOS[0])
  const [phase, setPhase] = useState<Phase>('idle')
  const [input, setInput] = useState('')
  const [userTook, setUserTook] = useState(false)
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([])

  function clearTimers() {
    timerRef.current.forEach(clearTimeout)
    timerRef.current = []
  }

  function play(sc: typeof SCENARIOS[0]) {
    clearTimers()
    setScenario(sc)
    setPhase('caller')
    timerRef.current.push(setTimeout(() => setPhase('typing'), 900))
    timerRef.current.push(setTimeout(() => setPhase('response'), 2400))
    timerRef.current.push(setTimeout(() => setPhase('outcomes'), 3100))
  }

  function pick(sc: typeof SCENARIOS[0]) {
    setUserTook(true)
    if (autoRef.current) clearInterval(autoRef.current)
    play(sc)
  }

  function submit() {
    const t = input.trim()
    if (!t) return
    setUserTook(true)
    if (autoRef.current) clearInterval(autoRef.current)
    clearTimers()
    const sc = analyze(t)
    const custom = { ...sc, message: `"${t}"`, id: 99, chip: 'Custom' }
    setInput('')
    play(custom)
  }

  // Auto-cycle
  useEffect(() => {
    if (userTook) return
    let i = 0
    play(SCENARIOS[0])
    autoRef.current = setInterval(() => {
      i = (i + 1) % SCENARIOS.length
      play(SCENARIOS[i])
    }, 5500)
    return () => {
      if (autoRef.current) clearInterval(autoRef.current)
      clearTimers()
    }
  }, [userTook])

  return (
    <div className="rounded-2xl border border-bdr overflow-hidden"
      style={{ background: '#FAFAF8', boxShadow: '0 4px 40px rgba(13,31,24,0.07)' }}>

      {/* ── Phone call header ── */}
      <div className="flex items-center gap-3 px-4 sm:px-6 py-4 border-b border-bdr"
        style={{ background: '#0D1F18' }}>
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-9 h-9 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center shrink-0">
          <Phone size={15} className="text-accent" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.p key={scenario.id}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              className="font-heading font-bold text-sm text-bg leading-none mb-0.5">
              {scenario.callerName}
            </motion.p>
          </AnimatePresence>
          <p className="text-[10px] sm:text-[11px] text-accent/60">Incoming call · Answering now</p>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <span className="hidden sm:inline px-2.5 py-1 rounded-full text-[10px] font-heading font-bold"
            style={{ background: scenario.tagBg, color: scenario.tagColor }}>
            {scenario.callerType}
          </span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[11px] font-heading font-semibold text-accent">Live</span>
          </div>
        </div>
      </div>

      {/* ── Transcript ── */}
      <div className="px-4 sm:px-6 py-6 sm:py-7 min-h-[160px] sm:min-h-[180px] flex flex-col gap-4">

        {/* Caller bubble */}
        <AnimatePresence>
          {(phase === 'caller' || phase === 'typing' || phase === 'response' || phase === 'outcomes') && (
            <motion.div
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-end gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-heading font-bold text-xs text-ink-muted"
                style={{ background: '#EDE8DF', border: '1px solid #DED8CC' }}>
                {scenario.callerName[0]}
              </div>
              <div className="rounded-2xl rounded-bl-sm px-4 py-3 max-w-lg"
                style={{ background: '#FFFFFF', border: '1px solid #EDE8DF', boxShadow: '0 1px 8px rgba(0,0,0,0.04)' }}>
                <AnimatePresence mode="wait">
                  <motion.p key={scenario.id} className="text-sm text-ink leading-relaxed"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {scenario.message}
                  </motion.p>
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI typing indicator */}
        <AnimatePresence>
          {phase === 'typing' && (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
              className="flex items-end gap-3 self-end">
              <div className="rounded-2xl rounded-br-sm px-4 py-3.5 flex items-center gap-1.5"
                style={{ background: '#0D1F18' }}>
                {[0, 1, 2].map(i => (
                  <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-accent block"
                    animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                    transition={{ duration: 0.8, delay: i * 0.18, repeat: Infinity }} />
                ))}
              </div>
              <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-[10px] font-heading font-bold text-accent">
                AI
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI response */}
        <AnimatePresence>
          {(phase === 'response' || phase === 'outcomes') && (
            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-end gap-3 self-end">
              <div className="rounded-2xl rounded-br-sm px-4 py-3 max-w-lg"
                style={{ background: '#0D1F18', boxShadow: '0 4px 20px rgba(13,31,24,0.15)' }}>
                <AnimatePresence mode="wait">
                  <motion.p key={scenario.id} className="text-sm leading-relaxed" style={{ color: '#64EDBB' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {scenario.aiResponse}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-[10px] font-heading font-bold text-accent">
                AI
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Outcomes ── */}
      <AnimatePresence>
        {phase === 'outcomes' && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
            className="px-4 sm:px-6 pb-5 flex items-center gap-2 flex-wrap border-t border-bdr pt-4">
            <p className="text-[10px] font-heading font-semibold text-ink-subtle uppercase tracking-wider mr-1">Then automatically →</p>
            {scenario.outcomes.map((o, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-heading font-semibold"
                style={{ background: o.bg, color: o.c, border: `1px solid ${o.br}` }}>
                <o.Icon size={11} />
                {o.label}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Input bar ── */}
      <div className="px-4 sm:px-6 pb-6 pt-4 border-t border-bdr">
        <div className="flex gap-2 mb-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Type what your customer might say…"
            className="flex-1 text-sm px-4 py-3 rounded-xl border border-bdr bg-bg text-ink placeholder:text-ink-subtle focus:outline-none focus:border-accent/40 transition-colors"
          />
          <button onClick={submit} disabled={!input.trim()}
            className="w-11 h-11 rounded-xl bg-ink flex items-center justify-center shrink-0 transition-opacity disabled:opacity-30 hover:opacity-80">
            <Send size={13} style={{ color: '#64EDBB' }} />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-[11px] text-ink-subtle">try:</span>
          {SCENARIOS.map(sc => (
            <button key={sc.id} onClick={() => pick(sc)}
              className="text-xs px-3 py-1 rounded-full font-heading font-medium transition-all duration-200"
              style={{
                background: scenario.id === sc.id && userTook ? '#0D1F18' : 'rgba(255,255,255,0.9)',
                color: scenario.id === sc.id && userTook ? '#64EDBB' : '#5A7A6A',
                border: `1px solid ${scenario.id === sc.id && userTook ? '#0D1F18' : '#DED8CC'}`,
              }}>
              {sc.chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Section ────────────────────────────────────────────────────────────
export default function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-36 overflow-hidden"
      style={{
        background: '#F4F0E8',
        backgroundImage: 'radial-gradient(circle, rgba(13,31,24,0.055) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12 lg:mb-16">
          <AnimatedSection>
            <p className="text-xs font-heading font-medium text-accent uppercase tracking-[0.2em] mb-5">
              Call Triage
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <h2 className="font-heading font-bold tracking-tighter text-ink leading-[0.93] mb-5"
              style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)' }}>
              Every call handled
              <br /><span className="text-ink-muted">in under 2 seconds.</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.14}>
            <p className="text-base text-ink-muted leading-relaxed max-w-lg">
              Type what a customer might say — or pick a scenario — and watch BOKT handle it in real time.
            </p>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.2}>
          <CallSimulator />
        </AnimatedSection>

        <div className="mt-8 grid grid-cols-3 gap-4 lg:gap-8">
          {[
            { value: '< 2s',  label: 'Average answer time'      },
            { value: '100%',  label: 'Calls answered, any hour' },
            { value: '0',     label: 'Voicemails ever left'     },
          ].map((stat, i) => (
            <AnimatedSection key={i} delay={0.3 + i * 0.07}>
              <div className="text-center border-t border-bdr pt-6">
                <p className="font-heading font-bold tracking-tighter text-ink mb-1"
                  style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}>
                  {stat.value}
                </p>
                <p className="text-xs text-ink-muted">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  )
}
