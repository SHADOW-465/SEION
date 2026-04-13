import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <main>
      <Navbar />
      <div style={{ height: '200vh', background: '#0C0C0E', paddingTop: '50vh', textAlign: 'center', color: 'white' }}>
        <p style={{ fontFamily: 'DM Sans, sans-serif' }}>Scroll to test navbar morph</p>
        <div data-section-light style={{ height: '50vh', background: '#F5F2EB', marginTop: '30vh' }} />
      </div>
    </main>
  );
}
