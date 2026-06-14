import { createClient } from '@sanity/client'
import { createReadStream, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = resolve(__dirname, '../public')

const client = createClient({
  projectId: 'u7lepvvf',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: 'skhe85trJmTi7br0bBIJBIpltOQVCc3evFLN3kOai6JhqzThcEHijAQIBiaVEftm1DDnWNP0kOff0lm99GCCemv4W2MM7wyjgps4sjVVNaQNXBZwGuHr5ty1dpMy7Wl5vNuOlm5F4c7JtZdPlpSZZE54UNlJeFvhNG0rssYX7W5bWdRmzor6',
  useCdn: false,
})

async function uploadImage(relativePath) {
  const fullPath = resolve(publicDir, relativePath.replace(/^\//, ''))
  if (!existsSync(fullPath)) {
    console.log(`  skip (not found): ${relativePath}`)
    return null
  }
  console.log(`  uploading: ${relativePath}`)
  const asset = await client.assets.upload('image', createReadStream(fullPath), {
    filename: fullPath.split(/[\\/]/).pop(),
  })
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

async function seed() {
  console.log('Uploading images...')

  const profileImage = await uploadImage('/images/profile/hero-shot.jpg')
  const activateImage = await uploadImage('/images/experience/activate.jpg')

  console.log('\nCreating CV document...')

  const doc = {
    _id: 'singleton-cv',
    _type: 'cv',
    personal: {
      name: 'Dewan Maruf Ahmed',
      title: 'Social Science Researcher | Anthropologist',
      email: 'dewanmarufahmed@outlook.com',
      phone: '+8801749088886',
      location: 'Narayanganj, Dhaka, BD',
      linkedin: 'https://linkedin.com/in/dewan-maruf/',
      medium: 'https://medium.com/@amimaruf32',
      image: profileImage,
      summary: 'I have around three years of experience in the development sector, with a focus on qualitative and quantitative research, data collection, and youth leadership. Bringing experience in engaging with climate-vulnerable communities, people with disabilities, and transgender individuals. Spearheading a diverse team dedicated to advancing digital rights, privacy, and internet freedom.',
      skills: [
        'Microsoft Word', 'Excel', 'PowerPoint',
        'Translation & Transcription', 'Qualitative & Quantitative Research',
        'Media Research', 'Fact Checking', 'Field Monitoring',
        'Literature Review', 'Report & Proposal Writing', 'Data Visualization',
      ],
    },
    workExperience: [
      {
        _key: 'work1',
        company: 'Activate Rights Ltd.',
        role: 'Program & Strategy Lead',
        date: 'Dec 2024 to Present',
        location: 'Dhaka, Bangladesh',
        images: activateImage ? [{ ...activateImage, _key: 'img1' }] : [],
        details: [
          'Leading a diverse team of young digital experts dedicated to advancing digital rights, privacy, surveillance, and censorship.',
          'Advocating for internet freedom and crafting people-first policies for the governance of digital spaces.',
          'Monitoring internet shutdowns in Bangladesh and fighting for uninterrupted access.',
        ],
      },
      {
        _key: 'work2',
        company: 'Centre for Qualitative Research',
        role: 'Research Associate',
        date: 'Jul 2023 to Dec 2024',
        location: 'Dhaka, Bangladesh',
        images: [],
        details: [
          'Led and coordinated a dynamic team of Student Ambassadors, orchestrating training sessions and workshops.',
          'Supervised quantitative and qualitative data from over 15 districts, including the Chittagong Hill Tracts.',
          'Designed mixed-methods research instruments, conducted literature reviews, and crafted strategic project proposals.',
          'Translated and transcribed research tools and interviews (FGD, IDI, KII).',
          'Collaborated effectively with government agencies such as DAE, DoF, DLS, a2i, DSHE.',
        ],
      },
      {
        _key: 'work3',
        company: 'Factstory Agency - AFP Group',
        role: 'Fact Checker',
        date: 'May 2022 to Dec 2022',
        location: 'Paris (Remote)',
        images: [],
        details: [
          'Collaborated with an international team of freelance journalists dedicated to its media research mission.',
          'Fostered communication with the supervisor from France.',
        ],
      },
      {
        _key: 'work4',
        company: 'Center for Integrated Research in Health and Development',
        role: 'Communication Officer',
        date: 'Sep 2021 to Apr 2022',
        location: 'Dhaka, Bangladesh',
        images: [],
        details: [
          'Maintained communication with stakeholders and accompanied the CEO to both indoor and outdoor meetings.',
          'Drafted and analyzed documents, reports, and literature reviews. Created illustrated graphics for web and print.',
        ],
      },
      {
        _key: 'work5',
        company: 'The Joban',
        role: 'Staff Writer',
        date: 'Jan 2018 to Dec 2018',
        location: 'Dhaka, Bangladesh',
        images: [],
        details: [
          'Authored feature content at the specialized news portal Joban.com.',
          'Translated features from various foreign portals and transcribed interviews.',
        ],
      },
    ],
    researchExperience: [
      {
        _key: 'res1',
        organization: 'Save the Children Bangladesh',
        title: 'Strengthening resilience of host communities in Cox\'s Bazar',
        date: 'Oct - Dec 2024',
        location: 'Cox\'s Bazar',
        image: null,
        details: 'Supervised the Qualitative and Quantitative fieldwork in Ukhiya and Teknaf with both Host and Rohingya communities. Facilitated FGDs and KIIs.',
      },
      {
        _key: 'res2',
        organization: 'Digitally Right',
        title: 'Protecting Online Rights of Changemakers',
        date: 'Jun - Jul 2024',
        location: 'Bangladesh',
        image: null,
        details: 'Assessed the awareness of policies and regulations related to the digital domain among youth and women groups. Managed overall data collection and report preparation.',
      },
      {
        _key: 'res3',
        organization: 'Manusher Jonno Foundation',
        title: 'Women\'s Economic Empowerment and Equality Study',
        date: 'Jun - Sep 2024',
        location: 'Dhaka & Bandarban',
        image: null,
        details: 'Conducted Qualitative Data Collection in Dhaka and Bandarban. Managed the Quantitative data collection in Dhaka. Designed the final report and oversaw publication.',
      },
      {
        _key: 'res4',
        organization: 'Global Alliance for Improved Nutrition (GAIN)',
        title: 'Formative research to assess farmers KAP about occupational health',
        date: 'May - Jun 2024',
        location: 'Dinajpur & Jamalpur',
        image: null,
        details: 'Facilitated and checked the collection of qualitative data in Dinajpur and Jamalpur districts. Maintained contact with Upazila Agriculture Office.',
      },
      {
        _key: 'res5',
        organization: 'Manusher Jonno Foundation',
        title: 'Assessment on SBCC and Analysis on Nutrition Governance',
        date: 'Apr - Jun 2024',
        location: 'CHT Region',
        image: null,
        details: 'Fieldwork supervision and management in the three hill districts of Bandarban, Rangamati, and Khagrachari. Co-authored final reports.',
      },
      {
        _key: 'res6',
        organization: 'International Labor Organization (ILO)',
        title: 'Household Survey on Lifelong Learning and Skills Development',
        date: 'Nov - Dec 2023',
        location: 'Dhaka & Rajshahi',
        image: null,
        details: 'Oversaw the collection of quantitative data in Dhaka and Rajshahi. Cleaned quantitative data from over 6000 households.',
      },
    ],
    education: [
      {
        _key: 'edu1',
        degree: 'Master of Social Science in Anthropology',
        institution: 'Jahangirnagar University',
        year: '2023',
      },
      {
        _key: 'edu2',
        degree: 'Bachelor of Social Science in Anthropology',
        institution: 'Jahangirnagar University',
        year: '2022',
      },
    ],
    academic: [
      'Completed a dissertation titled \'Cricket: Shaping Nationalism in Bangladesh\' (6 months).',
      'Participated in three research projects in Bogura, Shreemangal, and Rajshahi.',
      '3-days residential workshop on Misinformation and Fake News offered by MRDI and FOJO Institute, Sweden.',
      'Day long workshop on Monitoring, Evaluation, Research and Learning (MERL) organized by GCFIL.',
    ],
  }

  await client.createOrReplace(doc)
  console.log('\n✓ CV document created at singleton-cv')
  console.log('\nImages missing locally (upload via Studio):')
  console.log('  - experience: cqr, factstory, cirhd, joban')
  console.log('  - research: all 6 projects')
}

seed().catch(err => {
  console.error(err.message)
  process.exit(1)
})
