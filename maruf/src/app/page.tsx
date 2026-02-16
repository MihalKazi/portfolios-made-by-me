// src/app/page.tsx
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Research from '@/components/Research';
import Highlights from '@/components/Highlights';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] selection:bg-[#C84B31]/20 selection:text-[#1E3A2F] relative">
      {/* Navbar stays fixed on top */}
      <Navbar />
      
      {/* The "Frame" Wrapper:
        - overflow-x-hidden: Prevents any horizontal scrolling.
        - flex flex-col: Keeps sections stacked vertically.
        - w-full: Ensures it takes up exactly the screen width.
      */}
      <div className="flex flex-col w-full overflow-x-hidden">
        <Hero />
        <Experience />
        <Research />
        <Highlights />
        <Skills />
        <Footer />
      </div>
    </main>
  );
}