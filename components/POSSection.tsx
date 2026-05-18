'use client'

import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, Users, PhoneCall } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const outcomes = [
  {
    Icon: TrendingUp,
    label: 'Reviews',
    value: '+273%',
    color: '#64EDBB',
    bg: 'rgba(100,237,187,0.1)',
    border: 'rgba(100,237,187,0.2)',
  },
  {
    Icon: PhoneCall,
    label: 'Calls',
    value: '+48%',
    color: '#60a5fa',
    bg: 'rgba(96,165,250,0.1)',
    border: 'rgba(96,165,250,0.2)',
  },
  {
    Icon: Users,
    label: 'Customers',
    value: '+153%',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.2)',
  },
]

export default function POSSection() {
  return (
    <section className="relative py-24 lg:py-32 border-y border-bdr overflow-hidden"
      style={{ background: '#F4F0E8' }}>

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(13,31,24,0.055) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* Left: dashboard image */}
          <AnimatedSection delay={0.1}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-bdr"
                style={{ boxShadow: '0 16px 64px rgba(13,31,24,0.12)' }}>
                <img
                  src="/results-dashboard.png"
                  alt="Google Maps ranking results and review growth dashboard showing Freshy Salon"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </AnimatedSection>

          {/* Right: copy */}
          <div>
            <AnimatedSection>
              <p className="text-xs font-heading font-medium text-accent uppercase tracking-[0.2em] mb-5">
                Multi-Platform Visibility
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.08}>
              <h2 className="font-heading font-bold tracking-tighter leading-[0.93] mb-6"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', color: '#0D1F18' }}>
                Everywhere your
                <br />customers are looking.
                <br /><span style={{ color: 'rgba(13,31,24,0.4)' }}>We put you there.</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.14}>
              <p className="text-base leading-relaxed mb-8"
                style={{ color: '#5A7A6A', maxWidth: 420 }}>
                Google Search, Google Maps, ChatGPT, Gemini, Perplexity, Facebook, Instagram — all algorithms check the same signals. We optimize all of them, so you win everywhere.
              </p>
            </AnimatedSection>

            {/* Outcome stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {outcomes.map((o, i) => (
                <AnimatedSection key={i} delay={0.2 + i * 0.07}>
                  <div className="rounded-2xl p-4 border text-center"
                    style={{ background: o.bg, border: `1px solid ${o.border}` }}>
                    <o.Icon size={18} className="mx-auto mb-2" style={{ color: o.color }} />
                    <p className="font-heading font-bold text-2xl tracking-tight mb-0.5"
                      style={{ color: o.color }}>
                      {o.value}
                    </p>
                    <p className="text-xs text-ink-muted">{o.label}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>

            <AnimatedSection delay={0.3}>
              <div className="space-y-3 mb-8">
                {[
                  'Before & after heat maps for Google Maps rankings',
                  'AI platform visibility reports (ChatGPT, Gemini, Perplexity)',
                  'Monthly performance reports with real lead estimates',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-4 h-4 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center shrink-0 mt-0.5">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                        <path d="M20 6L9 17l-5-5" stroke="#64EDBB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm text-ink-muted">{item}</p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.36}>
              <a href="https://calendly.com/d/cx85-p96-f7t/bokt-home-introduction"
                target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3.5 font-heading font-bold text-sm rounded-xl transition-all duration-200"
                style={{ background: '#0D1F18', color: '#64EDBB' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1A3828' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#0D1F18' }}>
                Get My Visibility Report
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}
