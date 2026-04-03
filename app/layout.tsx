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
  title: 'BOKT — AI Call Answering & Google Maps for Home Services',
  description:
    'Never miss a call. Own your local map. BOKT answers every call 24/7 and optimizes your Google Maps listing — so your home service business gets more jobs, not more voicemails.',
  keywords:
    'AI answering service, Google Maps optimization, plumber, electrician, roofer, HVAC, home service business',
  openGraph: {
    title: 'BOKT — AI Call Answering & Google Maps for Home Services',
    description: 'Never miss a call. Own your local map.',
    type: 'website',
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
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  )
}
