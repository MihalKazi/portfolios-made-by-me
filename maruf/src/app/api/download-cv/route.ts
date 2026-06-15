import { createClient } from 'next-sanity'
import { CV_QUERY } from '@/sanity/lib/queries'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export async function GET() {
  const data = await client.fetch(CV_QUERY)
  const fileUrl = data?.cvFileUrl

  if (!fileUrl) {
    return new Response('CV not found', { status: 404 })
  }

  const file = await fetch(fileUrl)
  if (!file.ok) return new Response('Failed to fetch CV', { status: 502 })

  const buffer = await file.arrayBuffer()

  return new Response(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Dewan_Maruf_Ahmed_CV.pdf"',
    },
  })
}
