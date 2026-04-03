import AnimatedSection from './AnimatedSection'

const scenarios = [
  {
    when: 'You\'re on a roof at 2pm',
    then: 'Your phone rings. You can\'t answer. Customer leaves a voicemail. They call the next plumber on the list. That\'s a $900 job gone.',
  },
  {
    when: 'A homeowner searches "electrician near me"',
    then: 'Your competitor shows up first with 47 reviews. You show up fourth with 6. They don\'t scroll. You don\'t get the call.',
  },
  {
    when: 'A job finishes at 5pm Friday',
    then: 'Happy customer. Zero reviews. No one asked. Meanwhile your competitor auto-texted their last 20 customers. They now have 4 new five-stars.',
  },
]

export default function PainSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Left border accent */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <AnimatedSection>
            <p className="text-xs font-heading font-medium text-accent uppercase tracking-[0.2em] mb-4">
              What&rsquo;s actually happening
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <h2 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tighter text-ink leading-[0.95] mb-6">
              Your competitor is getting
              <br />
              <span className="text-ink-muted">your jobs right now.</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-lg text-ink-muted leading-relaxed max-w-xl">
              It&rsquo;s not that you&rsquo;re worse at the work. It&rsquo;s that you&rsquo;re
              harder to reach and harder to find. Those are two fixable problems.
            </p>
          </AnimatedSection>
        </div>

        {/* Big stat */}
        <AnimatedSection delay={0.3} className="mt-16 mb-16">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full" />
            <div className="relative border border-accent/20 bg-bg-surface rounded-2xl px-8 py-6 inline-flex items-baseline gap-4">
              <span className="font-heading font-bold text-7xl sm:text-8xl lg:text-9xl text-accent tracking-tighter">
                28%
              </span>
              <div>
                <p className="text-lg text-ink font-medium">of your calls</p>
                <p className="text-ink-muted">go unanswered</p>
                <p className="text-xs text-ink-subtle mt-1">Industry average, home services</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-ink-muted max-w-lg">
            <p className="text-base">
              At an average job value of $800, that&rsquo;s{' '}
              <span className="text-ink font-medium">$224 lost per $800 you should be making.</span>
              {' '}Every week.
            </p>
          </div>
        </AnimatedSection>

        {/* Scenario cards */}
        <div className="space-y-px bg-bdr rounded-2xl overflow-hidden">
          {scenarios.map((s, i) => (
            <AnimatedSection key={i} delay={0.1 * i}>
              <div className="bg-bg-surface p-6 lg:p-8 grid sm:grid-cols-[200px_1fr] gap-6 group hover:bg-bg-elevated transition-colors duration-200">
                <div>
                  <p className="text-xs text-accent uppercase tracking-wider font-medium mb-1">
                    When
                  </p>
                  <p className="text-sm font-medium text-ink">{s.when}</p>
                </div>
                <div>
                  <p className="text-xs text-ink-subtle uppercase tracking-wider font-medium mb-1">
                    What happens
                  </p>
                  <p className="text-sm text-ink-muted leading-relaxed">{s.then}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Bridge statement */}
        <AnimatedSection delay={0.4} className="mt-16 max-w-2xl">
          <p className="text-xl sm:text-2xl font-heading font-medium text-ink leading-snug">
            None of this has to happen. BOKT handles the phone and the map so you
            can stay on the job.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
