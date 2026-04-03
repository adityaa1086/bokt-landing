import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — BOKT',
  description: 'How BOKT collects, uses, and protects your information.',
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="font-heading font-bold text-xl text-ink mb-4 tracking-tight">{title}</h2>
    <div className="space-y-3 text-ink-muted leading-relaxed text-sm">{children}</div>
  </section>
)

export default function PrivacyPolicy() {
  return (
    <div style={{ background: '#F4F0E8', minHeight: '100vh' }}>
      {/* Nav bar */}
      <header className="border-b border-bdr px-4 sm:px-8 py-4 flex items-center justify-between"
        style={{ background: '#F4F0E8' }}>
        <Link href="/" className="font-heading font-black text-xl tracking-tight text-ink">BOKT</Link>
        <Link href="/" className="text-sm text-ink-muted hover:text-ink transition-colors">← Back to home</Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
        <div className="mb-12">
          <p className="text-xs font-heading font-medium uppercase tracking-[0.2em] text-accent mb-3">Legal</p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl tracking-tighter text-ink mb-3">Privacy Policy</h1>
          <p className="text-ink-muted text-sm">Last updated: April 3, 2026</p>
        </div>

        <Section title="1. Who We Are">
          <p>BOKT ("we," "us," or "our") provides AI-powered call answering, Google Maps optimization, and payment processing services for home service businesses. Our website is located at <strong>home.getbokt.com</strong>.</p>
          <p>For questions about this policy, contact us at <a href="mailto:hello@bokt.co" className="text-accent underline">hello@bokt.co</a>.</p>
        </Section>

        <Section title="2. Information We Collect">
          <p><strong className="text-ink">Information you provide:</strong> When you sign up or book a call through our website, we may collect your name, email address, phone number, and business information.</p>
          <p><strong className="text-ink">Call and interaction data:</strong> If you are a customer of a business using BOKT's AI answering service, we process the content of your call to route it correctly and take follow-up actions (booking, SMS confirmation, etc.).</p>
          <p><strong className="text-ink">Usage data:</strong> We collect standard web analytics data (pages visited, time on site, referring URL, device type) to improve our service.</p>
          <p><strong className="text-ink">Google Business data:</strong> With your permission, we access your Google Business Profile to optimize your local ranking (posts, photos, review responses).</p>
        </Section>

        <Section title="3. SMS Messaging — Important Disclosure">
          <div className="rounded-xl border-l-4 p-5 text-sm"
            style={{ background: 'rgba(13,92,58,0.05)', borderColor: '#0D5C3A' }}>
            <p className="font-heading font-bold text-ink mb-3">How BOKT uses SMS</p>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Who sends messages:</strong> BOKT, on behalf of the home service business you contacted.</li>
              <li><strong>Message types:</strong> Appointment confirmations, booking reminders, no-show follow-ups, and review requests.</li>
              <li><strong>Frequency:</strong> Message frequency varies. Typically 1–3 messages per service interaction.</li>
              <li><strong>Rates:</strong> Message and data rates may apply.</li>
              <li><strong>To get help:</strong> Reply HELP to any message.</li>
              <li><strong>To opt out:</strong> Reply STOP at any time. You will receive no further messages.</li>
            </ul>
          </div>
          <p className="mt-4"><strong className="text-ink">Consent:</strong> SMS consent is collected at the point of service interaction (when you call a BOKT-powered business). Providing your phone number alone does not constitute consent to receive marketing SMS. Transactional and marketing SMS consent are collected separately.</p>
          <p><strong className="text-ink">Not shared:</strong> Your phone number and SMS consent data are <strong className="text-ink">never sold or shared with third parties</strong> except with SMS delivery providers necessary to transmit messages (e.g., Twilio).</p>
          <p>BOKT's SMS practices comply with the TCPA (Telephone Consumer Protection Act) and the A2P 10DLC carrier requirements.</p>
        </Section>

        <Section title="4. How We Use Your Information">
          <ul className="space-y-2 list-disc list-inside">
            <li>To deliver the services you or your business signed up for</li>
            <li>To route calls, book appointments, and send confirmations</li>
            <li>To optimize your Google Business Profile ranking</li>
            <li>To process payments through our POS system</li>
            <li>To communicate with you about your account</li>
            <li>To improve our AI models and service quality</li>
            <li>To comply with legal obligations</li>
          </ul>
          <p>We do <strong className="text-ink">not</strong> sell your personal data. Ever.</p>
        </Section>

        <Section title="5. Data Retention">
          <p>We retain call recordings and transcripts for up to 90 days for quality assurance, then delete them unless you request otherwise. Account data is retained for the life of your subscription plus 12 months after cancellation.</p>
        </Section>

        <Section title="6. Third-Party Services">
          <p>We use trusted third-party providers to operate our service:</p>
          <ul className="space-y-1 list-disc list-inside mt-2">
            <li><strong className="text-ink">Twilio</strong> — SMS delivery and phone call routing</li>
            <li><strong className="text-ink">Google</strong> — Maps API, Google Business Profile management</li>
            <li><strong className="text-ink">Stripe / Square</strong> — Payment processing (POS terminal)</li>
            <li><strong className="text-ink">Vercel</strong> — Website hosting</li>
            <li><strong className="text-ink">Google Analytics</strong> — Website traffic analytics</li>
          </ul>
          <p className="mt-3">Each provider operates under their own privacy policy and is contractually required to protect your data.</p>
        </Section>

        <Section title="7. Your Rights">
          <p>Depending on your location, you may have the right to:</p>
          <ul className="space-y-1 list-disc list-inside mt-2">
            <li>Access the personal data we hold about you</li>
            <li>Request correction or deletion of your data</li>
            <li>Opt out of SMS communications (reply STOP)</li>
            <li>Opt out of marketing emails (unsubscribe link in emails)</li>
            <li>Lodge a complaint with your local data protection authority</li>
          </ul>
          <p className="mt-3">To exercise any of these rights, email <a href="mailto:hello@bokt.co" className="text-accent underline">hello@bokt.co</a>.</p>
        </Section>

        <Section title="8. Cookies">
          <p>We use cookies for analytics (Google Analytics) and to keep you logged in. You can disable cookies in your browser settings, though some features may not work correctly.</p>
        </Section>

        <Section title="9. Children's Privacy">
          <p>Our service is not directed to children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us information, contact us immediately.</p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>We may update this policy from time to time. We will notify active users of material changes via email. The "last updated" date at the top reflects the most recent revision.</p>
        </Section>

        <div className="mt-12 pt-8 border-t border-bdr">
          <p className="text-xs text-ink-subtle">
            Questions? <a href="mailto:hello@bokt.co" className="text-accent underline">hello@bokt.co</a> · <Link href="/terms" className="text-accent underline">Terms of Service</Link> · <Link href="/" className="text-accent underline">Back to home</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
