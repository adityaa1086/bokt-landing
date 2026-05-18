'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import AnimatedSection from './AnimatedSection'

const results = [
  {
    industry: 'Solar Installation',
    keyword: 'solar panel sales',
    timeframe: '1 month later',
    stat: '7,320%',
    statLabel: 'visibility improvement',
    detail: 'Went from invisible to top 3 rankings across Google Maps and AI search platforms.',
    revenue: '$320,000 in estimated revenue from 24 new leads',
    image: '/results-solar.png',
  },
  {
    industry: 'French Restaurant',
    keyword: 'french restaurant',
    timeframe: '3 months later',
    stat: '862%',
    statLabel: 'improvement after 30 days',
    detail: 'Now ranking top 3 for competitive local keywords across the entire service area.',
    revenue: '$74,000 in estimated revenue from 8 lead actions',
    image: '/results-restaurant.png',
  },
  {
    industry: 'Law Firm',
    keyword: 'debt attorney',
    timeframe: '3 months later',
    stat: '2,674%',
    statLabel: 'improvement in 60 days',
    detail: 'Top 3 rankings for "debt attorney," "debt relief," and related terms across the region.',
    revenue: '$415,200 in estimated revenue from 132 lead actions',
    image: '/results-law.png',
  },
]

export default function LocalMapSection() {
  const [active, setActive] = useState(0)
  const current = results[active]

  return (
    <section id="results" className="relative py-24 lg:py-36 overflow-hidden"
      style={{ background: '#F4F0E8' }}>

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(13,31,24,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12 lg:mb-16">
          <AnimatedSection>
            <p className="text-xs font-heading font-medium text-accent uppercase tracking-[0.2em] mb-5">
              Real Results
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <h2 className="font-heading font-bold tracking-tighter text-ink leading-[0.93] mb-5"
              style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)' }}>
              Before &amp; after.
              <br /><span className="text-ink-muted">The numbers speak.</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.14}>
            <p className="text-base text-ink-muted leading-relaxed max-w-lg">
              These are real Google Maps heat maps from real clients — showing where they ranked before and after working with us.
              Left side is before. Right side is after.
            </p>
          </AnimatedSection>
        </div>

        {/* Tab switcher */}
        <AnimatedSection delay={0.18}>
          <div className="flex gap-2 mb-8 flex-wrap">
            {results.map((r, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="px-4 py-2 rounded-xl text-sm font-heading font-semibold transition-all duration-200"
                style={{
                  background: active === i ? '#0D1F18' : 'rgba(13,31,24,0.06)',
                  color: active === i ? '#64EDBB' : '#5A7A6A',
                  border: `1px solid ${active === i ? '#0D1F18' : 'rgba(13,31,24,0.12)'}`,
                }}>
                {r.industry}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-start">

            {/* Heat map image */}
            <div className="rounded-2xl overflow-hidden border border-bdr"
              style={{ boxShadow: '0 8px 48px rgba(13,31,24,0.12)' }}>
              <img
                src={current.image}
                alt={`${current.industry} Google Maps ranking before and after`}
                className="w-full h-auto block"
              />
              {/* Labels row */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-bdr"
                style={{ background: '#FAFAF8' }}>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-heading font-semibold"
                  style={{ background: 'rgba(13,31,24,0.06)', color: '#5A7A6A' }}>
                  {current.keyword}
                </span>
                <span className="text-sm font-heading font-bold text-ink">{current.timeframe}</span>
              </div>
            </div>

            {/* Stats & copy */}
            <div className="flex flex-col gap-6 lg:pt-4">

              {/* Big stat */}
              <div className="rounded-2xl p-6"
                style={{ background: '#0D1F18' }}>
                <p className="text-xs font-heading font-medium uppercase tracking-[0.2em] mb-3"
                  style={{ color: 'rgba(100,237,187,0.6)' }}>
                  {current.industry}
                </p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-heading font-bold tracking-tighter"
                    style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', color: '#64EDBB' }}>
                    {current.stat}
                  </span>
                </div>
                <p className="text-sm mb-4" style={{ color: 'rgba(244,240,232,0.6)' }}>
                  {current.statLabel}
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'rgba(244,240,232,0.8)' }}>
                  {current.detail}
                </p>
              </div>

              {/* Revenue estimate */}
              <div className="rounded-xl px-5 py-4 border border-accent/20"
                style={{ background: 'rgba(13,92,58,0.05)' }}>
                <p className="text-xs font-heading font-medium uppercase tracking-wider text-accent mb-1">
                  Business impact
                </p>
                <p className="text-sm font-medium text-ink">{current.revenue}</p>
              </div>

              {/* Legend */}
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#8B0000' }} />
                  <span className="text-xs text-ink-muted">Before — high competition, not ranking</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
                  <span className="text-xs text-ink-muted">After — top 3 rankings</span>
                </div>
              </div>

              {/* Summary stats row */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '30–90', label: 'days to results' },
                  { value: '5+', label: 'industries served' },
                  { value: '100%', label: 'satisfaction rate' },
                ].map((s, i) => (
                  <div key={i} className="rounded-xl p-4 border border-bdr text-center"
                    style={{ background: '#FAFAF8' }}>
                    <p className="font-heading font-bold text-xl text-ink tracking-tight">{s.value}</p>
                    <p className="text-[11px] text-ink-muted mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
