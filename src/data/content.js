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
  scholar: 'https://scholar.google.com/citations?user=tJYMI1kAAAAJ',
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
    slug: 'elevate-black-voices',
    title: 'Elevate Black Voices Globe',
    featured: true,
    color: 'teal',
    description:
      'An interactive globe for HCAI research on how voice tech treats Black speakers: dot clustering, emotion heatmaps, state filters, dark and light modes, and a presentation mode, with a RoBERTa sentiment pipeline behind it.',
    note: 'The research data is confidential, so the public code runs on made-up sample data. Happy to give a live walkthrough.',
    tags: ['React', 'Vite', 'globe.gl', 'Python · RoBERTa'],
    image: '/projects/ebv-globe.jpg',
    link: { label: 'View the code', href: 'https://github.com/Janelle55/AAVE-Voices-Demo' },
    period: 'Apr 2026 to now',
    team: 'Howard HCAI research team, in collaboration with Google',
    role: 'Undergraduate Research Intern. I built the interactive globe app and the sentiment analysis pipeline, and co-authored a section of the research paper.',
    overview:
      'Voice assistants and speech recognition work less well for speakers of African American English, and the way people speak changes from region to region. Our team surveyed Black speakers across the U.S. and needed a way to see where responses came from and how people felt about the technology.',
    built: [
      'An interactive globe in React, Vite, and globe.gl that maps survey respondents across U.S. states, so the team can see regional patterns at a glance.',
      'Dot clustering so respondents in the same area stay readable, plus state filters to focus on one region.',
      'Emotion heatmap overlays, dark and light modes, and a presentation mode for sharing results with the research team.',
      'A Python sentiment analysis pipeline using a fine-tuned RoBERTa model, set up to run fully offline so IRB-protected audio never leaves the machine.',
      'Co-authored a section of an academic paper on HCI bias affecting AAVE speakers.',
    ],
    challenges: [
      'Respondents first showed up clumped in the wrong places on the globe. I traced it to the coordinates and fixed the placement through careful testing until every point landed in the right state.',
      "The first sentiment model's labels didn't match our dataset's emotion categories, so I switched to a RoBERTa model from Hugging Face with broader emotion categories.",
      'The model agreed with human annotators far less often than we expected. That gap supports the research question: models trained mostly on standard English can misread how AAE speakers feel.',
    ],
  },
  {
    slug: 'vibematch',
    title: 'VibeMatch',
    color: 'sky',
    description:
      'A music recommender system with a custom guardrail and reliability layer, an evaluation test harness, and a model card that is honest about its limits.',
    tags: ['Applied AI', 'Evaluation', 'CodePath AI110'],
    link: null,
    period: 'Jun to Aug 2026',
    team: 'Capstone project, CodePath AI Engineering (AI110)',
    role: 'My capstone for CodePath AI Engineering. I designed and documented the full system.',
    overview:
      'A music recommender built to show what a responsible applied AI system looks like: not just a model, but checks, tests, and honest documentation around it.',
    built: [
      'The music recommender system at the center of the project.',
      'A guardrail and reliability layer that checks requests and responses before they reach the user.',
      'An evaluation test harness to measure how the system behaves across many test cases.',
      'An architecture diagram showing how the pieces connect.',
      'A model card documenting what the system does well, where it falls short, and how it should be used.',
      'A presentation deck for the capstone showcase.',
    ],
    challenges: [],
  },
  {
    slug: 'finreq',
    title: 'FinReq',
    color: 'gold',
    inProgress: true,
    description: 'A university financial request management system my Senior Project team (Group 3) is building now.',
    tags: ['TanStack Start', 'Supabase', 'Cloudflare', 'Team project'],
    link: null,
    period: 'Fall 2026, in progress',
    team: 'Senior Project II, Group 3, Howard University',
    role: null,
    overview:
      'A system for submitting, tracking, and approving financial requests at a university.',
    built: [
      'Deliverable 1: a project reset and architecture baseline for the codebase.',
      'Built on TanStack Start, Supabase, and Cloudflare, starting from a Lovable.dev prototype.',
    ],
    challenges: [],
  },
  {
    slug: 'portfolio',
    title: 'This portfolio',
    color: 'pink',
    inProgress: true,
    description:
      "The page you're on: a spinning globe of my journey and a private admin dashboard where I publish projects and events without touching code.",
    tags: ['React', 'Vite', 'Supabase', 'globe.gl'],
    link: { label: 'View the code', href: 'https://github.com/Janelle55/portfolio' },
    period: 'Oct 2026 to now',
    team: 'Personal project',
    role: 'I planned every feature and design choice, and set up the hosting, database, and security.',
    overview:
      'I wanted a portfolio that feels like me: the sea and sky, gold, roses, food, and music, while still giving recruiters what they need in the first ten seconds.',
    built: [
      'A real 3D globe (globe.gl and three.js) that draws my route from Accra to Washington, D.C.',
      'Day and night themes that follow your device setting and remember your choice.',
      'A Supabase database with row level security, so visitors can only read published content and only my account can edit.',
      'A private admin dashboard to add, edit, reorder, publish, and delete projects, events, food, and music, with photo uploads that shrink large phone pictures automatically.',
      'Automatic deploys: every update pushed to GitHub goes live on Vercel within about a minute.',
      'A fallback so the homepage still works with built-in content if the database is ever paused.',
    ],
    challenges: [],
  },
];

