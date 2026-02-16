// src/components/Research.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { cvData } from '@/data/cv';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from './Typewriter';

export default function Research() {
  const [selectedResearchIndex, setSelectedResearchIndex] = useState<number | null>(null);

  return (
    <section id="research" className="py-24 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-stone-200 pb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div>
            <Typewriter 
              text="Selected Works" 
              delay={0.1}
              className="font-sans text-xs uppercase tracking-[0.2em] text-[#C84B31] font-semibold mb-4 block"
            />
            <h2 className="font-serif text-5xl md:text-6xl text-[#1E3A2F]">Research Portfolio</h2>
          </div>
          <p className="font-sans text-stone-600 max-w-sm text-sm leading-relaxed">
            Evidence-based research projects spanning digital rights, women's empowerment, and community resilience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          
          {cvData.researchExperience.map((project, index) => (
            <motion.div 
              key={index} 
              className="group bg-white border border-stone-100 shadow-sm hover:shadow-xl hover:shadow-[#C84B31]/10 hover:border-[#C84B31]/30 transition-all duration-500 flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: [0.16, 1, 0.3, 1] }} 
            >
              {/* Clickable Image Container */}
              <motion.div 
                layoutId={`res-img-${index}`}
                className="w-full aspect-[4/3] relative overflow-hidden bg-[#E8E3DA] cursor-pointer"
                onClick={() => setSelectedResearchIndex(index)}
              >
                <Image 
                  src={project.image} 
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#1E3A2F]/0 group-hover:bg-[#1E3A2F]/20 transition-colors duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-sans text-xs tracking-[0.2em] uppercase font-bold bg-[#1E3A2F]/60 px-6 py-3 backdrop-blur-sm transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      Expand
                    </span>
                  </div>
              </motion.div>
              
              <div className="p-8 flex flex-col flex-1">
                <div className="font-sans text-[10px] uppercase tracking-widest text-stone-400 mb-4 flex justify-between font-semibold">
                  <span>{project.date}</span>
                  <span className="text-[#C84B31]">{project.location}</span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl mb-4 text-[#1E3A2F] group-hover:text-[#C84B31] transition-colors leading-tight">
                  {project.title}
                </h3>
                <div className="font-sans text-xs text-stone-500 mb-6 font-bold tracking-widest uppercase border-b border-stone-100 pb-4">
                  {project.organization}
                </div>
                <p className="font-sans text-stone-600 text-sm leading-relaxed mt-auto">
                  {project.details}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>

      {/* --- LIGHTBOX OVERLAY --- */}
      <AnimatePresence>
        {selectedResearchIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1E3A2F]/90 backdrop-blur-md p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedResearchIndex(null)} 
          >
            <motion.div 
              layoutId={`res-img-${selectedResearchIndex}`}
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video bg-[#E8E3DA] overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()} 
            >
              <Image 
                src={cvData.researchExperience[selectedResearchIndex].image} 
                alt="Expanded research photo"
                fill
                className="object-contain bg-black/50" 
              />
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-8 right-8 text-[#FDFBF7] font-sans text-xs font-bold tracking-[0.2em] uppercase bg-white/10 px-6 py-3 hover:bg-[#C84B31] transition-colors duration-300 border border-white/20 backdrop-blur-md"
              onClick={() => setSelectedResearchIndex(null)}
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}