'use client'

import { useEffect, useRef, useCallback } from 'react'

/* ─── CONSTANTS ─────────────────────────────────── */
const ACCENT = '#64EDBB'
const AMBER = '#F59E0B'
const PULSE_SPEED = 380
const LOOP_DELAY = 1600
const PULSE_LEN = 44

interface PulseDef {
  fromId: string
  toId: string
  fromSide: 'right' | 'bottom'
  toSide: 'left' | 'top'
  color: string
  delay: number
}

const PULSES: PulseDef[] = [
  { fromId: 'in-incoming', toId: 'center',    fromSide: 'right', toSide: 'left', color: ACCENT, delay: 0 },
  { fromId: 'in-missed',   toId: 'center',    fromSide: 'right', toSide: 'left', color: AMBER,  delay: 340 },
  { fromId: 'in-after',    toId: 'center',    fromSide: 'right', toSide: 'left', color: ACCENT, delay: 680 },
  { fromId: 'center',      toId: 'out-phone', fromSide: 'right', toSide: 'left', color: AMBER,  delay: 1020 },
  { fromId: 'center',      toId: 'out-cal',   fromSide: 'right', toSide: 'left', color: ACCENT, delay: 1220 },
  { fromId: 'center',      toId: 'out-ai',    fromSide: 'right', toSide: 'left', color: ACCENT, delay: 1460 },
]

function getCenter(el: HTMLElement, side: 'right' | 'left' | 'bottom' | 'top', svg: SVGSVGElement) {
  const r = el.getBoundingClientRect()
  const sr = svg.getBoundingClientRect()
  const x = r.left - sr.left
  const y = r.top - sr.top
  if (side === 'right')  return { x: x + r.width, y: y + r.height / 2 }
  if (side === 'left')   return { x, y: y + r.height / 2 }
  if (side === 'bottom') return { x: x + r.width / 2, y: y + r.height }
  return { x: x + r.width / 2, y }
}

