import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — BOKT',
  description: 'Terms and conditions for using BOKT services.',
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="mb-10">
    <h2 className="font-heading font-bold text-xl text-ink mb-4 tracking-tight">{title}</h2>
    <div className="space-y-3 text-ink-muted leading-relaxed text-sm">{children}</div>
  </section>
)

export default function Terms() {
  return (
    <div style={{ background: '#F4F0E8', minHeight: '100vh' }}>
      <header className="border-b border-bdr px-4 sm:px-8 py-4 flex items-center justify-between"
        style={{ background: '#F4F0E8' }}>
        <Link href="/" className="font-heading font-black text-xl tracking-tight text-ink">BOKT</Link>
        <Link href="/" className="text-sm text-ink-muted hover:text-ink transition-colors">← Back to home</Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-8 py-16">
        <div className="mb-12">
          <p className="text-xs font-heading font-medium uppercase tracking-[0.2em] text-accent mb-3">Legal</p>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl tracking-tighter text-ink mb-3">Terms of Service</h1>
          <p className="text-ink-muted text-sm">Last updated: April 3, 2026</p>
        </div>

        <Section title="1. Agreement to Terms">
          <p>By accessing or using BOKT's services at <strong>home.getbokt.com</strong>, you agree to be bound by these Terms of Service. If you do not agree, do not use the service.</p>
          <p>These Terms apply to all users, including business owners who subscribe to BOKT and end customers whose calls are handled by BOKT on behalf of those businesses.</p>
        </Section>

        <Section title="2. Description of Service">
          <p>BOKT provides home service businesses with:</p>
          <ul className="space-y-1 list-disc list-inside mt-2">
            <li>AI-powered call answering in your business name</li>
            <li>Google Maps / Google Business Profile optimization</li>
            <li>Automated appointment booking and calendar sync</li>
            <li>SMS confirmations, reminders, and no-show recovery</li>
            <li>Automated review generation and response</li>
            <li>POS terminal and payment processing (3% fee passed to customer)</li>
          </ul>
        </Section>

        <Section title="3. Subscription and Billing">
          <p><strong className="text-ink">Free trial:</strong> New subscribers receive a 14-day free trial. No credit card is required to start the trial.</p>
          <p><strong className="text-ink">Subscription fee:</strong> After the trial, the service is $497/month, billed monthly. Pricing is subject to change with 30 days' written notice.</p>
          <p><strong className="text-ink">Cancellation:</strong> You may cancel at any time with no cancellation fee. Your service continues through the end of the current billing period.</p>
          <p><strong className="text-ink">POS processing fee:</strong> The 3% credit card processing fee is collected from your customer at the point of sale. BOKT is not responsible for customer disputes related to this fee.</p>
        </Section>

        <Section title="4. SMS Messaging Terms">
          <div className="rounded-xl border-l-4 p-5"
            style={{ background: 'rgba(13,92,58,0.05)', borderColor: '#0D5C3A' }}>
            <p className="font-heading font-bold text-ink mb-3">A2P SMS Compliance</p>
            <p className="mb-2">BOKT sends SMS messages on behalf of subscribing businesses in compliance with the TCPA and A2P 10DLC requirements. By enabling SMS features, you (the business) agree that:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>You have obtained or will obtain proper consent from your customers before BOKT sends them SMS messages on your behalf</li>
              <li>Your business name matches the brand name registered in A2P compliance documents</li>
              <li>SMS messages will include proper disclosures: business name, message frequency, "Message & data rates may apply," HELP and STOP instructions</li>
              <li>Marketing SMS consent is optional and separate from transactional consent</li>
              <li>Customer opt-outs (STOP) are honored immediately</li>
            </ul>
          </div>
          <p className="mt-4"><strong className="text-ink">Your responsibility:</strong> As the business owner, you are responsible for ensuring your customer-facing opt-in flow meets all applicable laws. BOKT provides compliant SMS infrastructure but you are the message sender of record.</p>
        </Section>

        <Section title="5. Acceptable Use">
          <p>You agree not to use BOKT to:</p>
          <ul className="space-y-1 list-disc list-inside mt-2">
            <li>Send spam or unsolicited messages</li>
            <li>Violate any local, state, or federal laws</li>
            <li>Deceive customers or misrepresent your business</li>
            <li>Transmit illegal, harmful, or offensive content</li>
            <li>Reverse engineer or attempt to extract our AI models</li>
            <li>Resell or sublicense BOKT services without written permission</li>
          </ul>
        </Section>

        <Section title="6. Google Business Profile">
          <p>To use our Google Maps optimization features, you must grant BOKT access to your Google Business Profile. You remain the owner of your profile. BOKT acts as a manager and may be removed by you at any time.</p>
          <p>BOKT follows Google's content policies when posting on your behalf. Any content we publish is subject to your review and can be removed upon request.</p>
        </Section>

        <Section title="7. POS Terminal">
          <p>The POS terminal is shipped free to active subscribers. If you cancel within the first 90 days of receiving the terminal, you must return it in working condition or pay a $150 equipment fee. After 90 days, the terminal is yours to keep.</p>
        </Section>

        <Section title="8. Data and Privacy">
          <p>Your use of BOKT is also governed by our <Link href="/privacy" className="text-accent underline">Privacy Policy</Link>, which is incorporated into these Terms by reference.</p>
          <p>You own your business data. BOKT does not sell your data or your customers' data to third parties.</p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>BOKT's services are provided "as is." We do not guarantee that the service will be uninterrupted or error-free. BOKT's total liability to you for any claims arising from use of the service is limited to the amount you paid in the 3 months preceding the claim.</p>
          <p>BOKT is not liable for lost revenue due to missed calls during service outages, Google algorithm changes affecting your rankings, or customer disputes over POS transactions.</p>
        </Section>

        <Section title="10. Indemnification">
          <p>You agree to indemnify and hold BOKT harmless from any claims arising from your use of the service, your violation of these Terms, or your violation of any third party's rights (including your customers).</p>
        </Section>

        <Section title="11. Changes to Terms">
          <p>We may update these Terms from time to time. Continued use of the service after changes constitutes acceptance of the new Terms. We will notify active subscribers of material changes at least 14 days in advance.</p>
        </Section>

        <Section title="12. Governing Law">
          <p>These Terms are governed by the laws of the State of Delaware, United States, without regard to conflict of law provisions. Any disputes shall be resolved through binding arbitration under the AAA Commercial Arbitration Rules.</p>
        </Section>

        <Section title="13. Contact">
          <p>For questions about these Terms: <a href="mailto:hello@bokt.co" className="text-accent underline">hello@bokt.co</a></p>
        </Section>

        <div className="mt-12 pt-8 border-t border-bdr">
          <p className="text-xs text-ink-subtle">
            <Link href="/privacy" className="text-accent underline">Privacy Policy</Link> · <Link href="/" className="text-accent underline">Back to home</Link>
          </p>
        </div>
      </main>
    </div>
  )
}
