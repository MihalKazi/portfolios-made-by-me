// src/components/Highlights.tsx
"use client";

import { cvData } from '@/data/cv';
import { motion } from 'framer-motion';
import Typewriter from './Typewriter';

export default function Highlights() {
  return (
    <section id="highlights" className="py-24 md:py-32 bg-white relative overflow-hidden border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
        
        {/* Section Header */}
        <motion.div 
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Typewriter Effect added here */}
          <Typewriter 
            text="Background" 
            delay={0.1}
            className="font-sans text-xs uppercase tracking-[0.2em] text-[#C84B31] font-semibold mb-4 block"
          />
          <h2 className="font-serif text-5xl md:text-6xl text-[#1E3A2F]">Academic & Highlights</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Education Card */}
          <motion.div 
            className="bg-[#FDFBF7] border border-stone-200 p-8 md:p-12 hover:border-[#C84B31]/30 hover:shadow-xl hover:shadow-[#C84B31]/5 transition-all duration-500 group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-sans text-[#C84B31] text-xs font-bold mb-8 uppercase tracking-[0.2em] border-b border-stone-200 pb-4">Education</h3>
            <div className="space-y-10">
              {cvData.education.map((edu, index) => (
                <div key={index}>
                  <div className="font-serif text-2xl md:text-3xl text-[#1E3A2F] mb-3 group-hover:text-[#C84B31] transition-colors duration-300">
                    {edu.degree}
                  </div>
                  <div className="text-stone-500 font-sans text-xs tracking-widest font-bold uppercase">
                    {edu.institution} <span className="text-stone-300 font-normal mx-2">|</span> {edu.year}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Workshops & Training Card */}
          <motion.div 
            className="bg-[#FDFBF7] border border-stone-200 p-8 md:p-12 hover:border-[#C84B31]/30 hover:shadow-xl hover:shadow-[#C84B31]/5 transition-all duration-500"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-sans text-[#C84B31] text-xs font-bold mb-8 uppercase tracking-[0.2em] border-b border-stone-200 pb-4">Workshops & Training</h3>
            <ul className="space-y-6">
              {cvData.academic.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-[#C84B31] mr-4 mt-1 font-serif text-xl leading-none">▹</span>
                  <p className="text-stone-600 font-sans text-sm leading-relaxed">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
}