'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const faqs = [
  {
    q: 'Does the AI sound robotic? Will customers know?',
    a: "No. Our AI sounds like a professional receptionist — calm, clear, natural. It introduces itself using your business name. Most customers have no idea they're not talking to a person. And frankly, most don't care as long as they get helped immediately.",
  },
  {
    q: "What happens if there's a real emergency?",
    a: 'Urgent calls — burst pipes, electrical hazards, gas leaks — get flagged and transferred directly to your cell in real time. The AI doesn\'t sit on it. You hear about it within seconds.',
  },
  {
    q: 'Do I need to set anything up?',
    a: "No. We handle the entire setup. You give us access to your Google Business Profile and tell us how you want calls handled. We take it from there. Most clients are live within 48 hours.",
  },
  {
    q: 'What happens after the free trial?',
    a: "$497/month, month-to-month. No long-term contracts. No cancellation fees. If it's not working, you cancel and that's that. We're confident enough in the system that we don't need to lock you in.",
  },
  {
    q: 'I already have a Google Business Profile. Does that matter?',
    a: "Great — that's a head start. We optimize what you have: adding posts, uploading job photos, responding to reviews, and building citations to improve your local ranking. If you don't have a profile yet, we set one up for you.",
  },
  {
    q: 'What trades does this work for?',
    a: "Plumbing, electrical, roofing, HVAC, pest control, landscaping, general contracting, painting — any home service business that gets jobs from phone calls and Google searches. If you're running a phone-dependent business, this is built for you.",
  },
  {
    q: 'What if I use a different scheduling tool?',
    a: "We integrate with the most common tools — Google Calendar, Jobber, Housecall Pro, ServiceTitan, and others. If you use something specific, let us know and we'll figure it out.",
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b last:border-0" style={{ borderColor: 'rgba(244,240,232,0.1)' }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group">
        <span className="text-sm sm:text-base font-medium transition-colors duration-200"
          style={{ color: open ? '#64EDBB' : 'rgba(244,240,232,0.85)' }}>
          {q}
        </span>
        <span className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            border: `1px solid ${open ? 'rgba(100,237,187,0.4)' : 'rgba(244,240,232,0.15)'}`,
            color: open ? '#64EDBB' : 'rgba(244,240,232,0.4)',
          }}>
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden">
            <p className="text-sm leading-relaxed pb-5 max-w-2xl"
              style={{ color: 'rgba(244,240,232,0.55)' }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="relative pt-24 lg:pt-32 overflow-hidden"
      style={{ background: '#0D1F18' }}>
      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 0%, rgba(100,237,187,0.05), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr] gap-8 lg:gap-20">

          {/* Left */}
          <div>
            <AnimatedSection>
              <p className="text-xs font-heading font-medium uppercase tracking-[0.2em] mb-4"
                style={{ color: 'rgba(100,237,187,0.6)' }}>FAQ</p>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <h2 className="font-heading font-bold text-4xl sm:text-5xl tracking-tighter leading-tight mb-6"
                style={{ color: '#F4F0E8' }}>
                Questions<br />you have.
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={0.15}>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(244,240,232,0.5)' }}>
                Still unsure? Reach out — we&rsquo;re happy to walk you through how this works for your specific business.
              </p>
              <a href="https://calendly.com/d/cx85-p96-f7t/bokt-home-introduction" target="_blank" rel="noopener noreferrer"
                className="text-sm underline underline-offset-4 transition-colors"
                style={{ color: '#64EDBB' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                hello@bokt.co
              </a>
            </AnimatedSection>
          </div>

          {/* Right */}
          <AnimatedSection delay={0.2}>
            <div className="border-t" style={{ borderColor: 'rgba(244,240,232,0.1)' }}>
              {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
