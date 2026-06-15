import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'u7lepvvf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skhe85trJmTi7br0bBIJBIpltOQVCc3evFLN3kOai6JhqzThcEHijAQIBiaVEftm1DDnWNP0kOff0lm99GCCemv4W2MM7wyjgps4sjVVNaQNXBZwGuHr5ty1dpMy7Wl5vNuOlm5F4c7JtZdPlpSZZE54UNlJeFvhNG0rssYX7W5bWdRmzor6',
  useCdn: false,
})

const data = await client.fetch(`*[_type == "cv"][0]{ "cvFileUrl": cvFile.asset->url }`)
console.log('cvFileUrl:', data?.cvFileUrl ?? 'NOT FOUND')
