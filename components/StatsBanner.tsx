'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const stats = [
  {
    number: 90,
    suffix: '%',
    label: 'of consumers find local businesses on Google, Maps, or AI search',
    note: 'If you\'re not there, you don\'t exist',
  },
  {
    number: 7320,
    suffix: '%',
    label: 'best visibility improvement for a client — in just 3 months',
    note: 'Solar contractor, Google Maps',
  },
  {
    number: 62,
    suffix: '+',
    label: 'directories we submit your business to — automatically',
    note: 'Google, ChatGPT, and AI platforms check these',
  },
  {
    number: 3,
    suffix: ' mo',
    label: 'average time to see measurable ranking improvement',
    note: 'Guaranteed or we keep working free',
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
