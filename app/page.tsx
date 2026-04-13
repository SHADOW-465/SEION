import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { ProofStrip } from '@/components/sections/ProofStrip';
import { Problem } from '@/components/sections/Problem';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProofStrip />
      <Problem />
    </main>
  );
}
