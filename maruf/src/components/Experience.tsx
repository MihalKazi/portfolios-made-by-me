// src/components/Experience.tsx
"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useCvData } from '@/context/CvDataContext';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from './Typewriter';

export default function Experience() {
  const cvData = useCvData();
  // Per-job active slide index for the carousel
  const [slideIndices, setSlideIndices] = useState<number[]>(() => cvData.workExperience.map(() => 0));
  // Lightbox state: which job + which image
  const [lightbox, setLightbox] = useState<{ jobIndex: number; imgIndex: number } | null>(null);

  // Sync slideIndices length if data changes
  useEffect(() => {
    setSlideIndices(cvData.workExperience.map((_, i) => slideIndices[i] ?? 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cvData.workExperience.length]);

  // Auto-advance each carousel independently
  useEffect(() => {
    const timers: (ReturnType<typeof setInterval> | null)[] = []
    const timeouts: ReturnType<typeof setTimeout>[] = []

    cvData.workExperience.forEach((job, i) => {
      const imgs = (job.images ?? []).filter(Boolean);
      if (imgs.length <= 1) { timers.push(null); return; }
      const t = setTimeout(() => {
        const id = setInterval(() => {
          setSlideIndices(prev => {
            const next = [...prev];
            next[i] = (next[i] + 1) % imgs.length;
            return next;
          });
        }, 3000);
        timers[i] = id;
      }, i * 1200);
      timeouts.push(t);
    });

    return () => {
      timeouts.forEach(t => clearTimeout(t));
      timers.forEach(t => t && clearInterval(t));
    };
  }, [cvData.workExperience]);

  const lightboxNext = useCallback(() => {
    if (!lightbox) return;
    const imgs = (cvData.workExperience[lightbox.jobIndex].images ?? []).filter(Boolean);
    setLightbox({ ...lightbox, imgIndex: (lightbox.imgIndex + 1) % imgs.length });
  }, [lightbox, cvData.workExperience]);

  const lightboxPrev = useCallback(() => {
    if (!lightbox) return;
    const imgs = (cvData.workExperience[lightbox.jobIndex].images ?? []).filter(Boolean);
    setLightbox({ ...lightbox, imgIndex: (lightbox.imgIndex - 1 + imgs.length) % imgs.length });
  }, [lightbox, cvData.workExperience]);

  // Keyboard nav in lightbox
  useEffect(() => {
    if (!lightbox) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') lightboxNext();
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'Escape') setLightbox(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, lightboxNext, lightboxPrev]);

  return (
    <section id="experience" className="py-24 md:py-32 relative bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">

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
            const imgs = (job.images ?? []).filter(Boolean);
            const activeImg = slideIndices[index] ?? 0;
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
                {/* Carousel */}
                <div
                  className="w-full md:w-1/2 aspect-video relative overflow-hidden bg-[#E8E3DA] border border-stone-200 cursor-pointer shadow-lg"
                  onClick={() => setLightbox({ jobIndex: index, imgIndex: activeImg })}
                >
                  <AnimatePresence mode="wait">
                    {imgs.length > 0 && (
                      <motion.div
                        key={activeImg}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Image
                          src={imgs[activeImg]}
                          alt={`${job.role} at ${job.company} — photo ${activeImg + 1}`}
                          fill
                          className="object-cover"
                          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#1E3A2F]/0 group-hover:bg-[#1E3A2F]/20 transition-colors duration-500 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white font-sans text-xs tracking-[0.2em] uppercase font-bold bg-[#1E3A2F]/60 px-6 py-3 backdrop-blur-sm transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                      View Photos
                    </span>
                  </div>

                  {/* Dot indicators */}
                  {imgs.length > 1 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                      {imgs.map((_, di) => (
                        <button
                          key={di}
                          type="button"
                          onClick={e => { e.stopPropagation(); setSlideIndices(prev => { const n = [...prev]; n[index] = di; return n; }); }}
                          title={`Go to photo ${di + 1}`}
                          className={`w-2 h-2 rounded-full transition-all ${di === activeImg ? 'bg-white scale-125' : 'bg-white/50'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Text */}
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

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (() => {
          const imgs = (cvData.workExperience[lightbox.jobIndex].images ?? []).filter(Boolean);
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1E3A2F]/90 backdrop-blur-md p-4 md:p-12 cursor-pointer"
              onClick={() => setLightbox(null)}
            >
              <motion.div
                className="relative w-full max-w-6xl aspect-video bg-black overflow-hidden shadow-2xl border border-white/10"
                onClick={e => e.stopPropagation()}
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={lightbox.imgIndex}
                    className="absolute inset-0"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={imgs[lightbox.imgIndex]}
                      alt="Expanded photo"
                      fill
                      className="object-contain"
                      onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev / Next */}
                {imgs.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={lightboxPrev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 text-white hover:bg-[#C84B31] transition-colors border border-white/20 text-lg"
                    >
                      ‹
                    </button>
                    <button
                      type="button"
                      onClick={lightboxNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/50 text-white hover:bg-[#C84B31] transition-colors border border-white/20 text-lg"
                    >
                      ›
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {imgs.map((_, di) => (
                        <button
                          key={di}
                          type="button"
                          onClick={() => setLightbox({ ...lightbox, imgIndex: di })}
                          title={`Go to photo ${di + 1}`}
                          className={`w-2 h-2 rounded-full transition-all ${di === lightbox.imgIndex ? 'bg-white scale-125' : 'bg-white/40'}`}
                        />
                      ))}
                    </div>
                    {/* Counter */}
                    <div className="absolute top-4 left-4 text-white/60 text-xs font-sans font-bold tracking-widest">
                      {lightbox.imgIndex + 1} / {imgs.length}
                    </div>
                  </>
                )}
              </motion.div>

              <motion.button
                type="button"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.2 } }}
                exit={{ opacity: 0, y: -20 }}
                className="absolute top-8 right-8 text-[#FDFBF7] font-sans text-xs font-bold tracking-[0.2em] uppercase bg-white/10 px-6 py-3 hover:bg-[#C84B31] transition-colors duration-300 border border-white/20 backdrop-blur-md"
                onClick={() => setLightbox(null)}
              >
                Close
              </motion.button>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
