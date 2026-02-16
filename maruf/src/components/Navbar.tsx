// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Hook to track scroll progress (0 to 1)
  const { scrollYProgress } = useScroll();
  
  // Spring animation to make the progress bar feel buttery smooth
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Helper function to close the menu
  const closeMenu = () => setIsOpen(false);

  // Lock the background from scrolling when the mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      {/* 1. Dynamic Reading Progress Bar pinned to the very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#C84B31] origin-left z-[100]"
        style={{ scaleX }}
      />
      
      {/* 2. Sticky Navbar Container */}
      <nav className="fixed top-0 left-0 right-0 z-[80] bg-[#FDFBF7]/90 backdrop-blur-md border-b border-stone-200/50 pt-1 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          
          {/* Logo / Initials */}
          <a 
            href="#about" 
            onClick={closeMenu}
            className="font-serif text-2xl text-[#1E3A2F] font-bold tracking-tight hover:text-[#C84B31] transition-colors relative z-[90]"
          >
            DMA.
          </a>
          
          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8 font-sans text-xs font-bold uppercase tracking-widest text-[#1E3A2F]">
            <a href="#experience" className="hover:text-[#C84B31] transition-colors">Experience</a>
            <a href="#research" className="hover:text-[#C84B31] transition-colors">Research</a>
            <a href="#highlights" className="hover:text-[#C84B31] transition-colors">Background</a>
          </div>

          {/* Desktop Download CV Button (Hidden on Mobile) */}
          <a 
            href="/Dewan_Maruf_Ahmed.pdf" 
            download="Dewan_Maruf_Ahmed_CV.pdf"
            className="hidden md:inline-flex border border-[#1E3A2F] text-[#1E3A2F] px-6 py-2.5 font-sans text-xs font-bold uppercase tracking-widest hover:bg-[#1E3A2F] hover:text-[#FDFBF7] transition-all duration-300 shadow-sm hover:shadow-md"
          >
            Download CV
          </a>

          {/* Hamburger Menu Button (Visible ONLY on Mobile) */}
          <button 
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none relative z-[90]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <span className={`block w-6 h-[2px] bg-[#1E3A2F] transition-transform duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <span className={`block w-6 h-[2px] bg-[#1E3A2F] transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block w-6 h-[2px] bg-[#1E3A2F] transition-transform duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>
          
        </div>
      </nav>

      {/* 3. Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Premium Apple-style easing
            className="fixed inset-0 bg-[#FDFBF7] z-[70] flex flex-col items-center justify-center space-y-10 md:hidden h-screen w-screen"
          >
            <a href="#experience" onClick={closeMenu} className="font-serif text-3xl text-[#1E3A2F] hover:text-[#C84B31] transition-colors">
              Experience
            </a>
            <a href="#research" onClick={closeMenu} className="font-serif text-3xl text-[#1E3A2F] hover:text-[#C84B31] transition-colors">
              Research
            </a>
            <a href="#highlights" onClick={closeMenu} className="font-serif text-3xl text-[#1E3A2F] hover:text-[#C84B31] transition-colors">
              Background
            </a>
            
            {/* Mobile Download Button */}
            <a 
              href="/Dewan_Maruf_Ahmed.pdf" 
              download="Dewan_Maruf_Ahmed_CV.pdf"
              onClick={closeMenu}
              className="mt-8 border border-[#1E3A2F] bg-[#1E3A2F] text-[#FDFBF7] px-10 py-4 font-sans text-sm font-bold uppercase tracking-widest hover:bg-transparent hover:text-[#1E3A2F] transition-all duration-300 shadow-md"
            >
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}