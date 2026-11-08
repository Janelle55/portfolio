// Describes each editable section: which table it lives in and which fields the form shows.
// Field types: text, textarea, url, select, checkbox, tags (comma-separated), image (upload)

export const OWNER_EMAIL = 'janelleakokuayankey@gmail.com';

export const SECTIONS = {
  projects: {
    table: 'projects',
    label: 'Projects',
    hint: 'Publish, hide, or feature the work on your homepage.',
    addLabel: 'Add a project',
    swatch: (r) => ({ teal: '#00B3B0', sky: '#6CC4F5', gold: '#F6DD95', pink: '#FF9CC5' })[r.color] || '#E8DFD0',
    subtitle: (r) => [r.featured && 'Featured', r.in_progress && 'In progress', (r.tags || []).slice(0, 3).join(', ')]
      .filter(Boolean)
      .join(' · '),
    fields: [
      { key: 'title', label: 'Title', type: 'text', required: true, placeholder: 'e.g. Weather Outfit Picker' },
      { key: 'description', label: 'Short description', type: 'textarea', placeholder: 'One or two sentences visitors will read' },
      { key: 'note', label: 'Small note (optional)', type: 'text', placeholder: 'e.g. Data is confidential; live walkthrough on request' },
      { key: 'tags', label: 'Tags, separated by commas', type: 'tags', placeholder: 'React, Python, Claude API' },
      { key: 'color', label: 'Card color', type: 'select', options: ['teal', 'sky', 'gold', 'pink'] },
      { key: 'link_label', label: 'Button text', type: 'text', placeholder: 'e.g. View the code' },
      { key: 'link_href', label: 'Button link', type: 'url', placeholder: 'https://' },
      { key: 'image_url', label: 'Screenshot', type: 'image' },
      { key: 'slug', label: 'Page address (letters and dashes)', type: 'text', placeholder: 'Leave empty to make one from the title' },
      { key: 'period', label: 'When', type: 'text', placeholder: 'e.g. Jun to Aug 2026' },
      { key: 'team', label: 'Team or setting', type: 'text', placeholder: 'e.g. Capstone project, CodePath AI110' },
      { key: 'my_role', label: 'My role', type: 'textarea', placeholder: 'What you were responsible for' },
      { key: 'overview', label: 'The problem (detail page)', type: 'textarea', placeholder: 'What problem this solves and for whom' },
      { key: 'built', label: 'What I built (one point per line)', type: 'textarea', placeholder: 'One feature or contribution per line' },
      { key: 'challenges', label: 'Challenges I worked through (one per line, optional)', type: 'textarea' },
      { key: 'featured', label: 'Feature at the top (big card)', type: 'checkbox' },
      { key: 'in_progress', label: 'Show "In progress" tag', type: 'checkbox' },
    ],
    blank: { color: 'teal', tags: [], featured: false, in_progress: false },
  },
  events: {
    table: 'events',
    label: 'Events',
    hint: 'Conferences, symposiums, hackathons, and communities.',
    addLabel: 'Add an event',
    swatch: (r) => ({ sky: '#8FD0F5', gold: '#F6DD95', teal: '#00B3B0' })[r.photo_color] || '#E8DFD0',
    subtitle: (r) => [r.when_text, r.badge].filter(Boolean).join(' · '),
    fields: [
      { key: 'title', label: 'Event name', type: 'text', required: true, placeholder: 'e.g. Grace Hopper Celebration 2027' },
      { key: 'when_text', label: 'Date shown on the card', type: 'text', placeholder: 'e.g. March 2026' },
      { key: 'year', label: 'Big year on the cover', type: 'text', placeholder: 'e.g. 2026' },
      { key: 'place', label: 'Place on the cover', type: 'text', placeholder: 'e.g. Orangeburg, SC' },
      { key: 'badge', label: 'Your role (gold medal)', type: 'text', placeholder: 'e.g. Poster presenter' },
      { key: 'description', label: 'What you did', type: 'textarea', placeholder: 'One or two sentences' },
      { key: 'photo_color', label: 'Cover color', type: 'select', options: ['sky', 'gold', 'teal'] },
      { key: 'photo_url', label: 'Event photo', type: 'image' },
      { key: 'link_label', label: 'Link text', type: 'text', placeholder: 'e.g. Read my LinkedIn post' },
      { key: 'link_href', label: 'Link', type: 'url', placeholder: 'https://' },
    ],
    blank: { photo_color: 'sky' },
  },
  table_items: {
    table: 'table_items',
    label: "Akokua's Table",
    hint: 'Dishes you made, places you loved, and places on your list.',
    addLabel: "Add to Akokua's Table",
    swatch: () => '#FF9CC5',
    subtitle: (r) => r.course,
    fields: [
      { key: 'name', label: 'Dish or restaurant', type: 'text', required: true, placeholder: 'e.g. Jollof rice' },
      { key: 'course', label: 'Section', type: 'select', options: ['Made at home', 'Tried and loved', 'On my list'] },
      { key: 'image_url', label: 'Photo of the food', type: 'image' },
    ],
    blank: { course: 'Made at home' },
  },
  music_artists: {
    table: 'music_artists',
    label: 'Music',
    hint: 'Artists in your On repeat list.',
    addLabel: 'Add an artist',
    swatch: () => '#2A1F45',
    subtitle: () => 'Artist',
    fields: [{ key: 'name', label: 'Artist name', type: 'text', required: true, placeholder: 'e.g. King Promise' }],
    blank: {},
  },
};

export const SETTINGS_FIELDS = [
  { key: 'status', label: 'Status pill under your pitch', type: 'text', placeholder: 'Graduating May 2027 · Available January 2027' },
  { key: 'availability', label: 'Footer availability line', type: 'textarea' },
  { key: 'email', label: 'Public email (leave empty to hide)', type: 'text', placeholder: 'name@example.com' },
  { key: 'genres', label: 'Music genres, separated by commas', type: 'text', placeholder: 'Afrobeats, R&B, Hip-hop' },
];
