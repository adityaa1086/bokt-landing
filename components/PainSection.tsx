import AnimatedSection from './AnimatedSection'

const scenarios = [
  {
    when: 'A customer searches "best dentist near me" on Google',
    then: 'Competitors with optimized profiles appear in the Map Pack — with dozens of fresh reviews and updated photos. You\'re buried on page 2. They never scroll that far. The call goes to someone else.',
  },
  {
    when: 'Someone asks ChatGPT to recommend a local service',
    then: 'ChatGPT pulls recommendations from structured data, citations, and active profiles across the web. If you\'re not there, you don\'t exist to AI. Your competitor with 62+ citations gets recommended. You get nothing.',
  },
  {
    when: 'You finish a job with a happy customer',
    then: 'No review request goes out. Three days later, your competitor\'s automation already collected 3 new 5-star reviews from their last jobs. They now have 50 more than you. That gap compounds every single week.',
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
              Your competitors are getting
              <br />
              <span className="text-ink-muted">your customers right now.</span>
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <p className="text-lg text-ink-muted leading-relaxed max-w-xl">
              It&rsquo;s not that you&rsquo;re worse at the work. It&rsquo;s that they&rsquo;re easier to
              find — on Google, on AI, and everywhere online. Those are fixable problems.
            </p>
          </AnimatedSection>
        </div>

        {/* Big stat */}
        <AnimatedSection delay={0.3} className="mt-16 mb-16">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-accent/5 blur-3xl rounded-full" />
            <div className="relative border border-accent/20 bg-bg-surface rounded-2xl px-8 py-6 inline-flex items-baseline gap-4">
              <span className="font-heading font-bold text-7xl sm:text-8xl lg:text-9xl text-accent tracking-tighter">
                90%
              </span>
              <div>
                <p className="text-lg text-ink font-medium">of local customers</p>
                <p className="text-ink-muted">find businesses online before calling</p>
                <p className="text-xs text-ink-subtle mt-1">Google, Maps, ChatGPT, Yelp, and beyond</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-ink-muted max-w-lg">
            <p className="text-base">
              If you&rsquo;re not actively managing your online presence,{' '}
              <span className="text-ink font-medium">those customers are going to whoever shows up first.</span>
              {' '}Every single day.
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
            All of this is fixable. BOKT handles your Google presence, reviews, AI search, and social
            content — so you show up everywhere that matters.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}
