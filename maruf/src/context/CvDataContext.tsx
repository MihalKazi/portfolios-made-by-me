'use client';

import { createContext, useContext } from 'react';
import { cvData as staticData } from '@/data/cv';
import type { CvData } from '@/lib/getData';

const CvDataContext = createContext<CvData>(staticData);

export function CvDataProvider({ data, children }: { data: CvData; children: React.ReactNode }) {
  return <CvDataContext.Provider value={data}>{children}</CvDataContext.Provider>;
}

export function useCvData() {
  return useContext(CvDataContext);
}
