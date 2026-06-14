'use client';

import { useCvData } from '@/context/CvDataContext';

export default function Footer() {
  const cvData = useCvData();

  return (
    <footer className="bg-[#0F1F17] border-t border-[#1E3A2F]">

      {/* CTA Band */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 md:py-28 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <div>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.25em] text-[#C84B31] mb-5">Get In Touch</p>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#FDFBF7] leading-[1.05]">
              Let&apos;s work<br />together.
            </h2>
          </div>
          <a
            href={`mailto:${cvData.personal.email}`}
            className="group inline-flex items-center gap-4 bg-[#C84B31] text-white font-sans text-xs font-bold uppercase tracking-[0.2em] px-10 py-5 hover:bg-[#FDFBF7] hover:text-[#1E3A2F] transition-colors duration-300 flex-shrink-0"
          >
            Send a Message
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>

      {/* Links Grid */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">

          <div className="col-span-2 md:col-span-1">
            <p className="font-serif text-2xl text-[#FDFBF7] mb-2">{cvData.personal.name}.</p>
            <p className="font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
              {cvData.personal.title.split(' | ')[1]}
            </p>
          </div>

          <div>
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#C84B31] mb-5">Contact</h4>
            <ul className="space-y-3 font-sans text-sm text-white/60">
              <li>
                <a href={`mailto:${cvData.personal.email}`} className="hover:text-[#C84B31] transition-colors">
                  {cvData.personal.email}
                </a>
              </li>
              <li className="hover:text-white/80 transition-colors">{cvData.personal.phone}</li>
              <li className="text-white/30 text-xs">{cvData.personal.location}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#C84B31] mb-5">Profiles</h4>
            <div className="flex flex-col gap-3 font-sans text-sm text-white/60">
              <a
                href={cvData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#C84B31] transition-colors inline-flex items-center gap-2 w-fit group"
              >
                LinkedIn
                <span className="text-white/20 text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
              <a
                href={cvData.personal.medium}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#C84B31] transition-colors inline-flex items-center gap-2 w-fit group"
              >
                Medium
                <span className="text-white/20 text-xs group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-[#C84B31] mb-5">Navigate</h4>
            <div className="flex flex-col gap-3 font-sans text-sm text-white/60">
              {['About', 'Experience', 'Research', 'Skills'].map(s => (
                <a
                  key={s}
                  href={`#${s.toLowerCase()}`}
                  className="hover:text-[#C84B31] transition-colors w-fit"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 font-sans text-xs text-white/25 tracking-wide">
          <p>&copy; {new Date().getFullYear()} {cvData.personal.name}. All rights reserved.</p>
          <p>Social Science Researcher · Dhaka, Bangladesh</p>
        </div>
      </div>

    </footer>
  );
}
