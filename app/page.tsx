import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import StatsBanner from '@/components/StatsBanner'
import PainSection from '@/components/PainSection'
import LocalMapSection from '@/components/LocalMapSection'
import Features from '@/components/Features'
import POSSection from '@/components/POSSection'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Nav />
      <Hero />
      <StatsBanner />
      <PainSection />
      <LocalMapSection />
      <Features />
      <POSSection />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
