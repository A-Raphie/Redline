import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#F5F1E8',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '14px',
              background: '#382F42',
              color: '#FFFEFB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              fontWeight: 'bold',
            }}
          >
            RL
          </div>
          <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#1C1B1A', letterSpacing: '-0.02em' }}>
            Redline
          </span>
          <span
            style={{
              fontSize: '18px',
              padding: '6px 14px',
              borderRadius: '999px',
              background: '#EEE8DE',
              color: '#55504A',
              border: '1px solid #D8D0C4',
              fontWeight: 600,
            }}
          >
            LexHack 2026
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '1000px' }}>
          <div style={{ fontSize: '64px', fontWeight: 800, color: '#1C1B1A', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
            Never sign an unfair contract.
          </div>
          <div style={{ fontSize: '26px', color: '#55504A', lineHeight: 1.4 }}>
            Catch hidden liability traps, renewal tricks, and data grabs. Push back with Common Paper open standards in a native Word tracked changes document.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            fontSize: '18px',
            color: '#7C756D',
            fontWeight: 500,
          }}
        >
          <span>Common Paper Standards</span>
          <span>•</span>
          <span>Native OpenXML Tracked Changes</span>
          <span>•</span>
          <span>100% Client-Side Privacy</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
