'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

// Outlined brick mark — matches actual BOKT logo style
const BrickMark = ({ color }: { color: string }) => (
  <svg width="30" height="24" viewBox="0 0 38 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1"   width="16" height="7" rx="2" stroke={color} strokeWidth="2"/>
    <rect x="21" y="1"  width="16" height="7" rx="2" stroke={color} strokeWidth="2"/>
    <rect x="1" y="11.5"  width="10" height="7" rx="2" stroke={color} strokeWidth="2"/>
    <rect x="14" y="11.5" width="11" height="7" rx="2" stroke={color} strokeWidth="2"/>
    <rect x="28" y="11.5" width="9"  height="7" rx="2" stroke={color} strokeWidth="2"/>
    <rect x="1" y="22"  width="16" height="7" rx="2" stroke={color} strokeWidth="2"/>
    <rect x="21" y="22" width="16" height="7" rx="2" stroke={color} strokeWidth="2"/>
  </svg>
)

const navLinks = [
  { label: 'Call Triage', href: '#features'  },
  { label: 'Google Maps', href: '#local-map' },
  { label: 'Pricing',     href: '#pricing'   },
  { label: 'FAQ',         href: '#faq'       },
]

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const logoColor  = scrolled ? '#64EDBB' : '#0D1F18'
  const linkColor  = scrolled ? '#8AADA0' : '#5A7A6A'
  const linkHover  = scrolled ? '#F4F0E8' : '#0D1F18'

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background:    scrolled ? 'rgba(13,31,24,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom:  scrolled ? '1px solid rgba(100,237,187,0.1)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 group">
            <BrickMark color={logoColor} />
            <span
              className="font-heading font-black tracking-tight transition-colors duration-300"
              style={{ fontSize: 22, color: logoColor, letterSpacing: '-0.03em' }}>
              BOKT
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(link => (
              <a key={link.href} href={link.href}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: linkColor }}
                onMouseEnter={e => (e.currentTarget.style.color = linkHover)}
                onMouseLeave={e => (e.currentTarget.style.color = linkColor)}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <a href="https://calendly.com/d/cx85-p96-f7t/bokt-home-introduction" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 font-heading font-bold text-sm rounded-xl transition-all duration-200"
              style={{
                background: scrolled ? '#64EDBB' : '#0D1F18',
                color:      scrolled ? '#0D1F18' : '#64EDBB',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1'    }}>
              Start Free — No Card
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: scrolled ? '#8AADA0' : '#3D5C50' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-b border-bdr px-4 py-5 space-y-0.5"
          style={{ background: '#F4F0E8' }}>
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center py-3.5 text-sm font-medium text-ink-muted border-b border-bdr/40 last:border-0 hover:text-ink transition-colors">
              {link.label}
            </a>
          ))}
          <a href="https://calendly.com/d/cx85-p96-f7t/bokt-home-introduction" target="_blank" rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center w-full mt-4 py-3.5 bg-ink text-bg font-heading font-bold text-sm rounded-xl"
            style={{ color: '#64EDBB' }}>
            Start Free Trial — No Card Needed
          </a>
        </div>
      )}
    </header>
  )
}
