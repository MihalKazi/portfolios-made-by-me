// src/components/Footer.tsx
import { cvData } from '@/data/cv';

export default function Footer() {
  return (
    <footer className="bg-[#152820] pt-20 pb-10 border-t border-[#1E3A2F]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">
        
        {/* Grid: Contact, Links, Name */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          
          {/* Column 1: Contact Details */}
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#C84B31] mb-6">Contact</h3>
            <ul className="space-y-4 font-sans text-sm text-white/80">
              <li>
                <a href={`mailto:${cvData.personal.email}`} className="hover:text-[#C84B31] transition-colors font-semibold">
                  {cvData.personal.email}
                </a>
              </li>
              <li>{cvData.personal.phone}</li>
              <li className="text-white/50">{cvData.personal.location}</li>
            </ul>
          </div>

          {/* Column 2: Social Profiles */}
          <div>
            <h3 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#C84B31] mb-6">Profiles</h3>
            <div className="flex flex-col space-y-4 font-sans text-sm text-white/80 font-semibold">
              <a href={cvData.personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-[#C84B31] transition-colors inline-flex w-fit group">
                LinkedIn <span className="text-white/40 font-normal ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </a>
              <a href={cvData.personal.medium} target="_blank" rel="noreferrer" className="hover:text-[#C84B31] transition-colors inline-flex w-fit group">
                Medium <span className="text-white/40 font-normal ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
              </a>
            </div>
          </div>

          {/* Column 3: Name & Title (Right Aligned on Desktop) */}
          <div className="md:text-right flex flex-col md:items-end">
            <h3 className="font-serif text-3xl text-[#FDFBF7] mb-3">{cvData.personal.name}.</h3>
            {/* Splits his title to just show "Anthropologist" cleanly */}
            <p className="font-sans text-xs text-white/50 uppercase tracking-[0.2em] font-bold">
              {cvData.personal.title.split(' | ')[1]}
            </p>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col md:flex-row justify-between items-center font-sans text-xs text-white/40 tracking-wide pt-8 border-t border-white/10">
          <p>&copy; {new Date().getFullYear()} {cvData.personal.name}. All rights reserved.</p>
          <p className="mt-4 md:mt-0">Designed with intent.</p>
        </div>

      </div>
    </footer>
  );
}