'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, PhoneForwarded, CalendarCheck, CreditCard, Star, Send } from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'

// ── LAYOUT viewBox 560 × 340 ──────────────────────────────────────────
// Google source : x=0,   y=135, w=138, h=70  → right cx=(138,170)
// Hub           : x=188, y=135, w=184, h=70  → left cx=(188,170) right cx=(372,170)
// Outputs       : x=416, w=140, h=54, y=[10,78,146,214,282]
const HCY = 170
const PATHS = {
  gh:  `M 138,${HCY} L 188,${HCY}`,
  o0:  `M 372,${HCY} C 393,${HCY} 394,37  416,37`,
  o1:  `M 372,${HCY} C 393,${HCY} 394,105 416,105`,
  o2:  `M 372,${HCY} C 393,${HCY} 394,173 416,173`,
  o3:  `M 372,${HCY} C 393,${HCY} 394,241 416,241`,
  o4:  `M 372,${HCY} C 393,${HCY} 394,309 416,309`,
}
const OUT_Y = [10, 78, 146, 214, 282]

const OUTPUTS = [
  { id:'book',    label:'Job booked',     Icon:CalendarCheck,  c:'#2563EB', bg:'#EFF6FF', br:'#BFDBFE' },
  { id:'forward', label:'Call forwarded', Icon:PhoneForwarded, c:'#D97706', bg:'#FFFBEB', br:'#FDE68A' },
  { id:'pay',     label:'Payment sent',   Icon:CreditCard,     c:'#7C3AED', bg:'#F5F3FF', br:'#DDD6FE' },
  { id:'review',  label:'Review asked',   Icon:Star,           c:'#D97706', bg:'#FFFBEB', br:'#FDE68A' },
  { id:'maps',    label:'Maps updated',   Icon:MapPin,         c:'#0D5C3A', bg:'#F0FDF4', br:'#BBF7D0' },
]
const PATHS_ARR = [PATHS.o0, PATHS.o1, PATHS.o2, PATHS.o3, PATHS.o4]

const BOOK_FLOW    = new Set(['book','pay','review','maps'])
const FORWARD_FLOW = new Set(['forward','pay','review','maps'])

const PRESETS = [
  { id:0, chip:'Burst pipe',   label:'Mike T.  ·  Emergency',      flow:FORWARD_FLOW },
  { id:1, chip:'Roof quote',   label:'Sarah K.  ·  Booking',       flow:BOOK_FLOW    },
  { id:2, chip:'Power out',    label:'Jennifer W.  ·  Emergency',   flow:FORWARD_FLOW },
  { id:3, chip:'Leaky faucet', label:'Carlos M.  ·  Booking',      flow:BOOK_FLOW    },
]

function analyze(text: string) {
  return /burst|flood|burn|fire|emergency|now|no power|gas/.test(text.toLowerCase())
    ? FORWARD_FLOW : BOOK_FLOW
}

function Particle({ path, delay, dur }: { path: string; delay: number; dur: number }) {
  return (
    <motion.circle r={3.5} fill="#64EDBB"
      style={{ offsetPath: `path('${path}')`, filter:'drop-shadow(0 0 4px #64EDBB)' } as React.CSSProperties}
      initial={{ offsetDistance:'0%', opacity:0 }}
      animate={{ offsetDistance:['0%','100%'], opacity:[0,1,1,0] }}
      transition={{ duration:dur, delay, repeat:Infinity, repeatDelay:dur*0.9, ease:'easeInOut', times:[0,0.1,0.85,1] }}
    />
  )
}

const DIAGRAM_W = 560
const DIAGRAM_H = 346

