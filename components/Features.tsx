'use client'

import { motion } from 'framer-motion'
import { MapPin, Star, Globe, LayoutGrid, Bot, Code2 } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const services = [
  {
    Icon: MapPin,
    title: 'Google Business Profile',
    description: 'Full optimization with services, descriptions, attributes, weekly posts, and photos. This is where 90%+ of local customers look first.',
    accent: '#64EDBB',
  },
  {
    Icon: Star,
    title: 'Review Management',
    description: 'Automated review requests after every interaction, AI-powered responses, and flagging bad reviews for removal with Google.',
    accent: '#64EDBB',
  },
  {
    Icon: Globe,
    title: 'Citation Building',
    description: 'Your business submitted to 62+ directories that Google and AI platforms check — one-click setup with auto-sync.',
    accent: '#64EDBB',
  },
  {
    Icon: LayoutGrid,
    title: 'Social Media Content',
    description: 'A/B tested AI-native posts across Facebook, Instagram, and LinkedIn. We use real assets or film new ones — nothing generic.',
    accent: '#64EDBB',
  },
  {
    Icon: Bot,
    title: 'AI Search Optimization',
    description: 'Structured to appear when customers ask ChatGPT, Gemini, Perplexity, or any AI platform for a local recommendation.',
    accent: '#64EDBB',
  },
  {
    Icon: Code2,
    title: 'Website Optimization',
    description: 'Schema markup, local SEO recommendations, and content alignment so your site helps — not hurts — your visibility.',
    accent: '#64EDBB',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative py-24 lg:py-36 overflow-hidden border-t border-bdr"
      style={{ background: '#0D1F18' }}>

      {/* Subtle glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(100,237,187,0.06), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 mb-14 lg:mb-20 items-end">
          <div>
            <AnimatedSection>
              <p className="text-xs font-heading font-medium uppercase tracking-[0.2em] mb-5"
                style={{ color: 'rgba(100,237,187,0.6)' }}>
                Our Services
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.08}>
              <h2 className="font-heading font-bold tracking-tighter leading-[0.93]"
                style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)', color: '#F4F0E8' }}>
                Everything you need.
                <br /><span style={{ color: 'rgba(244,240,232,0.35)' }}>One service.</span>
              </h2>
            </AnimatedSection>
          </div>
          <AnimatedSection delay={0.14}>
            <p className="text-base leading-relaxed" style={{ color: 'rgba(244,240,232,0.55)', maxWidth: 440 }}>
              We use proprietary data from managing 10,000+ Google Business Profiles to apply the latest winning strategies to your campaign — automatically.
            </p>
          </AnimatedSection>
        </div>

        {/* Main grid: services left, social mockup right */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">

          {/* Service cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {services.map((svc, i) => (
              <AnimatedSection key={i} delay={0.1 + i * 0.06}>
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="group rounded-2xl p-5 border h-full"
                  style={{
                    background: 'rgba(244,240,232,0.04)',
                    borderColor: 'rgba(244,240,232,0.08)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(100,237,187,0.2)'
                    e.currentTarget.style.background = 'rgba(100,237,187,0.04)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(244,240,232,0.08)'
                    e.currentTarget.style.background = 'rgba(244,240,232,0.04)'
                  }}>
                  <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
                    <svc.Icon size={16} className="text-accent" />
                  </div>
                  <p className="font-heading font-bold text-sm mb-2" style={{ color: '#F4F0E8' }}>
                    {svc.title}
                  </p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(244,240,232,0.5)' }}>
                    {svc.description}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>

          {/* Social mockup image */}
          <AnimatedSection delay={0.2} direction="right">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl overflow-hidden border"
                style={{ borderColor: 'rgba(100,237,187,0.15)', boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }}>
                <img
                  src="/social-mockup.png"
                  alt="AI-powered social media content creation across Facebook and Instagram"
                  className="w-full h-auto block"
                />
              </div>
              <div className="mt-4 px-1">
                <p className="text-xs font-heading font-semibold" style={{ color: 'rgba(100,237,187,0.8)' }}>
                  AI-Native Social Content
                </p>
                <p className="text-xs mt-1" style={{ color: 'rgba(244,240,232,0.4)' }}>
                  We A/B test hooks, formats, and platforms. When something works, we double down with real assets — photos and video of your actual business.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Bottom stats */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px"
          style={{ background: 'rgba(244,240,232,0.06)' }}>
          {[
            { value: '5/5',   label: 'Average client rating'       },
            { value: '13+',   label: 'Clients growing every month' },
            { value: '100%',  label: 'Would recommend'             },
            { value: '48h',   label: 'Campaign launch time'        },
          ].map((s, i) => (
            <div key={i} className="px-6 py-8 text-center" style={{ background: '#0D1F18' }}>
              <p className="font-heading font-bold text-3xl tracking-tighter mb-1"
                style={{ color: '#64EDBB' }}>
                {s.value}
              </p>
              <p className="text-xs" style={{ color: 'rgba(244,240,232,0.45)' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
