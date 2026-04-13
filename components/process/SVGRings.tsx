// components/process/SVGRings.tsx
export function SVGRings() {
  return (
    <svg viewBox="0 0 200 200" width="200" height="200" style={{ overflow: 'visible' }}>
      {[60, 80, 100].map((r, i) => (
        <circle
          key={r}
          cx="100" cy="100" r={r}
          fill="none"
          stroke="rgba(212,149,42,0.2)"
          strokeWidth="1"
          style={{
            animation: `${i % 2 === 0 ? 'ring-rotate-cw' : 'ring-rotate-ccw'} ${[8, 12, 16][i]}s linear infinite`,
            transformOrigin: '100px 100px',
            strokeDasharray: i === 1 ? '8 4' : i === 2 ? '4 8' : 'none',
          }}
        />
      ))}
      <circle cx="100" cy="100" r="6" fill="rgba(212,149,42,0.8)" />
    </svg>
  );
}
