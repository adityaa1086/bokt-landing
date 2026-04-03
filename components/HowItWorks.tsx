'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { PhoneIncoming, GitBranch, CalendarCheck } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const steps = [
  {
    number: '01',
    icon: PhoneIncoming,
    title: 'Call comes in',
    description:
      'Any time — 6am on a Sunday, 10pm on a Tuesday. BOKT AI picks up on the first ring, in your business name. No voicemail. No hold music.',
    detail: 'Customers never know the difference.',
  },
  {
    number: '02',
    icon: GitBranch,
    title: 'AI triages it',
    description:
      'The AI understands the call. Urgent situation? Transferred to your cell immediately. Booking a job? Straight to your calendar. General question? Handled on the spot.',
    detail: 'You only hear about the things that need you.',
  },
  {
    number: '03',
    icon: CalendarCheck,
    title: 'Jobs show up',
    description:
      'No voicemails to play back. No callbacks to make. Booked appointments appear in your calendar with customer info, job type, and notes. SMS confirmations go out automatically.',
    detail: 'You just show up and do the work.',
  },
]

export default function HowItWorks() {
  const lineRef = useRef(null)
  const lineInView = useInView(lineRef, { once: true, margin: '-20%' })

  return (
    <section id="how-it-works" className="relative py-24 lg:py-32 bg-bg-surface border-y border-bdr">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="max-w-xl mb-16 lg:mb-20">
          <AnimatedSection>
            <p className="text-xs font-heading font-medium text-accent uppercase tracking-[0.2em] mb-4">
              How it works
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl tracking-tighter text-ink leading-tight">
              Simple system.
              <br />
              <span className="text-ink-muted">Runs itself.</span>
            </h2>
          </AnimatedSection>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[40px] left-[calc(33.33%_-_16px)] right-[calc(33.33%_-_16px)] h-px bg-bdr overflow-hidden"
          >
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-gradient-to-r from-accent/40 via-accent/60 to-accent/40"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.15} className="relative">
                {/* Step number + icon */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/25 flex items-center justify-center">
                      <step.icon size={18} className="text-accent" />
                    </div>
                    {/* Connector dot */}
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-accent border-2 border-bg-surface" />
                  </div>
                  <span className="font-heading font-bold text-4xl text-bdr-bright tracking-tighter">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-heading font-semibold text-xl text-ink mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-ink-muted leading-relaxed mb-4">
                  {step.description}
                </p>
                <p className="text-sm text-accent font-medium">{step.detail}</p>

                {/* Mobile connector */}
                {i < steps.length - 1 && (
                  <div className="lg:hidden mt-8 flex justify-center">
                    <div className="w-px h-8 bg-gradient-to-b from-accent/40 to-transparent" />
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Image placeholder — triage diagram */}
        <AnimatedSection delay={0.3} className="mt-20">
          <div className="relative border border-bdr rounded-2xl bg-bg-elevated overflow-hidden" style={{ height: '280px' }}>
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="border border-dashed border-bdr-bright rounded-xl px-8 py-6 text-center">
                <p className="text-xs font-heading text-ink-muted uppercase tracking-wider mb-1">
                  Image placeholder
                </p>
                <p className="text-sm text-ink-subtle max-w-sm">
                  Generate with Kling: abstract call-routing tree visualization — glowing nodes, branching paths, dark background with teal accent lines
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