function buildSVGPath(from: { x: number; y: number }, to: { x: number; y: number }): string {
  const midX = (from.x + to.x) / 2
  return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`
}

/* ─── BRICK MARK SVG (matches the BOKT logo) ─────── */
const BrickMark = () => (
  <svg width="22" height="18" viewBox="0 0 34 26" fill="#64EDBB" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="15" height="6.5" rx="1.5" />
    <rect x="17" y="0" width="17" height="6.5" rx="1.5" />
    <rect x="0" y="9" width="10" height="6.5" rx="1.5" />
    <rect x="12" y="9" width="13" height="6.5" rx="1.5" />
    <rect x="27" y="9" width="7" height="6.5" rx="1.5" />
    <rect x="0" y="18" width="15" height="6.5" rx="1.5" />
    <rect x="17" y="18" width="17" height="6.5" rx="1.5" />
  </svg>
)

export default function FlowDiagramHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const buildLines = useCallback(() => {
    const svg = svgRef.current
    const container = containerRef.current
    if (!svg || !container) return

    while (svg.firstChild) svg.removeChild(svg.firstChild)
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []

    const ns = 'http://www.w3.org/2000/svg'
    const defs = document.createElementNS(ns, 'defs')
    defs.innerHTML = `
      <filter id="pulse-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.5" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
      <linearGradient id="pg-accent" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0"/>
        <stop offset="100%" stop-color="${ACCENT}" stop-opacity="1"/>
      </linearGradient>
      <linearGradient id="pg-amber" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${AMBER}" stop-opacity="0"/>
        <stop offset="100%" stop-color="${AMBER}" stop-opacity="1"/>
      </linearGradient>
    `
    svg.appendChild(defs)

    PULSES.forEach((p) => {
      const fromEl = container.querySelector<HTMLElement>(`[data-node="${p.fromId}"]`)
      const toEl   = container.querySelector<HTMLElement>(`[data-node="${p.toId}"]`)
      if (!fromEl || !toEl) return

      const from = getCenter(fromEl, p.fromSide, svg)
      const to   = getCenter(toEl,   p.toSide,   svg)
      const d = buildSVGPath(from, to)

      const base = document.createElementNS(ns, 'path')
      base.setAttribute('d', d)
      base.setAttribute('fill', 'none')
      base.setAttribute('stroke', p.color === AMBER ? 'rgba(245,158,11,0.15)' : 'rgba(100,237,187,0.12)')
      base.setAttribute('stroke-width', '1.5')
      base.setAttribute('stroke-dasharray', '4 5')
      svg.appendChild(base)

      const pulse = document.createElementNS(ns, 'path')
      pulse.setAttribute('d', d)
      pulse.setAttribute('fill', 'none')
      pulse.setAttribute('stroke', p.color === AMBER ? 'url(#pg-amber)' : 'url(#pg-accent)')
      pulse.setAttribute('stroke-width', '2')
      pulse.setAttribute('stroke-linecap', 'round')
      pulse.setAttribute('filter', 'url(#pulse-glow)')
      pulse.setAttribute('opacity', '0')
      svg.appendChild(pulse)

      const len = pulse.getTotalLength ? pulse.getTotalLength() : 200
      const startPt = pulse.getPointAtLength ? pulse.getPointAtLength(0) : from
      const endPt   = pulse.getPointAtLength ? pulse.getPointAtLength(len) : to
      const gradId  = p.color === AMBER ? 'pg-amber' : 'pg-accent'
      const grad = svg.querySelector(`#${gradId}`)
      if (grad) {
        grad.setAttribute('x1', String(startPt.x))
        grad.setAttribute('y1', String(startPt.y))
        grad.setAttribute('x2', String(endPt.x))
        grad.setAttribute('y2', String(endPt.y))
      }

      const duration = (len / 100) * (PULSE_SPEED / 1000) * 1000
      const toNode = toEl

      function runPulse() {
        pulse.setAttribute('opacity', '1')
        pulse.style.strokeDasharray = `${PULSE_LEN} ${len + PULSE_LEN}`
        pulse.style.strokeDashoffset = String(PULSE_LEN)

        const anim = pulse.animate(
          [{ strokeDashoffset: PULSE_LEN }, { strokeDashoffset: -(len) }],
          { duration, easing: 'linear', fill: 'forwards' }
        )

        anim.onfinish = () => {
          pulse.setAttribute('opacity', '0')
          toNode.style.setProperty('--node-glow', p.color === AMBER ? 'rgba(245,158,11,0.3)' : 'rgba(100,237,187,0.22)')
          toNode.classList.add('node-active')
          const t = setTimeout(() => {
            toNode.classList.remove('node-active')
            toNode.style.removeProperty('--node-glow')
          }, 450)
          timersRef.current.push(t)
        }
      }

      const t = setTimeout(function loop() {
        runPulse()
        const next = setTimeout(loop, duration + LOOP_DELAY)
        timersRef.current.push(next)
      }, p.delay)
      timersRef.current.push(t)
    })
  }, [])

  useEffect(() => {
    const t = setTimeout(buildLines, 120)
    const ro = new ResizeObserver(() => setTimeout(buildLines, 80))
    if (containerRef.current) ro.observe(containerRef.current)
    return () => {
      clearTimeout(t)
      ro.disconnect()
      timersRef.current.forEach(clearTimeout)
    }
  }, [buildLines])

  return (
    <div ref={containerRef} className="relative w-full select-none" style={{ minHeight: 300 }}>
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* 3-column layout */}
      <div className="relative grid grid-cols-[1fr_auto_1fr] items-center gap-0" style={{ zIndex: 1 }}>

        {/* LEFT: INPUT NODES */}
        <div className="flex flex-col gap-2.5 pr-2">
          <CallNode id="in-incoming" icon="📞" label="Incoming Call"   sub="Any time, day or night" />
          <CallNode id="in-missed"   icon="📱" label="Missed Call"     sub="After you've stepped away" amber />
          <CallNode id="in-after"    icon="🌙" label="After Hours"     sub="Nights, weekends, holidays" />
        </div>

        {/* CENTER: BOKT AI */}
        <div data-node="center" className="flow-node mx-3 lg:mx-5 relative flex flex-col items-center justify-center rounded-2xl px-4 py-5 text-center"
          style={{
            width: 148,
            background: 'rgba(8,20,16,0.98)',
            border: '1px solid rgba(100,237,187,0.3)',
            boxShadow: '0 0 32px rgba(100,237,187,0.08)',
          }}>
          {/* Live indicator */}
          <div className="flex items-center gap-1.5 mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-55" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-[9px] font-heading font-bold text-accent uppercase tracking-[0.18em]">Live</span>
          </div>

          {/* Brick mark */}
          <div className="mb-2.5">
            <BrickMark />
          </div>

          <p className="font-heading font-bold text-sm text-accent leading-tight tracking-wide">BOKT</p>
          <p className="text-[10px] text-ink-muted mt-1 leading-tight">Routing call</p>
        </div>

        {/* RIGHT: OUTPUT NODES */}
        <div className="flex flex-col gap-2.5 pl-2">
          <ResultNode id="out-phone" icon="→" label="Your Phone"  sub="Urgent — live transfer" amber />
          <ResultNode id="out-cal"   icon="📅" label="Calendar"   sub="Auto-booked + confirmed" />
          <ResultNode id="out-ai"    icon="✓"  label="AI Handled" sub="Answered & summarized" dim />
        </div>
      </div>

      {/* Floating stats */}
      <div className="absolute -top-9 inset-x-0 flex justify-center gap-7 pointer-events-none">
        {[
          { val: '< 2s', label: 'Answer time' },
          { val: '24/7', label: 'Coverage' },
          { val: '0', label: 'Voicemails' },
        ].map((s) => (
          <div key={s.val} className="text-center">
            <p className="font-heading font-bold text-base text-accent leading-none">{s.val}</p>
            <p className="text-[9px] text-ink-muted mt-0.5 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      <style>{`
        .flow-node {
          transition: box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .flow-node.node-active {
          box-shadow: 0 0 28px var(--node-glow, rgba(100,237,187,0.25)) !important;
          border-color: rgba(100,237,187,0.5) !important;
        }
      `}</style>
    </div>
  )
}

/* Clean, readable call source node */
function CallNode({ id, icon, label, sub, amber }: {
  id: string; icon: string; label: string; sub: string; amber?: boolean
}) {
  return (
    <div
      data-node={id}
      className="flow-node rounded-xl px-3.5 py-2.5 flex items-center gap-2.5"
      style={{
        background: 'rgba(14,26,22,0.95)',
        border: `1px solid ${amber ? 'rgba(245,158,11,0.2)' : 'rgba(100,237,187,0.12)'}`,
      }}
    >
      <span className="text-sm leading-none">{icon}</span>
      <div>
        <p className="text-[11px] font-heading font-semibold text-ink leading-tight">{label}</p>
        <p className="text-[9px] text-ink-muted leading-tight mt-0.5">{sub}</p>
      </div>
    </div>
  )
}

/* Clean result node */
function ResultNode({ id, icon, label, sub, amber, dim }: {
  id: string; icon: string; label: string; sub: string; amber?: boolean; dim?: boolean
}) {
  const textColor = dim ? 'rgba(100,237,187,0.2)' : amber ? '#F59E0B' : '#C8DDD8'
  return (
    <div
      data-node={id}
      className="flow-node rounded-xl px-3.5 py-2.5 flex items-center gap-2.5"
      style={{
        background: dim ? 'rgba(10,18,15,0.8)' : 'rgba(14,26,22,0.95)',
        border: `1px solid ${amber ? 'rgba(245,158,11,0.2)' : dim ? 'rgba(100,237,187,0.05)' : 'rgba(100,237,187,0.12)'}`,
      }}
    >
      <span className="text-sm leading-none font-heading font-bold" style={{ color: amber ? '#F59E0B' : dim ? 'rgba(100,237,187,0.2)' : ACCENT, opacity: 1 }}>{icon}</span>
      <div>
        <p className="text-[11px] font-heading font-semibold leading-tight" style={{ color: textColor }}>{label}</p>
        <p className="text-[9px] leading-tight mt-0.5" style={{ color: dim ? 'rgba(100,237,187,0.12)' : 'rgba(164,196,188,0.6)' }}>{sub}</p>
      </div>
    </div>
  )
}
