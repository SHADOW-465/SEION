import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { ProofStrip } from '@/components/sections/ProofStrip';
import { Problem } from '@/components/sections/Problem';
import { Services } from '@/components/services';
import { Demo } from '@/components/demo';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProofStrip />
      <Problem />
      <Services />
      <Demo />
    </main>
  );
}
