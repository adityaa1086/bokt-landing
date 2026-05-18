'use client'

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedSection from './AnimatedSection'

const faqs = [
  {
    q: 'How quickly will I see results?',
    a: "Most clients see measurable ranking movement within 30 days. Significant improvement — top 3 positions across your service area — typically happens within 90 days. If you don't see measurable improvement in 3 months, we keep working at no additional cost. That's our guarantee.",
  },
  {
    q: 'What types of businesses do you work with?',
    a: "Any local business with a physical location or service area: restaurants, medical and dental clinics, law firms, contractors, salons, med spas, retail shops, and more. If customers search for you online, we can help you rank.",
  },
  {
    q: 'What does "full Google Business Profile management" mean?',
    a: "We optimize every section — services, descriptions, attributes, photos — and publish fresh posts weekly. Google rewards active profiles with higher rankings. We treat it like a living asset, not a set-it-and-forget-it page.",
  },
  {
    q: 'How is your content different from generic AI content?',
    a: "Generic AI content is ignored by Google's algorithm and doesn't build trust with customers. Everything we create is specific to your business, your location, your services, and your voice. It'll look like you actually wrote it — because it reads like a human who knows your business did.",
  },
  {
    q: 'What is AI search optimization, exactly?',
    a: "When someone asks ChatGPT, Gemini, or Perplexity for a local recommendation, those platforms pull from structured data, citations, and active online profiles. We build and maintain everything those AI platforms check — so you appear when customers ask AI instead of Google.",
  },
  {
    q: 'Do I need to be involved day-to-day?',
    a: "No. Onboarding takes a few minutes — you give us access and share your preferences. After that, 90%+ of our clients run fully on autopilot. We only reach out when we need something from you to get better results.",
  },
  {
    q: 'Is there a long-term contract?',
    a: "$597/month, month-to-month. No annual contracts, no cancellation fees. If it's not working, you cancel and that's it. We're confident enough in our results that we don't need to lock you in.",
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
