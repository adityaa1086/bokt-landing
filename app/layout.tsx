import type { Metadata } from 'next'
import { Space_Grotesk, DM_Sans } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['300', '400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL('https://home.getbokt.com'),
  title: 'BOKT — AI Call Answering & Google Maps for Home Services',
  description:
    'Never miss a call. Own your local map. BOKT answers every call 24/7 and optimizes your Google Maps listing — so your home service business gets more jobs, not more voicemails.',
  keywords:
    'AI answering service, Google Maps optimization, plumber, electrician, roofer, HVAC, home service business',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'BOKT — AI Call Answering & Google Maps for Home Services',
    description: 'Never miss a call. Own your local map.',
    url: 'https://home.getbokt.com',
    siteName: 'BOKT',
    images: [
      {
        url: '/triage-diagram.png', // Fallback until logo updates fully
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BOKT — AI Call Answering & Google Maps',
    description: 'Never miss a call. Own your local map.',
    images: ['/triage-diagram.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'BOKT',
    operatingSystem: 'Web',
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: '497',
      priceCurrency: 'USD',
    },
    description: 'AI Call Answering & Google Maps Optimization for Home Services.',
    url: 'https://home.getbokt.com',
    publisher: {
      '@type': 'Organization',
      name: 'BOKT',
      logo: 'https://home.getbokt.com/favicon.svg',
    },
  }

  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
