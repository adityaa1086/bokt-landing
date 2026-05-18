'use client'

import { Check, ArrowRight } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const included = [
  'Google Business Profile — full optimization + weekly content',
  'Review requesting automation + AI-powered responses',
  'AI-native content, A/B tested on hook, format & platform',
  'Social media posting (Google, Facebook, Instagram)',
  'AI search optimization (ChatGPT, Gemini, Perplexity)',
  'Website optimization recommendations + schema markup',
  '62+ directory citations — auto-setup and synced',
  'Before/after heat map tracking for Google Maps',
  'AI platform visibility reports every month',
]

export default function Pricing() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 bg-bg-surface border-y border-bdr overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <AnimatedSection>
            <p className="text-xs font-heading font-medium text-accent uppercase tracking-[0.2em] mb-4">Pricing</p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl tracking-tighter text-ink mb-4">
              One price. Everything included.
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.15}>
            <p className="text-ink-muted max-w-md mx-auto">
              No hidden fees. No long-term contracts. If you don&rsquo;t see measurable improvement in 3 months, we keep working at no additional cost.
            </p>
          </AnimatedSection>
        </div>

        {/* Two-card layout */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* ── CARD 1: DISCOVERY CALL ── */}
          <AnimatedSection delay={0.2}>
            <div className="h-full border border-bdr rounded-2xl bg-bg p-8 flex flex-col">
              <div className="mb-6">
                <p className="text-xs font-heading font-semibold text-ink-subtle uppercase tracking-widest mb-3">Start here</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-heading font-bold text-6xl text-ink tracking-tighter">Free</span>
                </div>
                <p className="text-sm text-ink-muted">Book a strategy call. We analyze your current visibility and show you exactly where you&rsquo;re losing customers.</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-8">
                {[
                  'Current Google Maps ranking audit',
                  'Review score & competitor comparison',
                  'AI search visibility check',
                  'Custom growth roadmap for your business',
                  'No pitch — just data',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-ink-muted">
                    <Check size={14} className="text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <a href="https://calendly.com/d/cx85-p96-f7t/bokt-home-introduction" target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full px-6 py-4 font-heading font-bold text-sm rounded-xl border-2 border-ink text-ink hover:bg-ink hover:text-bg transition-all duration-200">
                Book a Free Strategy Call
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-center text-xs text-ink-subtle mt-3">No obligation. No credit card.</p>
            </div>
          </AnimatedSection>

          {/* ── CARD 2: FULL PLAN ── */}
          <AnimatedSection delay={0.3}>
            <div className="h-full relative border border-accent/30 rounded-2xl bg-bg overflow-hidden flex flex-col p-8">
              <div className="h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent absolute top-0 left-0 right-0" />

              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 bg-accent/10 border border-accent/20 rounded-full px-3 py-1 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-heading font-semibold text-accent">Complete Local Marketing</span>
                </div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-heading font-bold text-6xl text-ink tracking-tighter">$597</span>
                  <span className="text-ink-muted">/ month</span>
                </div>
                <p className="text-sm text-ink-muted">Per location. Month-to-month. Cancel anytime.</p>
              </div>

              <ul className="space-y-2.5 flex-1 mb-8">
                {included.map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-ink-muted">
                    <Check size={14} className="text-accent shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <a href="https://calendly.com/d/cx85-p96-f7t/bokt-home-introduction" target="_blank" rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 w-full px-6 py-4 bg-ink font-heading font-bold text-sm rounded-xl transition-all duration-200 hover:opacity-85"
                style={{ color:'#64EDBB' }}>
                Get Started Today
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <p className="text-center text-xs text-ink-subtle mt-3">3-month results guarantee included.</p>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection delay={0.4} className="mt-10 text-center">
          <p className="text-sm text-ink-muted max-w-lg mx-auto">
            Works for restaurants, law firms, medical clinics, contractors, salons, retail, and any local business that wants customers to find them first.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
