// src/components/Hero.tsx
"use client"; 

import Image from 'next/image';
import { cvData } from '@/data/cv';
import { motion } from 'framer-motion';
import Typewriter from './Typewriter'; // Import our new component

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    },
  };

  return (
    <section id="about" className="pt-32 pb-24 md:pt-40 md:pb-32 bg-[#FDFBF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
          
          <motion.div 
            className="w-full md:w-3/5 flex flex-col items-start"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Here is our Typewriter! 
              It types out the title with a slight delay so it happens as the page loads.
            */}
            <Typewriter 
              text={cvData.personal.title} 
              delay={0.3} 
              className="font-sans text-xs uppercase tracking-[0.2em] text-[#C84B31] font-bold mb-6 block"
            />
            
            <motion.h1 variants={itemVariants} className="font-serif text-6xl md:text-7xl lg:text-8xl text-[#1E3A2F] mb-8 leading-[1.1] tracking-tight">
              {cvData.personal.name}.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="font-sans text-stone-600 text-base md:text-lg leading-relaxed max-w-xl mb-10">
              {cvData.personal.summary}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center font-sans text-xs font-bold uppercase tracking-widest">
              <a href="#experience" className="bg-[#1E3A2F] text-[#FDFBF7] px-8 py-4 hover:bg-[#C84B31] transition-colors duration-300 shadow-lg shadow-[#1E3A2F]/10">
                View Experience
              </a>
              <a href="#research" className="text-[#1E3A2F] hover:text-[#C84B31] transition-colors duration-300 flex items-center gap-2 group">
                Research <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </motion.div>
          </motion.div>

          <motion.div 
            className="w-full md:w-2/5"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto md:ml-auto shadow-2xl overflow-hidden bg-[#E8E3DA] border border-stone-200 group">
              <Image 
                src={cvData.personal.image}
                alt={`${cvData.personal.name} Profile`}
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}