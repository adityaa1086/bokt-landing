'use client'

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import AnimatedSection from './AnimatedSection'

// ── Map geometry ────────────────────────────────────────────────────────
const BUILDINGS = [
  { x: 18,  y: 22,  w: 100, h: 85, type: 'house'       },
  { x: 130, y: 22,  w: 40,  h: 40, type: 'small'       },
  { x: 130, y: 68,  w: 40,  h: 38, type: 'small'       },
  { x: 198, y: 22,  w: 120, h: 85, type: 'house'       },
  { x: 356, y: 22,  w: 110, h: 85, type: 'competitor2' },
  { x: 18,  y: 140, w: 100, h: 60, type: 'house'       },
  { x: 130, y: 140, w: 40,  h: 60, type: 'small'       },
  { x: 194, y: 132, w: 148, h: 76, type: 'client'      },
  { x: 360, y: 140, w: 106, h: 60, type: 'house'       },
  { x: 18,  y: 236, w: 100, h: 90, type: 'competitor3' },
  { x: 130, y: 236, w: 112, h: 90, type: 'house'       },
  { x: 264, y: 236, w: 78,  h: 90, type: 'house'       },
  { x: 356, y: 236, w: 110, h: 90, type: 'house'       },
]
const STREETS = [
  { x1: 0,   y1: 128, x2: 480, y2: 128 },
  { x1: 0,   y1: 228, x2: 480, y2: 228 },
  { x1: 176, y1: 0,   x2: 176, y2: 338 },
  { x1: 350, y1: 0,   x2: 350, y2: 338 },
]
const CLIENT_CX = 268
const CLIENT_CY = 170
const CALL_ARCS = [
  { d: `M 68 64 Q 140 20 ${CLIENT_CX} ${CLIENT_CY}`,    delay: 0.2, dur: 2.0, rep: 3.5 },
  { d: `M 258 64 Q 270 90 ${CLIENT_CX} ${CLIENT_CY}`,   delay: 0.8, dur: 1.6, rep: 3.0 },
  { d: `M 411 64 Q 370 100 ${CLIENT_CX} ${CLIENT_CY}`,  delay: 0.4, dur: 2.2, rep: 4.0 },
  { d: `M 68 170 Q 120 140 ${CLIENT_CX} ${CLIENT_CY}`,  delay: 1.1, dur: 1.4, rep: 2.8 },
  { d: `M 186 281 Q 220 240 ${CLIENT_CX} ${CLIENT_CY}`, delay: 0.6, dur: 1.8, rep: 3.2 },
  { d: `M 405 281 Q 380 240 ${CLIENT_CX} ${CLIENT_CY}`, delay: 1.4, dur: 2.0, rep: 4.2 },
]

function getBuildingStyle(type: string) {
  switch (type) {
    case 'client':      return { fill: 'rgba(13,92,58,0.08)', stroke: 'rgba(13,92,58,0.5)', sw: 1.5 }
    case 'competitor2': return { fill: 'rgba(13,31,24,0.04)', stroke: 'rgba(13,31,24,0.18)', sw: 1   }
    case 'competitor3': return { fill: 'rgba(13,31,24,0.03)', stroke: 'rgba(13,31,24,0.12)', sw: 1   }
    case 'small':       return { fill: 'rgba(13,31,24,0.04)', stroke: '#DED8CC',             sw: 0.8 }
    default:            return { fill: 'rgba(13,31,24,0.05)', stroke: '#DED8CC',             sw: 1   }
  }
}

function MapPinSVG({ x, y, rank, color, delay, inView }: {
  x: number; y: number; rank: number; color: string; delay: number; inView: boolean
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
      <line x1={x} y1={y + 18} x2={x} y2={y + 26} stroke={color} strokeWidth="2" strokeOpacity="0.6" />
      <circle cx={x} cy={y + 9} r={9}
        fill={rank === 1 ? 'rgba(13,92,58,0.12)' : 'rgba(13,31,24,0.06)'}
        stroke={color} strokeWidth="1.5" />
      <text x={x} y={y + 13} textAnchor="middle" fill={color}
        fontSize={rank === 1 ? 8 : 7} fontWeight="700"
        fontFamily="'Space Grotesk', sans-serif">#{rank}</text>
    </motion.g>
  )
}

