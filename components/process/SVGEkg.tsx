// components/process/SVGEkg.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function SVGEkg() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 2.4,
        ease: 'power2.inOut',
        repeat: -1,
        repeatDelay: 1,
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg viewBox="0 0 280 80" width="280" height="80">
      <path
        ref={pathRef}
        d="M0,40 L40,40 L55,10 L65,70 L80,5 L95,75 L110,40 L150,40 L165,20 L175,60 L185,40 L280,40"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
