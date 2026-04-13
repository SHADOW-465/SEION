'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const rafId   = useRef<number>(0);
  const active  = useRef(false);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    active.current = true;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterInteractive = () => {
      dotRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1.5)');
      ringRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1.8)');
    };

    const onLeaveInteractive = () => {
      dotRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1)');
      ringRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1)');
    };

    const tick = () => {
      if (!active.current) return;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.current.x}px`;
        dotRef.current.style.top  = `${mouse.current.y}px`;
      }
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top  = `${ring.current.y}px`;
      }
      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    document.addEventListener('mousemove', onMove);

    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    return () => {
      active.current = false;
      cancelAnimationFrame(rafId.current);
      document.removeEventListener('mousemove', onMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 8, height: 8, borderRadius: '50%',
          background: '#D4952A',
          transform: 'translate(-50%,-50%) scale(1)',
          transition: 'transform 200ms var(--ease-morph)',
          pointerEvents: 'none', zIndex: 99999,
        }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 32, height: 32, borderRadius: '50%',
          border: '1.5px solid #D4952A',
          transform: 'translate(-50%,-50%) scale(1)',
          transition: 'transform 200ms var(--ease-morph)',
          pointerEvents: 'none', zIndex: 99999,
        }}
      />
    </>
  );
}
