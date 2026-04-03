'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

const fade = {
  hidden: { opacity: 0, y: 22 },
  visible: (d: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, delay: d, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#F4F0E8' }}>

      <DotCanvas />

      {/* Subtle green glow top-right */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 55% at 100% 0%, rgba(13,92,58,0.07), transparent)',
          zIndex: 1,
        }} />

      {/* ── Buildings image — absolutely flush to right edge, desktop only ── */}
      <motion.img
        src="/buildings-transparent.png"
        alt=""
        aria-hidden
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 right-0 select-none pointer-events-none hidden lg:block"
        style={{
          width: '44vw',
          maxWidth: 'none',
          filter: 'drop-shadow(0 24px 80px rgba(13,31,24,0.14))',
          zIndex: 1,
        }}
        draggable={false}
      />

      {/* ── Mobile: buildings as faded background ── */}
      <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <img
          src="/buildings-transparent.png"
          alt=""
          aria-hidden
          className="absolute bottom-0 right-0 select-none w-full"
          style={{ opacity: 0.13, transform: 'translateX(15%) scale(1.1)', transformOrigin: 'bottom right' }}
          draggable={false}
        />
        {/* Gradient so text on the left is fully readable */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to right, #F4F0E8 55%, rgba(244,240,232,0.85) 75%, transparent 100%), linear-gradient(to top, transparent 50%, #F4F0E8 85%)',
        }} />
      </div>

      {/* ── Desktop floating badges (positioned relative to viewport right half) ── */}

      {/* Map Pack */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: [0, -5, 0], scale: 1 }}
        transition={{
          opacity: { delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          scale:   { delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          y: { delay: 0.9, duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute hidden lg:flex items-center gap-2 px-3.5 py-2.5 rounded-xl"
        style={{
          right: '38vw', bottom: '28%',
          background: '#0D1F18',
          boxShadow: '0 8px 32px rgba(13,31,24,0.25)',
          zIndex: 3,
        }}>
        <div className="w-6 h-6 rounded-md bg-accent/15 flex items-center justify-center shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#64EDBB"/>
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-heading font-bold text-bg leading-none mb-0.5">#1 Map Pack</p>
          <p className="text-[9px] font-heading text-accent/60 leading-none">+44% more calls</p>
        </div>
      </motion.div>

      {/* Calls answered */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
        transition={{
          opacity: { delay: 1.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          scale:   { delay: 1.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          y: { delay: 1.05, duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl border border-bdr"
        style={{
          right: '8vw', top: '30%',
          background: 'rgba(244,240,232,0.95)', backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(13,31,24,0.08)',
          zIndex: 3,
        }}>
        <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
        <p className="text-[11px] font-heading font-semibold text-ink">47 calls answered today</p>
      </motion.div>

      {/* Stars */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: [0, -4, 0], scale: 1 }}
        transition={{
          opacity: { delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          scale:   { delay: 1.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
          y: { delay: 1.2, duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute hidden lg:block px-3 py-2 rounded-xl border border-bdr"
        style={{
          right: '44vw', top: '20%',
          background: 'rgba(244,240,232,0.95)', backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(13,31,24,0.08)',
          zIndex: 3,
        }}>
        <p className="text-amber-500 text-xs mb-0.5">★★★★★</p>
        <p className="text-[10px] font-heading font-semibold text-ink">4.9 avg · 127 reviews</p>
      </motion.div>

      {/* Job booked */}
      <motion.div
        initial={{ opacity: 0, x: 20, scale: 0.85 }}
        animate={{ opacity: 1, x: 0, y: [0, -5, 0], scale: 1 }}
        transition={{
          opacity: { delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          x:       { delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          scale:   { delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
          y: { delay: 1.4, duration: 4.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl"
        style={{
          right: '12vw', bottom: '30%',
          background: '#0D1F18', boxShadow: '0 4px 20px rgba(13,31,24,0.3)',
          zIndex: 3,
        }}>
        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(100,237,187,0.2)' }}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#64EDBB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="text-[10px] font-heading font-bold leading-none mb-0.5" style={{ color: '#F4F0E8' }}>Job booked</p>
          <p className="text-[9px] font-heading leading-none" style={{ color: 'rgba(100,237,187,0.6)' }}>$380 · Tuesday 9am</p>
        </div>
      </motion.div>

      {/* Payment pulse */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: [0, 1, 1, 0], scale: [0.7, 1, 1, 0.9] }}
        transition={{ delay: 2.2, duration: 2.5, repeat: Infinity, repeatDelay: 5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl border"
        style={{
          right: '30vw', bottom: '38%',
          background: 'rgba(244,240,232,0.95)', borderColor: 'rgba(13,92,58,0.2)',
          boxShadow: '0 4px 20px rgba(13,31,24,0.08)',
          zIndex: 3,
        }}>
        <span className="text-base">💳</span>
        <div>
          <p className="text-[10px] font-heading font-bold text-ink leading-none mb-0.5">Payment received</p>
          <p className="text-[9px]" style={{ color: '#5A7A6A' }}>$420 · Mike&apos;s Plumbing</p>
        </div>
      </motion.div>

      {/* ── Copy ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 sm:pt-28 pb-16 sm:pb-20" style={{ zIndex: 2 }}>
        <div className="max-w-[520px]">

          <motion.p custom={0} variants={fade} initial="hidden" animate="visible"
            className="text-sm font-heading font-medium uppercase tracking-widest mb-6 sm:mb-8"
            style={{ color: '#5A7A6A', letterSpacing: '0.16em' }}>
            For SMBs
          </motion.p>

          <motion.h1 custom={0.1} variants={fade} initial="hidden" animate="visible"
            className="font-heading font-bold tracking-tighter leading-[0.91] mb-6 sm:mb-8"
            style={{ fontSize: 'clamp(2.8rem, 5.8vw, 5.8rem)', color: '#0D1F18' }}>
            Found on Google.
            <br />Calls answered.
            <br /><span className="text-gradient-accent">Jobs paid.</span>
          </motion.h1>

          <motion.p custom={0.2} variants={fade} initial="hidden" animate="visible"
            className="text-base sm:text-lg leading-relaxed mb-8 sm:mb-10"
            style={{ color: '#5A7A6A', maxWidth: 370 }}>
            We rank you #1 on Google Maps, answer every call 24/7, and collect payment — all without lifting a finger.
          </motion.p>

          {/* 2 weeks free badge */}
          <motion.div custom={0.25} variants={fade} initial="hidden" animate="visible"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full mb-5"
            style={{ background: 'rgba(13,92,58,0.08)', border: '1px solid rgba(13,92,58,0.2)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
            <span className="text-sm font-heading font-semibold" style={{ color: '#0D5C3A' }}>
              2 weeks free — no card required
            </span>
          </motion.div>

          <motion.div custom={0.3} variants={fade} initial="hidden" animate="visible"
            className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-5">
            <a href="https://calendly.com/d/cx85-p96-f7t/bokt-home-introduction"
              target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 font-heading font-bold text-sm rounded-xl transition-all duration-200"
              style={{ background: '#0D1F18', color: '#64EDBB' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1A3828'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(13,31,24,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0D1F18'; e.currentTarget.style.boxShadow = 'none' }}>
              Start Free — No Card Needed
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#features"
              className="text-sm font-medium underline underline-offset-4 transition-colors text-center sm:text-left"
              style={{ color: '#8AADA0', textDecorationColor: '#C8C0B0' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#0D1F18')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8AADA0')}>
              See how it works
            </a>
          </motion.div>

          <motion.p custom={0.4} variants={fade} initial="hidden" animate="visible"
            className="text-xs mt-5" style={{ color: '#8AADA0' }}>
            $497/mo after trial&nbsp;&middot;&nbsp;Cancel anytime&nbsp;&middot;&nbsp;Setup in 48 hours
          </motion.p>

        </div>
      </div>
    </section>
  )
}

/* ── Interactive dot canvas ─────────────────────────── */
function DotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const context = ctx
    const dpr = window.devicePixelRatio || 1
    let W = 0, H = 0

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      W = rect.width; H = rect.height
      canvas!.width = W * dpr; canvas!.height = H * dpr
      context.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    const SPACING = 28, BASE_R = 1.4, MAX_R = 5, INFLUENCE = 110
    let t = 0

    function draw() {
      context.clearRect(0, 0, W, H)
      const cols = Math.ceil(W / SPACING) + 1
      const rows = Math.ceil(H / SPACING) + 1
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * SPACING, y = r * SPACING
          const wave = (Math.sin(t * 0.7 + (r + c) * 0.35) + 1) / 2
          const dx = x - mouseRef.current.x, dy = y - mouseRef.current.y
          const prox = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / INFLUENCE)
          const radius = BASE_R + wave * 0.6 + prox * (MAX_R - BASE_R)
          const alpha = 0.06 + wave * 0.04 + prox * 0.22
          context.beginPath()
          context.arc(x, y, radius, 0, Math.PI * 2)
          context.fillStyle = `rgba(13,31,24,${alpha.toFixed(3)})`
          context.fill()
        }
      }
      t += 0.018
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    const onMouse = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('mouseleave', () => { mouseRef.current = { x: -1000, y: -1000 } })

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }} />
}
