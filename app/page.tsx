// app/page.tsx
import { Navbar }     from '@/components/navbar';
import { Hero }       from '@/components/hero';
import { ProofStrip } from '@/components/sections/ProofStrip';
import { Problem }    from '@/components/sections/Problem';
import { Services }   from '@/components/services';
import { Demo }       from '@/components/demo';
import { Process }    from '@/components/process';
import { Manifesto }  from '@/components/sections/Manifesto';
import { Industries } from '@/components/sections/Industries';
import { About }      from '@/components/sections/About';
import { Contact }    from '@/components/sections/Contact';
import { Footer }     from '@/components/sections/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProofStrip />
      <Problem />
      <Services />
      <Demo />
      <Process />
      <Manifesto />
      <Industries />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
