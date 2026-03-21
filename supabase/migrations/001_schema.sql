-- ============================================================
-- PUSPSAAR PERFUME E-COMMERCE — SUPABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================================

-- ── profiles ──────────────────────────────────────────────
create table if not exists public.profiles (
  id          uuid references auth.users on delete cascade primary key,
  name        text,
  phone       text,
  updated_at  timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name)
  values (new.id, new.raw_user_meta_data ->> 'name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── products ──────────────────────────────────────────────
create table if not exists public.products (
  id               uuid default gen_random_uuid() primary key,
  name             text not null,
  description      text,
  price            numeric(10,2) not null,
  original_price   numeric(10,2),
  category         text check (category in ('Men', 'Women', 'Unisex')) not null,
  brand            text,
  concentration    text check (concentration in ('EDP', 'EDT', 'Parfum', 'EDC')),
  volumes          text[] default '{}',
  images           text[] default '{}',
  stock            int default 0,
  rating           numeric(3,2) default 0,
  rating_count     int default 0,
  fragrance_notes  jsonb default '{"top":[],"middle":[],"base":[]}',
  tags             text[] default '{}',
  is_featured      boolean default false,
  created_at       timestamptz default now()
);

alter table public.products enable row level security;

create policy "Anyone can view products"
  on public.products for select using (true);

-- ── cart_items ────────────────────────────────────────────
create table if not exists public.cart_items (
  id          uuid default gen_random_uuid() primary key,
  user_id     uuid references auth.users on delete cascade not null,
  product_id  uuid references public.products on delete cascade not null,
  quantity    int default 1 check (quantity > 0),
  volume      text,
  created_at  timestamptz default now(),
  unique (user_id, product_id, volume)
);

alter table public.cart_items enable row level security;

create policy "Users can manage own cart"
  on public.cart_items for all using (auth.uid() = user_id);

-- ── orders ────────────────────────────────────────────────
create table if not exists public.orders (
  id             uuid default gen_random_uuid() primary key,
  user_id        uuid references auth.users on delete set null,
  total_amount   numeric(10,2) not null,
  status         text default 'confirmed' check (status in ('confirmed','processing','shipped','delivered','cancelled')),
  shipping_name  text,
  shipping_phone text,
  shipping_address text,
  created_at     timestamptz default now()
);

alter table public.orders enable row level security;

create policy "Users can view own orders"
  on public.orders for select using (auth.uid() = user_id);

create policy "Users can create orders"
  on public.orders for insert with check (auth.uid() = user_id);

-- ── order_items ───────────────────────────────────────────
create table if not exists public.order_items (
  id          uuid default gen_random_uuid() primary key,
  order_id    uuid references public.orders on delete cascade not null,
  product_id  uuid references public.products,
  product_name text not null,
  product_image text,
  volume      text,
  quantity    int not null check (quantity > 0),
  price       numeric(10,2) not null
);

alter table public.order_items enable row level security;

create policy "Users can view own order items"
  on public.order_items for select
  using (exists (
    select 1 from public.orders
    where orders.id = order_items.order_id
    and orders.user_id = auth.uid()
  ));

create policy "Users can insert order items"
  on public.order_items for insert
  with check (exists (
    select 1 from public.orders
    where orders.id = order_items.order_id
    and orders.user_id = auth.uid()
  ));

-- ── addresses ─────────────────────────────────────────────
create table if not exists public.addresses (
  id         uuid default gen_random_uuid() primary key,
  user_id    uuid references auth.users on delete cascade not null,
  label      text default 'Home',
  full_name  text,
  phone      text,
  line1      text,
  line2      text,
  city       text,
  state      text,
  pincode    text,
  is_default boolean default false,
  created_at timestamptz default now()
);

alter table public.addresses enable row level security;

create policy "Users can manage own addresses"
  on public.addresses for all using (auth.uid() = user_id);
