// src/components/Skills.tsx
"use client";

import { cvData } from '@/data/cv';
import { motion } from 'framer-motion';

export default function Skills() {
  return (
    <section className="py-24 bg-[#FDFBF7] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
          
          {/* Left Side: Header */}
          <motion.div 
            className="md:w-1/3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="font-sans text-xs uppercase tracking-[0.2em] text-[#C84B31] font-semibold mb-4 block">Toolkit</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1E3A2F] mb-6">Skills & Expertise</h2>
            <p className="font-sans text-stone-600 text-sm leading-relaxed">
              A comprehensive blend of qualitative methodologies, quantitative analysis, and professional software proficiency.
            </p>
          </motion.div>

          {/* Right Side: Animated Skill Tags */}
          <div className="md:w-2/3 flex flex-wrap gap-3 md:gap-4 pt-2">
            {cvData.personal.skills.map((skill, index) => (
              <motion.div
                key={index}
                className="px-5 py-3 border border-stone-300 text-stone-700 font-sans text-xs font-bold tracking-widest uppercase hover:border-[#C84B31] hover:text-[#C84B31] transition-colors duration-300 cursor-default bg-white shadow-sm"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.05, // Super fast stagger so they pop in sequentially
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                {skill}
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}