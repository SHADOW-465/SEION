// components/process/SVGScanGrid.tsx
export function SVGScanGrid() {
  const dots: { x: number; y: number }[] = [];
  for (let row = 0; row < 6; row++) {
    for (let col = 0; col < 10; col++) {
      dots.push({ x: col * 18 + 9, y: row * 18 + 9 });
    }
  }
  return (
    <svg viewBox="0 0 189 117" width="189" height="117" style={{ overflow: 'hidden' }}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r="2" fill="rgba(255,255,255,0.15)" />
      ))}
      <rect
        x="0" y="0" width="20" height="117"
        fill="url(#laser-grad)"
        style={{ animation: 'laser-scan 2.2s linear infinite' }}
      />
      <defs>
        <linearGradient id="laser-grad" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="rgba(212,149,42,0)" />
          <stop offset="50%" stopColor="rgba(212,149,42,0.4)" />
          <stop offset="100%" stopColor="rgba(212,149,42,0)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
