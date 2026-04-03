'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, ArrowRight, Check } from 'lucide-react'
import AnimatedSection from './AnimatedSection'

const MONTHLY_COST = 497

function useCounter(target: number, duration = 600) {
  const [val, setVal] = useState(target)
  useEffect(() => {
    const start = Date.now()
    const from = val
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(from + (target - from) * eased))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target]) // eslint-disable-line
  return val
}

const PRESETS = [
  { label: 'Small',  jobs: 20, avg: 350 },  // saves $210 → 42% offset
  { label: 'Medium', jobs: 50, avg: 380 },  // saves $570 → fully paid + $73 ahead
  { label: 'Busy',   jobs: 85, avg: 480 },  // saves $1,224 → up $727/mo
]

export default function POSSection() {
  const [jobs, setJobs] = useState(30)
  const [avg, setAvg] = useState(380)
  const [preset, setPreset] = useState(1)

  function applyPreset(i: number) {
    setPreset(i)
    setJobs(PRESETS[i].jobs)
    setAvg(PRESETS[i].avg)
  }

  const monthlyRevenue = jobs * avg
  const feesSaved = Math.round(monthlyRevenue * 0.03)
  const effectiveCost = Math.max(0, MONTHLY_COST - feesSaved)
  const offset = Math.min(100, Math.round((feesSaved / MONTHLY_COST) * 100))
  const isPaidFor = feesSaved >= MONTHLY_COST

  const displaySaved = useCounter(feesSaved)
  const displayCost = useCounter(effectiveCost)

  const INCLUDED = [
    'Physical POS terminal — shipped free',
    'Payment software, no monthly fee',
    '3% processing fee passed to customer',
    'Works with all major cards + tap to pay',
    'Job invoicing built in',
  ]

  return (
    <section className="relative py-24 lg:py-32 border-y border-bdr overflow-hidden"
      style={{ background: '#0D1F18' }}>

      {/* Subtle gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(100,237,187,0.06), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section label — prominent badge */}
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{ background: 'rgba(100,237,187,0.15)', border: '1px solid rgba(100,237,187,0.35)' }}>
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ background: '#64EDBB' }} />
            <span className="text-sm font-heading font-bold tracking-wide" style={{ color: '#64EDBB' }}>
              Included free with every plan
            </span>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* ── Left: copy ── */}
          <div>
            <AnimatedSection delay={0.08}>
              <h2 className="font-heading font-bold tracking-tighter leading-[0.93] mb-6"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', color: '#F4F0E8' }}>
                The POS terminal
                <br />that pays your
                <br /><span className="text-accent">monthly bill.</span>
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.14}>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(244,240,232,0.6)', maxWidth: 400 }}>
                Every credit card job saves 3% in processing fees — passed directly to your customer. For most busy trades, that offsets the entire cost of BOKT.
              </p>
            </AnimatedSection>

            {/* What's included */}
            <AnimatedSection delay={0.18}>
              <div className="space-y-3 mb-8">
                {INCLUDED.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.2 + i * 0.07, duration: 0.45 }}
                    className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-accent/15 border border-accent/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={10} className="text-accent" />
                    </div>
                    <p className="text-sm" style={{ color: 'rgba(244,240,232,0.75)' }}>{item}</p>
                  </motion.div>
                ))}
              </div>
            </AnimatedSection>

            {/* Terminal visual */}
            <AnimatedSection delay={0.35}>
              <div className="inline-flex items-center gap-4 px-5 py-4 rounded-2xl border"
                style={{ background: 'rgba(100,237,187,0.06)', borderColor: 'rgba(100,237,187,0.2)' }}>
                <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <CreditCard size={18} className="text-accent" />
                </div>
                <div>
                  <p className="font-heading font-bold text-sm" style={{ color: '#F4F0E8' }}>Free POS terminal</p>
                  <p className="text-xs" style={{ color: 'rgba(100,237,187,0.6)' }}>Shipped to your door · No contract</p>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* ── Right: Calculator ── */}
          <AnimatedSection delay={0.2} direction="right">
            <div className="rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(100,237,187,0.15)', background: 'rgba(244,240,232,0.04)', backdropFilter: 'blur(8px)' }}>

              {/* Header */}
              <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(100,237,187,0.12)', background: 'rgba(100,237,187,0.04)' }}>
                <p className="font-heading font-bold text-sm" style={{ color: '#F4F0E8' }}>Savings calculator</p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(244,240,232,0.45)' }}>See what the POS terminal saves your business</p>
              </div>

              <div className="p-6 space-y-6">

                {/* Preset buttons */}
                <div>
                  <p className="text-[10px] font-heading font-semibold uppercase tracking-wider mb-3"
                    style={{ color: 'rgba(244,240,232,0.4)' }}>Business size</p>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESETS.map((p, i) => (
                      <button key={i} onClick={() => applyPreset(i)}
                        className="py-2 rounded-xl text-xs font-heading font-semibold transition-all duration-200"
                        style={{
                          background: preset === i ? '#64EDBB' : 'rgba(244,240,232,0.06)',
                          color: preset === i ? '#0D1F18' : 'rgba(244,240,232,0.6)',
                          border: `1px solid ${preset === i ? '#64EDBB' : 'rgba(244,240,232,0.1)'}`,
                        }}>
                        {p.label}
                        <span className="block text-[9px] font-normal mt-0.5 opacity-70">{p.jobs} jobs/mo</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sliders */}
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs" style={{ color: 'rgba(244,240,232,0.6)' }}>Jobs paid by card / month</p>
                      <p className="font-heading font-bold text-sm text-accent">{jobs}</p>
                    </div>
                    <input type="range" min={5} max={100} value={jobs}
                      onChange={e => { setJobs(+e.target.value); setPreset(-1) }}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                      style={{ background: `linear-gradient(to right, #64EDBB ${(jobs - 5) / 95 * 100}%, rgba(244,240,232,0.15) 0%)` }}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px]" style={{ color: 'rgba(244,240,232,0.3)' }}>5</span>
                      <span className="text-[10px]" style={{ color: 'rgba(244,240,232,0.3)' }}>100</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs" style={{ color: 'rgba(244,240,232,0.6)' }}>Average job value</p>
                      <p className="font-heading font-bold text-sm text-accent">${avg}</p>
                    </div>
                    <input type="range" min={100} max={1500} step={25} value={avg}
                      onChange={e => { setAvg(+e.target.value); setPreset(-1) }}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                      style={{ background: `linear-gradient(to right, #64EDBB ${(avg - 100) / 1400 * 100}%, rgba(244,240,232,0.15) 0%)` }}
                    />
                    <div className="flex justify-between mt-1">
                      <span className="text-[10px]" style={{ color: 'rgba(244,240,232,0.3)' }}>$100</span>
                      <span className="text-[10px]" style={{ color: 'rgba(244,240,232,0.3)' }}>$1,500</span>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="rounded-xl p-5 space-y-4"
                  style={{ background: 'rgba(100,237,187,0.06)', border: '1px solid rgba(100,237,187,0.15)' }}>

                  {/* Offset bar */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs" style={{ color: 'rgba(244,240,232,0.5)' }}>BOKT cost offset by POS savings</p>
                      <p className="text-xs font-heading font-bold text-accent">{offset}%</p>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: 'rgba(244,240,232,0.1)' }}>
                      <motion.div className="h-full rounded-full"
                        animate={{ width: `${offset}%` }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        style={{ background: isPaidFor ? '#64EDBB' : 'linear-gradient(to right, #64EDBB80, #64EDBB)' }} />
                    </div>
                  </div>

                  {/* Numbers */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg p-3" style={{ background: 'rgba(244,240,232,0.05)' }}>
                      <p className="text-[10px] mb-1" style={{ color: 'rgba(244,240,232,0.45)' }}>You save in fees</p>
                      <p className="font-heading font-bold text-xl text-accent">${displaySaved}<span className="text-xs font-normal opacity-60">/mo</span></p>
                    </div>
                    <div className="rounded-lg p-3" style={{ background: isPaidFor ? 'rgba(100,237,187,0.12)' : 'rgba(244,240,232,0.05)', border: isPaidFor ? '1px solid rgba(100,237,187,0.3)' : 'none' }}>
                      <p className="text-[10px] mb-1" style={{ color: 'rgba(244,240,232,0.45)' }}>Effective BOKT cost</p>
                      <AnimatePresence mode="wait">
                        <motion.p key={isPaidFor ? 'free' : 'paid'}
                          initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                          className="font-heading font-bold text-xl"
                          style={{ color: isPaidFor ? '#64EDBB' : '#F4F0E8' }}>
                          {isPaidFor ? 'Paid for' : `$${displayCost}`}
                          {!isPaidFor && <span className="text-xs font-normal opacity-60">/mo</span>}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Verdict */}
                  <AnimatePresence mode="wait">
                    <motion.div key={isPaidFor ? 'free' : 'partial'}
                      initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                      className="rounded-lg px-4 py-3 text-center"
                      style={{
                        background: isPaidFor ? 'rgba(100,237,187,0.15)' : 'rgba(244,240,232,0.05)',
                        border: `1px solid ${isPaidFor ? 'rgba(100,237,187,0.35)' : 'rgba(244,240,232,0.1)'}`,
                      }}>
                      <p className="text-sm font-heading font-bold"
                        style={{ color: isPaidFor ? '#64EDBB' : '#F4F0E8' }}>
                        {isPaidFor
                          ? `Your AI employee costs $0/mo — and you\'re up $${feesSaved - MONTHLY_COST}`
                          : `BOKT costs just $${effectiveCost}/mo after savings`}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: 'rgba(244,240,232,0.45)' }}>
                        {isPaidFor
                          ? 'The POS terminal pays for itself and then some'
                          : `Move ${Math.ceil((MONTHLY_COST - feesSaved) / (avg * 0.03))} more jobs to card payments to fully offset`}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <a href="https://calendly.com/d/cx85-p96-f7t/bokt-home-introduction" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-heading font-bold transition-opacity hover:opacity-85"
                  style={{ background: '#64EDBB', color: '#0D1F18' }}>
                  Get your free terminal
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <style jsx>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #64EDBB;
          border: 2px solid #0D1F18;
          cursor: pointer;
          box-shadow: 0 0 0 3px rgba(100,237,187,0.2);
        }
        input[type='range']::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #64EDBB;
          border: 2px solid #0D1F18;
          cursor: pointer;
        }
      `}</style>
    </section>
  )
}
