// All site content lives here for now.
// In stage 3 this moves into Supabase so the admin dashboard can edit it.
// Anything set to null or left empty is hidden on the site until you fill it in.

export const profile = {
  fullName: { first: 'Janelle Nana', middle: 'Akokua', last: 'Yankey' },
  shortName: 'Janelle Yankey',
  places: 'Accra · Washington, D.C.',
  tagline: 'Soft at heart. Fierce about the work.',
  pitch:
    'Computer Science at Howard and researcher at the Human-Centered AI Institute, building AI that truly hears the people it serves.',
  status: 'Graduating May 2027 · Available January 2027',
  resumeUrl: '/resume.pdf',
  // Add the email you want public, e.g. 'name@example.com'. Hidden while null.
  email: null,
  linkedin: 'https://linkedin.com/in/janelle-yankey',
  github: 'https://github.com/Janelle55',
  availability:
    'Open to internships, co-ops, early-career programs, and new-grad roles starting January 2027. Happy to relocate.',
};

export const journey = [
  { label: 'Accra', lat: 5.6, lng: -0.2 },
  { label: 'Washington, D.C.', lat: 38.9, lng: -77.0 },
];

// image: put a screenshot in public/projects/ and set e.g. image: '/projects/ebv.png'
// link: set to null to hide the button until there is somewhere to send people
export const projects = [
  {
    title: 'Elevate Black Voices Globe',
    featured: true,
    color: 'teal',
    description:
      'An interactive globe for HCAI research on how voice tech treats Black speakers: dot clustering, emotion heatmaps, state filters, dark and light modes, and a presentation mode, with a RoBERTa sentiment pipeline behind it.',
    note: "Research data is confidential, so I'm happy to give a live walkthrough instead.",
    tags: ['React', 'Vite', 'globe.gl', 'Python · RoBERTa'],
    image: null,
    link: null,
  },
  {
    title: 'VibeMatch',
    color: 'sky',
    description:
      "An applied AI system with a guardrail and reliability layer, an evaluation test harness, and a model card that's honest about its limits.",
    tags: ['Applied AI', 'Evaluation', 'CodePath AI110'],
    link: null,
  },
  {
    title: 'FinReq',
    color: 'gold',
    inProgress: true,
    description:
      'A university financial request management system my Senior Project team (Group 3) is building now.',
    tags: ['TanStack Start', 'Supabase', 'Cloudflare', 'Team project'],
    link: null,
  },
  {
    title: 'This portfolio',
    color: 'pink',
    inProgress: true,
    description:
      "The page you're on: a spinning globe of my journey and a private admin dashboard where I publish projects and events without touching code.",
    tags: ['React', 'Vite', 'Supabase', 'globe.gl'],
    link: { label: 'View the code', href: 'https://github.com/Janelle55' },
  },
];

// Strongest first. Only list what you can talk about in an interview.
export const skills = ['Python', 'NLP · RoBERTa', 'AWS', 'Supabase', 'Claude API', 'React'];

export const research = [
  {
    when: 'Apr 2026 to now',
    title: 'Elevate Black Voices × Google',
    text: 'Speech recognition disparities for African American English speakers. Co-authored a section of a paper on HCI bias affecting AAVE speakers.',
  },
  {
    when: 'Spring 2026',
    title: 'Co-author, AAAI 2026 Spring Symposium',
    text: '"CARE: Culturally Aligned AI for Reflective Creativity Through Adinkra Semiotic Knowledge." Verified the accuracy of the research data as a Fante and Twi speaker.',
  },
  {
    when: 'Apr 2025 to Mar 2026',
    title: 'ONR-funded project',
    text: '198 LLM threat-assessment annotations, plus structured dataset entries using the Datasheets for Datasets framework.',
  },
];

export const certifications = [
  'AWS Cloud Practitioner',
  'CodePath AI Engineering',
  'CodePath Cybersecurity',
  'CodePath Technical Interview Prep',
  'Anthropic AI Fluency',
  'Anthropic Claude 101',
  'Cisco Packet Tracer',
];

// photo: put an image in public/events/ and set e.g. photo: '/events/admi.jpg'
export const events = [
  {
    badge: ['Poster', 'presenter'],
    year: '2026',
    place: 'Orangeburg, SC',
    when: 'March 2026',
    title: 'ADMI Symposium 2026',
    text: 'Presented two research posters with my HCAI team on evaluating LLM outputs and using generative AI to improve image quality. I supported both projects with data labeling and coordination, helping keep the research organized and accurate.',
    photo: null,
    photoColor: 'sky',
    link: {
      label: 'Read my LinkedIn post',
      href: 'https://www.linkedin.com/feed/update/urn:li:activity:7458002252692193281/',
    },
  },
  {
    badge: ['Co-', 'author'],
    year: '2026',
    place: 'AAAI Spring Symposium',
    when: 'Spring 2026',
    title: 'AAAI 2026 Spring Symposium',
    text: 'Co-authored CARE, research on conditioning generative AI with Adinkra symbols. I verified every entry in the data sheet as a Fante and Twi speaker.',
    photo: null,
    photoColor: 'gold',
    link: { label: 'See the post', href: 'https://www.linkedin.com/in/janelle-yankey/recent-activity/all/' },
  },
  {
    badge: ['Hacker'],
    year: '2025',
    place: 'Howard University',
    when: '2025',
    title: 'BisonBytes Hackathon',
    text: 'Built MedTrack, a health monitoring app, in 24 hours. Learned to plan fast, split the work, and ship something real under pressure.',
    photo: null,
    photoColor: 'teal',
    link: null,
  },
];

// Akokua's Table: add real entries, e.g. { course: 'Made at home', name: 'Jollof rice' }
// The menu list is hidden while this is empty.
export const table = [];

export const music = {
  artists: ['Sienna', 'Odeal', 'King Promise', 'Cardi B'],
  genres: ['Afrobeats', 'R&B', 'Hip-hop'],
};