function CallDot({ d, delay, dur, rep, inView }: {
  d: string; delay: number; dur: number; rep: number; inView: boolean
}) {
  if (!inView) return null
  return (
    <motion.circle r={2.5} fill="#0D5C3A"
      style={{ offsetPath: `path('${d}')` } as React.CSSProperties}
      initial={{ offsetDistance: '0%', opacity: 0 }}
      animate={{ offsetDistance: ['0%', '100%'], opacity: [0, 0.85, 0.85, 0] }}
      transition={{ duration: dur, delay, repeat: Infinity, repeatDelay: rep, ease: 'easeInOut', times: [0, 0.1, 0.85, 1] }}
    />
  )
}

// ── Scoring logic (using real Places data) ──────────────────────────────
interface PlaceData {
  found: true
  name: string
  rating: number
  reviewCount: number
  address: string
  hasHours: boolean
  hasWebsite: boolean
  hasPhone: boolean
  hasPhotos: boolean
  photoCount: number
}

function computeScore(d: PlaceData): number {
  let s = 0
  // Reviews (max 35)
  s += d.reviewCount >= 200 ? 35 : d.reviewCount >= 100 ? 28 : d.reviewCount >= 50 ? 20
      : d.reviewCount >= 20 ? 13 : d.reviewCount >= 5 ? 7 : 2
  // Rating (max 20)
  s += d.rating >= 4.8 ? 20 : d.rating >= 4.5 ? 15 : d.rating >= 4.0 ? 10
      : d.rating >= 3.5 ? 6 : d.rating > 0 ? 2 : 0
  // Profile signals (max 30)
  if (d.hasPhone)  s += 8
  if (d.hasHours)  s += 8
  if (d.hasWebsite) s += 7
  if (d.hasPhotos) s += 5
  if (d.photoCount >= 10) s += 2
  return Math.min(s, 63) // cap so "with BOKT" can always be 93
}

// ── Audit result panel ──────────────────────────────────────────────────
function AuditResult({ data }: { data: PlaceData }) {
  const [barW, setBarW] = useState(0)
  const currentScore = computeScore(data)
  const boktScore = Math.min(93, currentScore + 30)
  const ratingLabel = data.rating > 0 ? `${data.rating.toFixed(1)} ★` : 'No data'
  const reviewLabel = data.reviewCount > 0 ? `${data.reviewCount}` : '0'

  useEffect(() => {
    const t = setTimeout(() => setBarW(boktScore), 350)
    return () => clearTimeout(t)
  }, [boktScore])

  const signals = [
    {
      label: 'Google reviews',
      now: reviewLabel,
      after: `${data.reviewCount + 20}+ in 3 mo`,
      bad: data.reviewCount < 50,
    },
    {
      label: 'Average rating',
      now: ratingLabel,
      after: data.rating > 0 ? `${Math.min(5, data.rating + 0.3).toFixed(1)} ★ target` : '4.9 ★ target',
      bad: data.rating < 4.5 || data.rating === 0,
    },
    {
      label: 'Review response',
      now: 'Slow / none',
      after: '< 1 hour',
      bad: true,
    },
    {
      label: 'Posts last 30 days',
      now: '0',
      after: '8 posts',
      bad: true,
    },
    {
      label: 'Map Pack position',
      now: '#5–9 est.',
      after: '#1',
      bad: true,
    },
  ]

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>

      {/* Business identity */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="min-w-0">
          <p className="font-heading font-bold text-base text-ink truncate">{data.name}</p>
          {data.address && (
            <p className="text-xs text-ink-subtle truncate mt-0.5">{data.address.split(',').slice(0, 2).join(',')}</p>
          )}
          {data.rating > 0 && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-amber-500 text-xs">{'★'.repeat(Math.round(data.rating))}</span>
              <span className="text-xs text-ink-muted">{data.rating.toFixed(1)} · {data.reviewCount} reviews</span>
            </div>
          )}
        </div>
        <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
          <span className="text-[11px] font-heading font-semibold text-red-600">Needs work</span>
        </div>
      </div>

      {/* Score bars */}
      <div className="mb-5 p-4 rounded-xl border border-bdr" style={{ background: 'rgba(13,31,24,0.02)' }}>
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="font-heading font-semibold text-ink-muted uppercase tracking-wider text-[10px]">Ranking Score</span>
          <div className="flex items-center gap-3">
            <span className="text-ink-subtle">Now: <strong className="text-red-500">{currentScore}</strong></span>
            <span className="text-ink-subtle">→ With BOKT: <strong className="text-accent">{boktScore}</strong></span>
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-[10px] text-ink-subtle mb-1"><span>Current</span><span>{currentScore}/100</span></div>
            <div className="h-2 rounded-full" style={{ background: '#EDE8DF' }}>
              <div className="h-full rounded-full" style={{ width: `${currentScore}%`, background: '#F87171' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] text-ink-subtle mb-1"><span>With BOKT</span><span>{boktScore}/100</span></div>
            <div className="h-2 rounded-full" style={{ background: '#EDE8DF' }}>
              <motion.div className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg,#0D5C3A,#64EDBB)' }}
                initial={{ width: '0%' }}
                animate={{ width: `${barW}%` }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Signals */}
      <div className="mb-5">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-3 pb-2 border-b border-bdr">
          <p className="text-[10px] font-heading font-semibold text-ink-subtle uppercase tracking-wider">Signal</p>
          <p className="text-[10px] font-heading font-semibold text-ink-subtle uppercase tracking-wider text-right">Now</p>
          <p className="text-[10px] font-heading font-semibold text-accent uppercase tracking-wider text-right">BOKT</p>
        </div>
        {signals.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            className="grid grid-cols-[1fr_auto_auto] gap-x-3 py-2 border-b border-bdr/50 items-center last:border-0">
            <p className="text-[11px] text-ink-muted leading-tight">{s.label}</p>
            <p className={`text-[11px] font-heading font-semibold text-right whitespace-nowrap ${s.bad ? 'text-red-500' : 'text-ink'}`}>{s.now}</p>
            <p className="text-[11px] font-heading font-bold text-accent text-right whitespace-nowrap">{s.after}</p>
          </motion.div>
        ))}
      </div>

      <a href="https://calendly.com/d/cx85-p96-f7t/bokt-home-introduction" target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-heading font-bold transition-opacity hover:opacity-85"
        style={{ background: '#0D1F18', color: '#64EDBB' }}>
        Fix this — start free
      </a>
    </motion.div>
  )
}

