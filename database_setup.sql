-- ================================================================
-- SEDAP MANAGEMENT SYSTEM — COMPLETE DATABASE SETUP (FIXED)
-- Jalankan script ini di: Supabase Dashboard → SQL Editor → New Query
-- Jalankan SELURUHNYA sekaligus (Ctrl+A lalu Run)
-- ================================================================

-- ============================================
-- 1. ENUM TYPES
-- ============================================
do $$ begin
  create type user_role as enum ('admin', 'staff', 'member', 'pending');
exception when duplicate_object then
  -- Jika sudah ada, coba tambahkan nilai 'member' jika belum ada
  begin
    alter type user_role add value if not exists 'member';
  exception when others then null;
  end;
end $$;

do $$ begin
  create type order_status as enum ('draft', 'pending', 'paid', 'completed', 'cancelled');
exception when duplicate_object then null;
end $$;

-- ============================================
-- 2. TABEL PROFILES
-- ============================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role user_role not null default 'pending',
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- 3. TABEL TIERS
-- ============================================
create table if not exists public.tiers (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  min_points integer not null default 0,
  benefit_description text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- Seed data tiers (tidak error jika sudah ada)
insert into public.tiers (name, min_points, sort_order, benefit_description) values
  ('Bronze',   0,    1, 'Tier dasar untuk semua customer baru'),
  ('Silver',   500,  2, 'Diskon 5% untuk pembelian berikutnya'),
  ('Gold',     2000, 3, 'Diskon 10% + prioritas layanan')
on conflict (name) do nothing;

-- ============================================
-- 4. TABEL CUSTOMERS
-- (Ditambahkan kolom auth_id untuk Portal Member)
-- ============================================
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid unique references auth.users(id) on delete set null, -- Link ke akun login member
  name text not null,
  email text unique,
  phone text,
  address text,
  total_points integer not null default 0,
  tier_id uuid references public.tiers(id) default null,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Tambahkan kolom auth_id jika tabel sudah ada tapi kolom belum ada
alter table public.customers add column if not exists auth_id uuid unique references auth.users(id) on delete set null;

create index if not exists idx_customers_tier on public.customers(tier_id);

-- ============================================
-- 5. TABEL PRODUCTS
-- ============================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sku text unique,
  price numeric(12,2) not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  description text,
  category text,
  image_url text,
  is_active boolean not null default true,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================
-- 6. TABEL ORDERS
-- ============================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_id uuid not null references public.customers(id),
  status order_status not null default 'draft',
  total_amount numeric(12,2) not null default 0 check (total_amount >= 0),
  points_earned integer not null default 0,
  notes text,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_orders_customer on public.orders(customer_id);
create index if not exists idx_orders_status on public.orders(status);

-- ============================================
-- 7. TABEL ORDER_ITEMS
-- ============================================
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null check (unit_price >= 0),
  subtotal numeric(12,2) not null check (subtotal >= 0),
  created_at timestamptz not null default now()
);

create index if not exists idx_order_items_order on public.order_items(order_id);
create index if not exists idx_order_items_product on public.order_items(product_id);

-- ============================================
-- 8. TABEL POINT_TRANSACTIONS
-- ============================================
create table if not exists public.point_transactions (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id),
  order_id uuid references public.orders(id),
  points integer not null,
  type text not null check (type in ('earn', 'redeem', 'adjustment')),
  description text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create index if not exists idx_point_tx_customer on public.point_transactions(customer_id);

-- ============================================
-- 9. FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update kolom updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

drop trigger if exists trg_customers_updated_at on public.customers;
create trigger trg_customers_updated_at before update on public.customers
  for each row execute function public.set_updated_at();

drop trigger if exists trg_products_updated_at on public.products;
create trigger trg_products_updated_at before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists trg_orders_updated_at on public.orders;
create trigger trg_orders_updated_at before update on public.orders
  for each row execute function public.set_updated_at();

-- Proses poin & tier saat order completed
create or replace function public.handle_order_completed()
returns trigger as $$
declare
  v_points integer;
  v_new_total integer;
  v_new_tier uuid;
begin
  if new.status = 'completed' and (old.status is distinct from 'completed') then
    v_points := floor(new.total_amount / 10000);

    if v_points > 0 then
      insert into public.point_transactions (customer_id, order_id, points, type, description, created_by)
      values (new.customer_id, new.id, v_points, 'earn', 'Poin dari pesanan ' || new.order_number, new.created_by);

      new.points_earned := v_points;

      update public.customers
      set total_points = total_points + v_points
      where id = new.customer_id
      returning total_points into v_new_total;

      select id into v_new_tier
      from public.tiers
      where min_points <= v_new_total
      order by min_points desc
      limit 1;

      update public.customers set tier_id = v_new_tier where id = new.customer_id;
    end if;
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_order_completed on public.orders;
create trigger trg_order_completed
  before update on public.orders
  for each row execute function public.handle_order_completed();

-- ============================================
-- 10. HELPER FUNCTIONS UNTUK RLS
-- ============================================
create or replace function public.is_admin()
returns boolean as $$
  select coalesce((select role = 'admin' and is_active from public.profiles where id = auth.uid()), false);
$$ language sql stable security definer;

create or replace function public.is_active_staff()
returns boolean as $$
  select coalesce((select is_active and role in ('admin', 'staff') from public.profiles where id = auth.uid()), false);
$$ language sql stable security definer;

-- ============================================
-- 11. ROW LEVEL SECURITY — DIMATIKAN
-- (Karena project ini belum menggunakan RLS)
-- Hapus comment di bawah ini jika ingin mengaktifkan RLS
-- ============================================

-- alter table public.profiles disable row level security;
-- alter table public.customers disable row level security;
-- alter table public.products disable row level security;
-- alter table public.orders disable row level security;
-- alter table public.order_items disable row level security;
-- alter table public.tiers disable row level security;
-- alter table public.point_transactions disable row level security;
