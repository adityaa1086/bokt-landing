import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'BOKT — AI Call Answering & Google Maps for Home Services'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          background: '#0D1F18',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Subtle glow */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(100,237,187,0.12) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
          <svg width="42" height="34" viewBox="0 0 42 34" fill="none">
            <rect x="0" y="0" width="18" height="8" rx="2" fill="#64EDBB" />
            <rect x="22" y="0" width="20" height="8" rx="2" fill="#64EDBB" />
            <rect x="0" y="11" width="12" height="8" rx="2" fill="#64EDBB" />
            <rect x="15" y="11" width="15" height="8" rx="2" fill="#64EDBB" />
            <rect x="33" y="11" width="9" height="8" rx="2" fill="#64EDBB" />
            <rect x="0" y="22" width="18" height="8" rx="2" fill="#64EDBB" />
            <rect x="22" y="22" width="20" height="8" rx="2" fill="#64EDBB" />
          </svg>
          <span style={{ fontFamily: 'sans-serif', fontWeight: 900, fontSize: 32, color: '#F4F0E8', letterSpacing: '-1px' }}>
            BOKT
          </span>
        </div>

        {/* Headline */}
        <div style={{
          fontFamily: 'sans-serif', fontWeight: 800,
          fontSize: 64, lineHeight: 1.0,
          color: '#F4F0E8', letterSpacing: '-2px',
          marginBottom: 28,
          display: 'flex', flexDirection: 'column',
        }}>
          <span>Found on Google.</span>
          <span>Calls answered.</span>
          <span style={{ color: '#64EDBB' }}>Jobs paid.</span>
        </div>

        {/* Subtext */}
        <div style={{
          fontFamily: 'sans-serif', fontSize: 22,
          color: 'rgba(244,240,232,0.55)', marginBottom: 48,
          display: 'flex',
        }}>
          AI call answering + Google Maps optimization for home service businesses.
        </div>

        {/* Pill badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'rgba(100,237,187,0.12)',
          border: '1px solid rgba(100,237,187,0.3)',
          borderRadius: 999, padding: '10px 20px',
          width: 'fit-content',
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: 999,
            background: '#64EDBB', display: 'flex',
          }} />
          <span style={{
            fontFamily: 'sans-serif', fontWeight: 700,
            fontSize: 18, color: '#64EDBB',
          }}>
            2 weeks free — no card required
          </span>
        </div>

        {/* URL */}
        <div style={{
          position: 'absolute', bottom: 60, right: 80,
          fontFamily: 'sans-serif', fontSize: 18,
          color: 'rgba(244,240,232,0.3)',
          display: 'flex',
        }}>
          home.getbokt.com
        </div>
      </div>
    ),
    { ...size }
  )
}
