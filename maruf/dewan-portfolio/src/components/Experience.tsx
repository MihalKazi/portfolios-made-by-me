// src/components/Experience.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { cvData } from '@/data/cv';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from './Typewriter';

export default function Experience() {
  // State to track which image is currently clicked open
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="experience" className="py-24 md:py-32 relative bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        
        {/* Section Header */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Typewriter 
            text="Professional Journey" 
            delay={0.1}
            className="font-sans text-xs uppercase tracking-[0.2em] text-[#C84B31] font-semibold mb-4 block"
          />
          <h2 className="font-serif text-5xl md:text-6xl text-[#1E3A2F]">Work Experience</h2>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {cvData.workExperience.map((job, index) => {
            const isImageLeft = index % 2 === 0;

            return (
              <motion.div 
                key={index} 
                className={`flex flex-col ${isImageLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16 group`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                
                {/* Clickable Image Container */}
                <motion.div 
                  // layoutId links this small image to the large fullscreen one
                  layoutId={`exp-img-${index}`}
                  className="w-full md:w-1/2 aspect-video relative overflow-hidden bg-[#E8E3DA] border border-stone-200 cursor-pointer shadow-lg"
                  onClick={() => setSelectedIndex(index)}
                >
                  <Image 
                    src={job.image} 
                    alt={`Photo for ${job.role} at ${job.company}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle hover overlay to indicate it can be clicked */}
                  <div className="absolute inset-0 bg-[#1E3A2F]/0 group-hover:bg-[#1E3A2F]/20 transition-colors duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-sans text-xs tracking-[0.2em] uppercase font-bold bg-[#1E3A2F]/60 px-6 py-3 backdrop-blur-sm transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      View Photo
                    </span>
                  </div>
                </motion.div>

                {/* Text Content */}
                <div className="w-full md:w-1/2">
                  <div className="font-sans text-xs text-[#C84B31] font-bold mb-4 uppercase tracking-[0.15em]">{job.date}</div>
                  <h3 className="font-serif text-3xl md:text-4xl text-[#1E3A2F] mb-3 group-hover:text-[#C84B31] transition-colors duration-300">
                    {job.role}
                  </h3>
                  <div className="flex items-center gap-3 font-sans text-sm font-bold text-stone-500 tracking-wide mb-6 uppercase border-b border-stone-200 pb-4 inline-block">
                    {job.company} <span className="text-stone-300 font-normal">|</span> {job.location}
                  </div>
                  <ul className="space-y-4 text-stone-600 font-sans text-sm md:text-base leading-relaxed">
                    {job.details.map((detail, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-[#C84B31] mr-3 mt-1">▹</span> 
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* --- LIGHTBOX OVERLAY --- */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1E3A2F]/90 backdrop-blur-md p-4 md:p-12 cursor-pointer"
            onClick={() => setSelectedIndex(null)} // Close when clicking the background
          >
            {/* The Expanded Image */}
            <motion.div 
              layoutId={`exp-img-${selectedIndex}`}
              className="relative w-full max-w-6xl aspect-video bg-[#E8E3DA] overflow-hidden shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()} // Prevent clicks on the image from closing the overlay
            >
              <Image 
                src={cvData.workExperience[selectedIndex].image} 
                alt="Expanded field photo"
                fill
                className="object-contain bg-black/50" // Changed to contain so no part of the image is cropped in full screen
              />
            </motion.div>

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-8 right-8 text-[#FDFBF7] font-sans text-xs font-bold tracking-[0.2em] uppercase bg-white/10 px-6 py-3 hover:bg-[#C84B31] transition-colors duration-300 border border-white/20 backdrop-blur-md"
              onClick={() => setSelectedIndex(null)}
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}