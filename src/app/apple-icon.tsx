import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 88,
          background: '#382F42',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#FFFEFB',
          borderRadius: 36,
          fontWeight: 800,
          fontFamily: 'sans-serif',
          letterSpacing: '-0.05em',
        }}
      >
        RL
      </div>
    ),
    { ...size }
  );
}
