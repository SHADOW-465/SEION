import { HeroText } from './HeroText';
import { HeroDashboard } from './HeroDashboard';

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center"
      style={{ background: 'var(--color-void)', paddingTop: '6rem' }}
    >
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center">
          <HeroText />
          <div className="w-full">
            <HeroDashboard />
          </div>
        </div>
      </div>
    </section>
  );
}