// ── Not found panel ─────────────────────────────────────────────────────
function NotFoundPanel({ name }: { name: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border p-5 text-center"
      style={{ background: 'rgba(220,38,38,0.04)', borderColor: '#FECACA' }}>
      <p className="text-2xl mb-3">⚠️</p>
      <p className="font-heading font-bold text-sm text-ink mb-2">
        &ldquo;{name}&rdquo; wasn&rsquo;t found on Google Maps
      </p>
      <p className="text-xs text-ink-muted leading-relaxed mb-4">
        If we can&rsquo;t find you, your customers can&rsquo;t either. This is exactly the problem BOKT solves.
      </p>
      <a href="https://calendly.com/d/cx85-p96-f7t/bokt-home-introduction" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-heading font-bold"
        style={{ background: '#0D1F18', color: '#64EDBB' }}>
        Get found — start free
      </a>
    </motion.div>
  )
}

// ── Scan animation ──────────────────────────────────────────────────────
function ScanPanel() {
  const steps = ['Finding your Google listing…', 'Reading review signals…', 'Checking profile completeness…', 'Analysing ranking gaps…']
  const [step, setStep] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setStep(s => Math.min(s + 1, steps.length - 1)), 500)
    return () => clearInterval(t)
  }, [])

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="rounded-xl border border-bdr bg-bg p-5 space-y-3">
      {steps.map((s, i) => (
        <div key={i} className={`flex items-center gap-2.5 transition-opacity ${i <= step ? 'opacity-100' : 'opacity-20'}`}>
          <div className={`w-4 h-4 rounded-full shrink-0 flex items-center justify-center ${
            i < step ? 'bg-accent/20 border border-accent/40' : i === step ? 'border-2 border-accent' : 'border border-bdr'
          }`}>
            {i < step && <span className="text-accent" style={{ fontSize: 9 }}>✓</span>}
            {i === step && <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse block" />}
          </div>
          <p className="text-xs text-ink-muted">{s}</p>
        </div>
      ))}
    </motion.div>
  )
}

// ── Main ────────────────────────────────────────────────────────────────
type Phase = 'idle' | 'scanning' | 'found' | 'notfound'

