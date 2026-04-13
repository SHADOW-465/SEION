import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function fadeUp(
  targets: gsap.TweenTarget,
  options: { delay?: number; stagger?: number; scrollTrigger?: ScrollTrigger.Vars } = {}
) {
  const yOffset = typeof window !== 'undefined' && window.innerWidth < 768 ? 16 : 28;
  return gsap.fromTo(
    targets,
    { y: yOffset, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: 'power3.out',
      delay: options.delay ?? 0,
      stagger: options.stagger ?? 0,
      scrollTrigger: options.scrollTrigger,
    }
  );
}

export function staggerFadeUp(
  targets: gsap.TweenTarget,
  scrollTriggerVars: ScrollTrigger.Vars = {}
) {
  return fadeUp(targets, {
    stagger: 0.08,
    scrollTrigger: {
      start: 'top 85%',
      once: true,
      ...scrollTriggerVars,
    },
  });
}

export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

export function counterUp(
  element: HTMLElement,
  target: number,
  duration = 1800
): void {
  const start = performance.now();
  const update = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const value = Math.round(easeOutExpo(progress) * target);
    element.textContent = String(value);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
