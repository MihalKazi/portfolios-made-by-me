import { client } from '@/sanity/lib/client'
import { CV_QUERY } from '@/sanity/lib/queries'
import { cvData as staticData } from '@/data/cv'

export type CvData = {
  personal: {
    name: string
    title: string
    email: string
    phone: string
    location: string
    linkedin: string
    medium: string
    image: string
    summary: string
    skills: string[]
  }
  workExperience: {
    company: string
    role: string
    date: string
    location: string
    images: string[]
    details: string[]
  }[]
  researchExperience: {
    organization: string
    title: string
    date: string
    location: string
    images: string[]
    details: string
  }[]
  education: {
    degree: string
    institution: string
    year: string
  }[]
  academic: string[]
}

export async function getCvData(): Promise<CvData> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  if (!projectId) return staticData as CvData

  try {
    const data = await client.fetch(CV_QUERY, {}, { next: { revalidate: 0 } })
    if (!data) return staticData as CvData
    return data as CvData
  } catch {
    return staticData as CvData
  }
}
