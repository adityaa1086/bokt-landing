import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import StatsBanner from '@/components/StatsBanner'
import Features from '@/components/Features'
import LocalMapSection from '@/components/LocalMapSection'
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
      <LocalMapSection />
      <Features />
      <POSSection />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