export default function LocalMapSection() {
  const mapRef = useRef(null)
  const inView = useInView(mapRef, { once: true, margin: '-8%' })

  const [input, setInput]   = useState('')
  const [query, setQuery]   = useState('')
  const [phase, setPhase]   = useState<Phase>('idle')
  const [result, setResult] = useState<PlaceData | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim()) return
    const q = input.trim()
    setQuery(q)
    setInput('')
    setPhase('scanning')

    try {
      const res = await fetch('/api/places', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q }),
      })
      const data = await res.json()
      if (data.found) {
        setResult(data as PlaceData)
        setPhase('found')
      } else {
        setPhase('notfound')
      }
    } catch {
      setPhase('notfound')
    }
  }

  return (
    <section id="local-map" className="relative py-24 lg:py-32 bg-bg-surface border-y border-bdr overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_80%_50%,rgba(100,237,187,0.04),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 1 }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── LEFT: copy + map ── */}
          <div>
            <AnimatedSection>
              <p className="text-xs font-heading font-medium text-accent uppercase tracking-[0.2em] mb-4">
                Google Maps domination
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="font-heading font-bold text-3xl sm:text-5xl tracking-tighter text-ink leading-tight mb-5">
                When someone nearby
                <br />needs a plumber —
                <br /><span className="text-gradient-accent">they find you first.</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="text-ink-muted leading-relaxed mb-8 max-w-md">
                44% of all Google clicks go to the top 3 Map Pack results.
                If you&rsquo;re not there, you&rsquo;re invisible.
              </p>
            </AnimatedSection>

            {/* Map */}
            <AnimatedSection delay={0.2}>
              <div ref={mapRef} className="relative border border-bdr rounded-2xl overflow-hidden bg-bg"
                style={{ aspectRatio: '480/320' }}>
                <svg viewBox="0 0 480 338" className="absolute inset-0 w-full h-full" fill="none">
                  <defs>
                    <pattern id="map-grid" width="16" height="16" patternUnits="userSpaceOnUse">
                      <path d="M 16 0 L 0 0 0 16" fill="none" stroke="rgba(13,31,24,0.05)" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="480" height="338" fill="#EDE8DF" />
                  <rect width="480" height="338" fill="url(#map-grid)" />
                  {STREETS.map((s, i) => <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#D4CEBC" strokeWidth="12" />)}
                  {STREETS.map((s, i) => <line key={`c${i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#CAC4B2" strokeWidth="10" />)}
                  {BUILDINGS.map((b, i) => {
                    const st = getBuildingStyle(b.type)
                    return (
                      <motion.rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx="3"
                        fill={st.fill} stroke={st.stroke} strokeWidth={st.sw}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.1 + i * 0.04, duration: 0.4 }} />
                    )
                  })}
                  {inView && (
                    <>
                      <motion.rect x={194} y={132} width={148} height={76} rx="3"
                        fill="none" stroke="rgba(13,92,58,0.35)" strokeWidth="1"
                        style={{ transformOrigin: `${CLIENT_CX}px ${CLIENT_CY}px` }}
                        initial={{ scale: 1, opacity: 0.5 }} animate={{ scale: 1.06, opacity: 0 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }} />
                      <motion.rect x={194} y={132} width={148} height={76} rx="3"
                        fill="none" stroke="rgba(13,92,58,0.18)" strokeWidth="1"
                        style={{ transformOrigin: `${CLIENT_CX}px ${CLIENT_CY}px` }}
                        initial={{ scale: 1, opacity: 0.4 }} animate={{ scale: 1.12, opacity: 0 }}
                        transition={{ duration: 2.5, delay: 0.8, repeat: Infinity, ease: 'easeOut' }} />
                    </>
                  )}
                  {CALL_ARCS.map((a, i) => (
                    <g key={i}>
                      <path d={a.d} stroke="rgba(13,92,58,0.1)" strokeWidth="1" strokeDasharray="3 3" />
                      <CallDot d={a.d} delay={a.delay} dur={a.dur} rep={a.rep} inView={inView} />
                    </g>
                  ))}
                  <MapPinSVG x={CLIENT_CX} y={106} rank={1} color="#0D5C3A"            delay={0.6} inView={inView} />
                  <MapPinSVG x={411}       y={-4}  rank={2} color="rgba(13,31,24,0.35)" delay={0.8} inView={inView} />
                  <MapPinSVG x={68}        y={208} rank={3} color="rgba(13,31,24,0.22)" delay={1.0} inView={inView} />
                </svg>

                {/* Search bar */}
                <div className="absolute top-3 left-3">
                  <div className="bg-bg-surface/92 backdrop-blur-sm border border-bdr rounded-lg px-3 py-1.5 flex items-center gap-2 w-fit">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <circle cx="5" cy="5" r="4" stroke="#4A706A" strokeWidth="1.5" />
                      <path d="M8.5 8.5L11 11" stroke="#4A706A" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-[10px] text-ink-muted">
                      {result ? `${result.name.split(' ')[0].toLowerCase()} near me` : 'plumber near me'}
                    </span>
                  </div>
                </div>

                {/* Map label */}
                {inView && (
                  <AnimatePresence mode="wait">
                    <motion.div key={result?.name || 'default'}
                      initial={{ opacity: 0, scale: 0.88, y: 6 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute bg-bg-surface/95 backdrop-blur-sm border border-accent/30 rounded-lg px-2.5 py-1.5 text-[10px]"
                      style={{ left: 186, top: 212 }}>
                      <p className="font-heading font-semibold text-accent">{result?.name || 'Your Business'}</p>
                      <div className="flex items-center gap-0.5">
                        <span className="text-amber-500" style={{ fontSize: 9 }}>
                          {'★'.repeat(result ? Math.round(result.rating) : 5)}
                        </span>
                        <span className="text-ink-muted ml-0.5">
                          {result ? `${result.reviewCount} reviews` : '— reviews'}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* 44% badge */}
                <div className="absolute bottom-3 right-3 bg-bg/95 backdrop-blur-sm border border-bdr rounded-lg px-2.5 py-2">
                  <p className="font-heading font-bold text-accent text-sm">44%</p>
                  <p className="text-[9px] text-ink-subtle">of clicks go to #1–3</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* ── RIGHT: Audit panel ── */}
          <div className="lg:sticky lg:top-28">
            <AnimatedSection delay={0.25} direction="right">
              <div className="rounded-2xl border border-bdr bg-bg overflow-hidden">

                {/* Panel header */}
                <div className="px-5 py-4 border-b border-bdr" style={{ background: 'rgba(13,31,24,0.02)' }}>
                  <p className="font-heading font-bold text-base text-ink mb-0.5">Run your free ranking audit</p>
                  <p className="text-xs text-ink-muted">We look up your real Google listing and show you exactly what&rsquo;s holding you back</p>
                </div>

                <div className="p-5">
                  {/* Form — always visible */}
                  <form onSubmit={handleSubmit} className="flex gap-2 mb-5">
                    <label htmlFor="biz-audit-input" className="sr-only">Your business name</label>
                    <input
                      id="biz-audit-input"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder="Your business name…"
                      className="flex-1 text-sm px-4 py-3 rounded-xl border border-bdr bg-bg-surface text-ink placeholder:text-ink-subtle focus:outline-none focus:border-accent/40 transition-colors"
                    />
                    <button type="submit" disabled={!input.trim() || phase === 'scanning'}
                      aria-label="Run ranking audit"
                      className="px-4 py-3 rounded-xl text-xs font-heading font-bold transition-all disabled:opacity-30 hover:opacity-85"
                      style={{ background: '#0D1F18', color: '#64EDBB' }}>
                      Audit
                    </button>
                  </form>

                  {/* State panels */}
                  <AnimatePresence mode="wait">
                    {phase === 'idle' && (
                      <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="rounded-xl border border-bdr p-4 space-y-3">
                          <p className="text-xs font-heading font-semibold text-ink-muted uppercase tracking-wider mb-2">What we check</p>
                          {['Google review count & rating', 'Profile completeness', 'Photo & post frequency', 'Map Pack position estimate', 'Response time signals'].map((item, i) => (
                            <div key={i} className="flex items-center gap-2.5">
                              <div className="w-4 h-4 rounded-full border border-bdr flex items-center justify-center shrink-0">
                                <span className="text-bdr-bright" style={{ fontSize: 8 }}>?</span>
                              </div>
                              <p className="text-xs text-ink-muted">{item}</p>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-ink-subtle text-center mt-3">
                          Real Google data · Takes about 3 seconds
                        </p>
                      </motion.div>
                    )}

                    {phase === 'scanning' && (
                      <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <ScanPanel />
                      </motion.div>
                    )}

                    {phase === 'found' && result && (
                      <motion.div key="found" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <AuditResult data={result} />
                      </motion.div>
                    )}

                    {phase === 'notfound' && (
                      <motion.div key="notfound" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <NotFoundPanel name={query} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </AnimatedSection>
          </div>

        </div>
      </div>
    </section>
  )
}