export default function TriageDemo({ maxScale = 1 }: { maxScale?: number }) {
  const [active, setActive]     = useState(PRESETS[1])
  const [flow, setFlow]         = useState<Set<string>>(BOOK_FLOW)
  const [input, setInput]       = useState('')
  const [userTook, setUserTook] = useState(false)  // once user interacts, stop auto
  const [scale, setScale]       = useState(1)
  const wrapRef  = useRef<HTMLDivElement>(null)
  const autoRef  = useRef<ReturnType<typeof setInterval>|null>(null)

  const updateScale = useCallback(() => {
    if (wrapRef.current) setScale(Math.min(maxScale, wrapRef.current.offsetWidth / DIAGRAM_W))
  }, [maxScale])

  useEffect(() => {
    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [updateScale])

  function run(p: typeof PRESETS[0], f: Set<string>) {
    setActive(p); setFlow(f)
  }

  useEffect(() => {
    if (userTook) return
    let i = 1
    autoRef.current = setInterval(() => {
      i = (i + 1) % PRESETS.length
      setActive(PRESETS[i])
      setFlow(PRESETS[i].flow)
    }, 4000)
    return () => { if (autoRef.current) clearInterval(autoRef.current) }
  }, [userTook])

  function pick(p: typeof PRESETS[0]) {
    setUserTook(true)
    if (autoRef.current) clearInterval(autoRef.current)
    run(p, p.flow)
  }

  function submit() {
    const t = input.trim(); if (!t) return
    setUserTook(true)
    if (autoRef.current) clearInterval(autoRef.current)
    const f = analyze(t)
    const pseudo = { id:99, chip:'Custom', label:`Caller  ·  ${f === FORWARD_FLOW ? 'Emergency' : 'Booking'}`, flow:f }
    setInput('')
    run(pseudo, f)
  }

  return (
    <div ref={wrapRef} className="relative w-full" style={{ userSelect:'none' }}>

      {/* ── DIAGRAM ── */}
      <div className="relative overflow-hidden" style={{ height: DIAGRAM_H * scale }}>
        <div style={{ position:'absolute', top:0, left:0, width:DIAGRAM_W, height:DIAGRAM_H, transform:`scale(${scale})`, transformOrigin:'top left' }}>

          <svg viewBox={`0 0 ${DIAGRAM_W} ${DIAGRAM_H}`} style={{ position:'absolute', inset:0, width:'100%', height:'100%', overflow:'visible' }}>
            {/* Connection lines */}
            <path d={PATHS.gh} stroke="#C8C0B0" strokeWidth="1.5" fill="none" strokeDasharray="5 3"/>
            {OUTPUTS.map((out,i) => (
              <path key={out.id} d={PATHS_ARR[i]} fill="none" strokeWidth="1.5" strokeDasharray="5 3"
                stroke={flow.has(out.id) ? out.br : '#E8E2D8'}
                style={{ transition:'stroke 0.4s' }}/>
            ))}
            {/* Particles */}
            <Particle path={PATHS.gh} delay={0}   dur={0.85}/>
            <Particle path={PATHS.gh} delay={0.45} dur={0.85}/>
            {OUTPUTS.map((out,i) => flow.has(out.id) && (
              <g key={out.id}>
                <Particle path={PATHS_ARR[i]} delay={0.3 + i*0.22}      dur={1.25}/>
                <Particle path={PATHS_ARR[i]} delay={0.3 + i*0.22+0.65} dur={1.25}/>
              </g>
            ))}
          </svg>

          {/* ── GOOGLE SOURCE NODE ── */}
          <div style={{ position:'absolute', left:0, top:135, width:138, height:70,
            background:'#FFFFFF', border:'1px solid #DED8CC', borderRadius:14,
            padding:'11px 13px', boxShadow:'0 4px 20px rgba(13,31,24,0.07)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:5 }}>
              <div style={{ width:26, height:26, borderRadius:7, background:'#F0FDF4', border:'1px solid #BBF7D0', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <MapPin size={12} color="#0D5C3A"/>
              </div>
              <span style={{ fontSize:11, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'#0D1F18' }}>Google Maps</span>
            </div>
            <p style={{ fontSize:10, color:'#0D5C3A', fontWeight:600, paddingLeft:34 }}>you rank #1 → calls</p>
          </div>

          {/* ── HUB NODE ── */}
          <motion.div
            animate={{ boxShadow:['0 0 0 0 rgba(100,237,187,0)','0 0 0 10px rgba(100,237,187,0.1)','0 0 0 0 rgba(100,237,187,0)'] }}
            transition={{ duration:2.8, repeat:Infinity }}
            style={{ position:'absolute', left:188, top:135, width:184, height:70,
              background:'#0D1F18', borderRadius:16, padding:'13px 16px',
              display:'flex', alignItems:'center', gap:10,
              boxShadow:'0 8px 32px rgba(13,31,24,0.2)' }}>
            <BrickMarkSVG size={20}/>
            <div>
              <p style={{ fontSize:13, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'#FFFFFF', lineHeight:1, marginBottom:4 }}>BOKT</p>
              <AnimatePresence mode="wait">
                <motion.p key={active.label}
                  initial={{ opacity:0, y:3 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-3 }}
                  style={{ fontSize:10, color:'#64EDBB', fontWeight:500 }}>
                  {active.label}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── OUTPUT NODES ── */}
          {OUTPUTS.map((out,i) => {
            const on = flow.has(out.id)
            return (
              <motion.div key={out.id}
                animate={{ opacity:on ? 1 : 0.28 }}
                transition={{ duration:0.35 }}
                style={{ position:'absolute', left:416, top:OUT_Y[i], width:140, height:54,
                  background: on ? out.bg : '#F9F7F3',
                  border:`1px solid ${on ? out.br : '#EDE8DF'}`,
                  borderRadius:12, padding:'9px 12px',
                  boxShadow: on ? '0 2px 12px rgba(0,0,0,0.06)' : 'none',
                  display:'flex', alignItems:'center', gap:8,
                  transition:'border-color 0.35s, background 0.35s' }}>
                <div style={{ width:24, height:24, borderRadius:7, flexShrink:0,
                  background: on ? out.bg : '#EDE8DF',
                  border:`1px solid ${on ? out.br : '#DED8CC'}`,
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <out.Icon size={12} color={on ? out.c : '#8AADA0'}/>
                </div>
                <span style={{ fontSize:11, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700,
                  color: on ? '#0D1F18' : '#8AADA0', lineHeight:1.2 }}>{out.label}</span>
              </motion.div>
            )
          })}

          {/* ── STAT BADGES ── */}
          <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
            style={{ position:'absolute', left:0, top:60, background:'#FFFFFF',
              border:'1px solid #DED8CC', borderRadius:10, padding:'6px 10px',
              boxShadow:'0 2px 12px rgba(0,0,0,0.05)' }}>
            <p style={{ fontSize:10, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'#0D5C3A' }}>+44% more calls</p>
            <p style={{ fontSize:9, color:'#8AADA0' }}>from Map Pack #1</p>
          </motion.div>

          <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}
            style={{ position:'absolute', left:188, top:60, background:'#0D1F18',
              borderRadius:10, padding:'6px 10px' }}>
            <p style={{ fontSize:10, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'#64EDBB' }}>avg 1.8s response</p>
            <p style={{ fontSize:9, color:'rgba(100,237,187,0.5)' }}>every call, 24/7</p>
          </motion.div>

          <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9 }}
            style={{ position:'absolute', left:416, top:270, background:'#F5F3FF',
              border:'1px solid #DDD6FE', borderRadius:10, padding:'6px 10px',
              boxShadow:'0 2px 8px rgba(124,58,237,0.08)' }}>
            <p style={{ fontSize:10, fontFamily:"'Space Grotesk',sans-serif", fontWeight:700, color:'#7C3AED' }}>3% fee saved</p>
            <p style={{ fontSize:9, color:'#8AADA0' }}>passed to customer</p>
          </motion.div>
        </div>
      </div>

      {/* ── INPUT BAR ── */}
      <div className="mt-5">
        <div className="flex gap-2 mb-2.5">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && submit()}
            placeholder="Describe a call scenario..."
            className="flex-1 text-sm px-4 py-3 rounded-xl border text-ink placeholder:text-ink-subtle focus:outline-none transition-colors"
            style={{ background:'rgba(255,255,255,0.85)', borderColor:'#DED8CC' }}
          />
          <button onClick={submit} disabled={!input.trim()}
            className="w-11 h-11 rounded-xl bg-ink flex items-center justify-center flex-shrink-0 transition-opacity disabled:opacity-30">
            <Send size={14} style={{ color:'#64EDBB' }}/>
          </button>
        </div>
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[10px] text-ink-subtle mr-0.5">try:</span>
          {PRESETS.map(p => (
            <button key={p.id} onClick={() => pick(p)}
              className="text-[11px] px-3 py-1 rounded-full font-medium transition-all duration-200"
              style={{
                background: active.id === p.id ? '#0D1F18' : 'rgba(255,255,255,0.8)',
                color:      active.id === p.id ? '#64EDBB' : '#5A7A6A',
                border:     `1px solid ${active.id === p.id ? '#0D1F18' : '#DED8CC'}`,
              }}>
              {p.chip}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function BrickMarkSVG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size*0.77} viewBox="0 0 38 30" fill="none" style={{ flexShrink:0 }}>
      <rect x="1" y="1"    width="16" height="7" rx="2" stroke="#64EDBB" strokeWidth="2"/>
      <rect x="21" y="1"   width="16" height="7" rx="2" stroke="#64EDBB" strokeWidth="2"/>
      <rect x="1" y="11.5" width="10" height="7" rx="2" stroke="#64EDBB" strokeWidth="2"/>
      <rect x="14" y="11.5" width="11" height="7" rx="2" stroke="#64EDBB" strokeWidth="2"/>
      <rect x="28" y="11.5" width="9"  height="7" rx="2" stroke="#64EDBB" strokeWidth="2"/>
      <rect x="1" y="22"   width="16" height="7" rx="2" stroke="#64EDBB" strokeWidth="2"/>
      <rect x="21" y="22"  width="16" height="7" rx="2" stroke="#64EDBB" strokeWidth="2"/>
    </svg>
  )
}