// Strongest first. Only list what you can talk about in an interview.
export const skills = ['Python', 'NLP · RoBERTa', 'AWS', 'Supabase', 'Claude API', 'React'];

export const research = [
  {
    when: 'Apr 2026 to now',
    title: 'Elevate Black Voices × Google',
    text: 'Speech recognition disparities for African American English speakers. Built the research team\'s interactive globe and an offline RoBERTa sentiment pipeline, and co-authored a section of a paper on HCI bias affecting AAVE speakers.',
    link: { label: 'See the project', href: '/projects/elevate-black-voices' },
  },
  {
    when: 'June 2026',
    title: 'Published paper, ACM FAccT 2026',
    text: 'Nias, Aryal, Campbell, Cooper, Douglass, and Yankey. "Adinkra Symbols through Generative AI: A Semiotic Analysis of Emoji-Based Translation." The 2026 ACM Conference on Fairness, Accountability, and Transparency (FAccT), 1340–1354. I verified the accuracy of the research data as a Fante and Twi speaker.',
    link: { label: 'Read the paper', href: 'https://doi.org/10.1145/3805689.3806725' },
  },
  {
    when: 'May 2026',
    title: 'Published paper, AAAI 2026 Spring Symposium',
    text: 'Nias, Campbell, Yankey, and Douglass. "CARE: Culturally Aligned AI for Reflective Creativity Through Adinkra Semiotic Knowledge." Proceedings of the AAAI Symposium Series, 8(1), 706–714. I verified the accuracy of the research data as a Fante and Twi speaker.',
    link: { label: 'Read the paper', href: 'https://doi.org/10.1609/aaaiss.v8i1.42610' },
  },
  {
    when: 'Apr 2025 to Mar 2026',
    title: 'ONR-funded TADMUS project',
    text: 'Annotated 198 LLM threat-assessment responses across RAG and non-RAG conditions, rated AI-generated image augmentations of a 98-image U.S. Navy vessel dataset with a five-criteria system, and analyzed user trust in human-AI interaction.',
    link: null,
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
    text: 'Co-authored CARE, published in the Proceedings of the AAAI Symposium Series. It uses Adinkra symbols and proverbs to guide generative AI. I verified every entry in the data sheet as a Fante and Twi speaker.',
    photo: null,
    photoColor: 'gold',
    link: { label: 'Read the paper', href: 'https://doi.org/10.1609/aaaiss.v8i1.42610' },
  },
  {
    badge: ['Hacker'],
    year: '2025',
    place: 'Howard University',
    when: 'March 2025',
    title: 'BisonBytes Hackathon',
    text: 'Built MedTrack, a health monitoring app, in 24 hours. Learned to plan fast, split the work, and ship something real under pressure.',
    photo: '/events/bisonbytes-2025.jpg',
    photoColor: 'teal',
    link: { label: 'See MedTrack on Devpost', href: 'https://devpost.com/software/medtrack-zkfu5r' },
  },
];

// Akokua's Table: add real entries, e.g. { course: 'Made at home', name: 'Jollof rice' }
// The menu list is hidden while this is empty.
export const table = [];

export const music = {
  artists: ['Sienna', 'Odeal', 'King Promise', 'Cardi B'],
  genres: ['Afrobeats', 'R&B', 'Hip-hop'],
};
