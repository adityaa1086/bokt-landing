'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const stats = [
  {
    number: 85,
    suffix: '%',
    label: 'of voicemail callers never call back',
    note: 'Gone for good',
  },
  {
    number: 2,
    suffix: ' in 3',
    label: 'calls missed during business hours',
    note: 'Industry average',
  },
  {
    number: 44,
    suffix: '%',
    label: 'of Google clicks go to Map Pack top 3',
    note: "If you're not there, they call someone else",
  },
  {
    number: 83,
    suffix: '%',
    label: 'of homeowners still prefer to call',
    note: "The phone isn't going away",
  },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    const duration = 1400
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, target])

  return <span ref={ref}>{count}{suffix}</span>
}

export default function StatsBanner() {
  return (
    <section className="relative py-16 overflow-hidden" style={{ background: '#0D1F18' }}>
      {/* Subtle mint radial glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(100,237,187,0.05), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10 text-center">
          <p className="text-xs font-heading font-medium uppercase tracking-[0.2em]"
            style={{ color: 'rgba(100,237,187,0.5)' }}>
            The numbers don&rsquo;t lie
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: 'rgba(244,240,232,0.06)' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ background: '#0D1F18' }}>
              <AnimatedSection delay={i * 0.08} className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
                <p className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tighter mb-2"
                  style={{ color: '#64EDBB' }}>
                  <Counter target={stat.number} suffix={stat.suffix} />
                </p>
                <p className="text-xs sm:text-sm leading-snug mb-1 sm:mb-2" style={{ color: 'rgba(244,240,232,0.6)' }}>
                  {stat.label}
                </p>
                <p className="text-[10px] sm:text-xs" style={{ color: 'rgba(244,240,232,0.3)' }}>{stat.note}</p>
              </AnimatedSection>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
