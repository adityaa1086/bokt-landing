'use client'

import { ArrowRight } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const BrickLogo = () => (
  <svg width="28" height="22" viewBox="0 0 34 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0"  y="0"  width="15" height="6.5" rx="1.5" fill="#64EDBB" />
    <rect x="17" y="0"  width="17" height="6.5" rx="1.5" fill="#64EDBB" />
    <rect x="0"  y="9"  width="10" height="6.5" rx="1.5" fill="#64EDBB" />
    <rect x="12" y="9"  width="13" height="6.5" rx="1.5" fill="#64EDBB" />
    <rect x="27" y="9"  width="7"  height="6.5" rx="1.5" fill="#64EDBB" />
    <rect x="0"  y="18" width="15" height="6.5" rx="1.5" fill="#64EDBB" />
    <rect x="17" y="18" width="17" height="6.5" rx="1.5" fill="#64EDBB" />
  </svg>
)

export default function Footer() {
  return (
    <footer className="relative" style={{ background: '#0D1F18' }}>
      {/* Mint glow accent */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(100,237,187,0.04), transparent)' }} />

      {/* Final CTA strip — cream/beige background */}
      <div className="relative py-20 lg:py-28 border-b overflow-hidden"
        style={{ background: '#F4F0E8', borderColor: 'rgba(13,31,24,0.08)' }}>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-xs font-heading font-medium uppercase tracking-[0.2em] mb-5"
              style={{ color: '#5A7A6A', letterSpacing: '0.2em' }}>
              Ready?
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <h2 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tighter mb-4 leading-tight"
              style={{ color: '#0D1F18' }}>
              Stop losing jobs
              <br /><span style={{ color: 'rgba(13,31,24,0.35)' }}>to your voicemail.</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <p className="max-w-md mx-auto mb-8" style={{ color: '#5A7A6A' }}>
              2 weeks free. No credit card. No contract. If it doesn&rsquo;t make you money, you owe us nothing.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.25}>
            <a href="https://calendly.com/d/cx85-p96-f7t/bokt-home-introduction" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-8 py-4 font-heading font-bold text-base rounded-xl transition-all duration-200"
              style={{ background: '#0D1F18', color: '#64EDBB' }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1A3828'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(13,31,24,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0D1F18'; e.currentTarget.style.boxShadow = 'none'; }}>
              Start Free Trial
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <p className="text-sm mt-4" style={{ color: '#8AADA0' }}>
              Then $497/mo. Cancel anytime.
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Footer nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <BrickLogo />
              <span className="font-heading font-bold text-lg tracking-tight" style={{ color: '#F4F0E8' }}>BOKT</span>
            </div>
            <p className="text-xs max-w-[220px]" style={{ color: 'rgba(244,240,232,0.35)' }}>
              AI call answering &amp; Google Maps optimization for home service businesses.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {[
              { label: 'Call Triage', href: '#features' },
              { label: 'Google Maps', href: '#local-map' },
              { label: 'Pricing',     href: '#pricing'   },
              { label: 'FAQ',         href: '#faq'       },
              { label: 'Book a Call', href: 'https://calendly.com/d/cx85-p96-f7t/bokt-home-introduction', external: true },
            ].map(link => (
              <a key={link.label} href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-sm transition-colors"
                style={{ color: 'rgba(244,240,232,0.45)' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F4F0E8')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,240,232,0.45)')}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderColor: 'rgba(244,240,232,0.08)' }}>
          <p className="text-xs" style={{ color: 'rgba(244,240,232,0.25)' }}>
            &copy; {new Date().getFullYear()} BOKT. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service'].map(label => (
              <a key={label} href="#" className="text-xs transition-colors"
                style={{ color: 'rgba(244,240,232,0.25)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(244,240,232,0.5)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(244,240,232,0.25)')}>
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
