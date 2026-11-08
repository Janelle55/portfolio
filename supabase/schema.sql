-- Portfolio database setup.
-- Run this once in Supabase: SQL Editor > New query > paste > Run.
-- Visitors can only READ published items. Only the owner email below can add, edit, or delete.

-- ---------- Owner check ----------
create or replace function public.is_owner()
returns boolean
language sql stable
as $$
  select coalesce((auth.jwt() ->> 'email') = 'janelleakokuayankey@gmail.com', false);
$$;

-- ---------- Tables ----------
create table if not exists public.projects (
  id bigint generated always as identity primary key,
  title text not null,
  description text not null default '',
  note text,
  tags text[] not null default '{}',
  color text not null default 'teal' check (color in ('teal','sky','gold','pink')),
  featured boolean not null default false,
  in_progress boolean not null default false,
  link_label text,
  link_href text,
  image_url text,
  sort_order int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.events (
  id bigint generated always as identity primary key,
  title text not null,
  when_text text not null default '',
  year text not null default '',
  place text not null default '',
  badge text not null default '',
  description text not null default '',
  photo_url text,
  photo_color text not null default 'sky' check (photo_color in ('sky','gold','teal')),
  link_label text,
  link_href text,
  sort_order int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.table_items (
  id bigint generated always as identity primary key,
  course text not null default 'Made at home',
  name text not null,
  image_url text,
  sort_order int not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.music_artists (
  id bigint generated always as identity primary key,
  name text not null,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value text
);

-- Added later: food photos for Akokua's Table (safe to run on an existing database)
alter table public.table_items add column if not exists image_url text;

-- Added later: project detail pages
alter table public.projects add column if not exists slug text;
alter table public.projects add column if not exists period text;
alter table public.projects add column if not exists team text;
alter table public.projects add column if not exists my_role text;
alter table public.projects add column if not exists overview text;
alter table public.projects add column if not exists built text;
alter table public.projects add column if not exists challenges text;
create unique index if not exists projects_slug_key on public.projects (slug);

-- ---------- Row level security ----------
alter table public.projects enable row level security;
alter table public.events enable row level security;
alter table public.table_items enable row level security;
alter table public.music_artists enable row level security;
alter table public.site_settings enable row level security;

do $$
declare t text;
begin
  foreach t in array array['projects','events','table_items','music_artists'] loop
    execute format('drop policy if exists "read published" on public.%I', t);
    execute format('create policy "read published" on public.%I for select using (published or public.is_owner())', t);
    execute format('drop policy if exists "owner writes" on public.%I', t);
    execute format('create policy "owner writes" on public.%I for all using (public.is_owner()) with check (public.is_owner())', t);
  end loop;
end $$;

drop policy if exists "read settings" on public.site_settings;
create policy "read settings" on public.site_settings for select using (true);
drop policy if exists "owner writes settings" on public.site_settings;
create policy "owner writes settings" on public.site_settings for all using (public.is_owner()) with check (public.is_owner());

-- ---------- File storage (photos, screenshots, resume) ----------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "owner uploads media" on storage.objects;
create policy "owner uploads media" on storage.objects for insert with check (bucket_id = 'media' and public.is_owner());
drop policy if exists "owner updates media" on storage.objects;
create policy "owner updates media" on storage.objects for update using (bucket_id = 'media' and public.is_owner());
drop policy if exists "owner deletes media" on storage.objects;
create policy "owner deletes media" on storage.objects for delete using (bucket_id = 'media' and public.is_owner());

-- ---------- Starting content (only added if the tables are empty) ----------
insert into public.projects (title, description, note, tags, color, featured, in_progress, link_label, link_href, sort_order, published)
select * from (values
  ('Elevate Black Voices Globe',
   'An interactive globe for HCAI research on how voice tech treats Black speakers: dot clustering, emotion heatmaps, state filters, dark and light modes, and a presentation mode, with a RoBERTa sentiment pipeline behind it.',
   'Research data is confidential, so I''m happy to give a live walkthrough instead.',
   array['React','Vite','globe.gl','Python · RoBERTa'], 'teal', true, false, null, null, 1, true),
  ('VibeMatch',
   'An applied AI system with a guardrail and reliability layer, an evaluation test harness, and a model card that''s honest about its limits.',
   null, array['Applied AI','Evaluation','CodePath AI110'], 'sky', false, false, null, null, 2, true),
  ('FinReq',
   'A university financial request management system my Senior Project team (Group 3) is building now.',
   null, array['TanStack Start','Supabase','Cloudflare','Team project'], 'gold', false, true, null, null, 3, true),
  ('This portfolio',
   'The page you''re on: a spinning globe of my journey and a private admin dashboard where I publish projects and events without touching code.',
   null, array['React','Vite','Supabase','globe.gl'], 'pink', false, true, 'View the code', 'https://github.com/Janelle55/portfolio', 4, true),
  ('Weather Outfit Picker',
   'Recommends outfits from local weather using the Claude API.',
   null, array['React','Express.js','Claude API'], 'sky', false, true, null, null, 5, false),
  ('MedTrack',
   'A health monitoring app built in 24 hours at BisonBytes Hackathon 2025.',
   null, array['Hackathon'], 'gold', false, false, null, null, 6, false)
) as v
where not exists (select 1 from public.projects);

insert into public.events (title, when_text, year, place, badge, description, photo_color, link_label, link_href, sort_order, published)
select * from (values
  ('ADMI Symposium 2026', 'March 2026', '2026', 'Orangeburg, SC', 'Poster presenter',
   'Presented two research posters with my HCAI team on evaluating LLM outputs and using generative AI to improve image quality. I supported both projects with data labeling and coordination, helping keep the research organized and accurate.',
   'sky', 'Read my LinkedIn post', 'https://www.linkedin.com/feed/update/urn:li:activity:7458002252692193281/', 1, true),
  ('AAAI 2026 Spring Symposium', 'Spring 2026', '2026', 'AAAI Spring Symposium', 'Co-author',
   'Co-authored CARE, research on conditioning generative AI with Adinkra symbols. I verified every entry in the data sheet as a Fante and Twi speaker.',
   'gold', 'See the post', 'https://www.linkedin.com/in/janelle-yankey/recent-activity/all/', 2, true),
  ('BisonBytes Hackathon', '2025', '2025', 'Howard University', 'Hacker',
   'Built MedTrack, a health monitoring app, in 24 hours. Learned to plan fast, split the work, and ship something real under pressure.',
   'teal', null, null, 3, true)
) as v
where not exists (select 1 from public.events);

insert into public.music_artists (name, sort_order, published)
select * from (values ('Sienna',1,true),('Odeal',2,true),('King Promise',3,true),('Cardi B',4,true)) as v
where not exists (select 1 from public.music_artists);

insert into public.site_settings (key, value) values
  ('status', 'Graduating May 2027 · Available January 2027'),
  ('availability', 'Open to internships, co-ops, early-career programs, and new-grad roles starting January 2027. Happy to relocate.'),
  ('email', null),
  ('resume_url', '/resume.pdf'),
  ('genres', 'Afrobeats, R&B, Hip-hop')
on conflict (key) do nothing;
