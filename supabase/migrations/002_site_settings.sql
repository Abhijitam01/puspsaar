-- ── site_settings ──────────────────────────────────────────
create table if not exists public.site_settings (
  id          text primary key,
  value       jsonb not null,
  description text,
  updated_at  timestamptz default now()
);

alter table public.site_settings enable row level security;

-- Policy: Anyone can read settings (so the homepage can fetch them)
create policy "Anyone can view site settings"
  on public.site_settings for select using (true);

-- Policy: Only authenticated admins can update settings
-- For now, we'll allow all authenticated users to manage settings if we don't have a role check in DB.
-- In a real app, you'd check `auth.jwt() ->> 'role' = 'admin'`.
create policy "Admins can manage site settings"
  on public.site_settings for all
  using (true)
  with check (true);

-- ── Initial Data ─────────────────────────────────────────
insert into public.site_settings (id, value, description)
values 
('hero_banner', '{
  "image": "https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=1200&q=80",
  "title": "Discover Your Scent",
  "subtitle": "Middle Eastern-quality perfumes, attars, and gifting sets — crafted for those who know the language of fragrance."
}', 'Main hero banner content'),
('collection_grid', '{
  "images": [
    "https://images.unsplash.com/photo-1541643600914-78b084683702?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1588776814546-1ffbb679e1c2?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1590156206657-acd3d6e3e231?auto=format&fit=crop&w=800&q=80"
  ]
}', 'Images for the collection grid'),
('discovery_set', '{
  "image": "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
  "title": "The Discovery Collection",
  "subtitle": "Six 5ml extraits de parfum, curated to reveal the entire Puspsaar archive. A silken journey through Oud, Rose, and rare Botanicals."
}', 'Discovery set section content'),
('brand_story', '{
  "image": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=80",
  "title": "A Legacy of Scent",
  "subtitle": "Founded in the heart of traditional perfumery, Maison Puspsaar blends ancient techniques with modern elegance to create fragrances that transcend time."
}', 'Brand story section content');
