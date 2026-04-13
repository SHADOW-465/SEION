// components/process/SVGDataTree.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function SVGDataTree() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const paths = svgRef.current.querySelectorAll('path[data-branch]');

    const animate = () => {
      paths.forEach((path) => {
        const length = (path as SVGPathElement).getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.15,
        onComplete: () => { setTimeout(animate, 1500); },
      });
    };

    animate();

    return () => { gsap.killTweensOf(paths); };
  }, []);

  return (
    <svg ref={svgRef} viewBox="0 0 200 160" width="200" height="160">
      <path data-branch d="M100,150 L100,80" stroke="rgba(212,149,42,0.8)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path data-branch d="M100,100 L60,60" stroke="rgba(212,149,42,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path data-branch d="M100,100 L140,60" stroke="rgba(212,149,42,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path data-branch d="M60,60 L35,30" stroke="rgba(212,149,42,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path data-branch d="M60,60 L75,25" stroke="rgba(212,149,42,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path data-branch d="M140,60 L125,25" stroke="rgba(212,149,42,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />
      <path data-branch d="M140,60 L165,30" stroke="rgba(212,149,42,0.4)" strokeWidth="1" fill="none" strokeLinecap="round" />
      {([[100,80],[60,60],[140,60],[35,30],[75,25],[125,25],[165,30]] as [number,number][]).map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3" fill="rgba(212,149,42,0.7)" />
      ))}
    </svg>
  );
}
