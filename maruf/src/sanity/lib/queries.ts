import { groq } from 'next-sanity'

export const CV_QUERY = groq`*[_type == "cv"][0] {
  personal {
    name,
    title,
    email,
    phone,
    location,
    linkedin,
    medium,
    "image": image.asset->url,
    summary,
    skills
  },
  workExperience[] {
    company,
    role,
    date,
    location,
    "images": images[].asset->url,
    details
  },
  researchExperience[] {
    organization,
    title,
    date,
    location,
    "images": images[].asset->url,
    details
  },
  education[] {
    degree,
    institution,
    year
  },
  academic
}`
