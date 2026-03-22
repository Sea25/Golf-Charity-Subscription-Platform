-- ==========================================
-- DANGER: Drops existing tables and types.
-- Only run this on a fresh test database!
-- ==========================================

-- Drop Triggers and Functions first
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user cascade;
drop trigger if exists trg_maintain_five_scores on public.scores;
drop function if exists public.maintain_latest_five_scores cascade;

-- Drop Tables in reverse order of relationships
drop table if exists public.winners cascade;
drop table if exists public.draws cascade;
drop table if exists public.scores cascade;
drop table if exists public.subscriptions cascade;
drop table if exists public.profiles cascade;
drop table if exists public.charities cascade;

-- Drop Custom Types
drop type if exists payout_status cascade;
drop type if exists match_type cascade;
drop type if exists draw_type cascade;
drop type if exists draw_status cascade;
drop type if exists subscription_plan cascade;
drop type if exists subscription_status cascade;
drop type if exists user_role cascade;

-- ==========================================
-- SCHEMA CREATION
-- ==========================================

create extension if not exists "uuid-ossp";

-- 1. Charities Table
create table public.charities (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    description text not null,
    image_url text, 
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    featured boolean default false 
);

-- 2. User Profiles Table
create type user_role as enum ('user', 'admin'); 

create table public.profiles (
    id uuid references auth.users(id) on delete cascade primary key,
    role user_role default 'user'::user_role,
    full_name text,
    email text not null,
    charity_id uuid references public.charities(id),
    charity_percentage numeric default 10.0 check (charity_percentage >= 10.0 and charity_percentage <= 100.0), 
    stripe_customer_id text, 
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. Subscriptions Table
create type subscription_status as enum ('active', 'past_due', 'canceled', 'unpaid', 'incomplete', 'incomplete_expired', 'trialing');
create type subscription_plan as enum ('monthly', 'yearly');

create table public.subscriptions (
    id text primary key, 
    user_id uuid references public.profiles(id) on delete cascade not null,
    status subscription_status not null,
    plan_type subscription_plan not null,
    current_period_start timestamp with time zone not null,
    current_period_end timestamp with time zone not null,
    cancel_at_period_end boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Scores Table
create table public.scores (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.profiles(id) on delete cascade not null,
    score integer not null check (score >= 1 and score <= 45), 
    played_date date not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enforce "Only latest 5 scores playing logic"
create or replace function maintain_latest_five_scores()
returns trigger as $$
begin
  delete from public.scores
  where user_id = new.user_id
    and id not in (
      select id from public.scores
      where user_id = new.user_id
      order by played_date desc, created_at desc
      limit 5
    );
  return new;
end;
$$ language plpgsql;

create trigger trg_maintain_five_scores
  after insert or update on public.scores
  for each row execute procedure maintain_latest_five_scores();

-- 5. Draws Table
create type draw_status as enum ('draft', 'simulated', 'published');
create type draw_type as enum ('random', 'algorithmic');

create table public.draws (
    id uuid default uuid_generate_v4() primary key,
    month integer not null check (month >= 1 and month <= 12),
    year integer not null,
    status draw_status default 'draft'::draw_status,
    draw_type draw_type default 'random'::draw_type,
    winning_score_1 integer check (winning_score_1 >= 1 and winning_score_1 <= 45),
    winning_score_2 integer check (winning_score_2 >= 1 and winning_score_2 <= 45),
    winning_score_3 integer check (winning_score_3 >= 1 and winning_score_3 <= 45),
    winning_score_4 integer check (winning_score_4 >= 1 and winning_score_4 <= 45),
    winning_score_5 integer check (winning_score_5 >= 1 and winning_score_5 <= 45),
    total_prize_pool numeric(10,2) default 0.00,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    executed_at timestamp with time zone
);

-- 6. Winners Table
create type match_type as enum ('5_match', '4_match', '3_match');
create type payout_status as enum ('pending', 'verified', 'paid', 'rejected');

create table public.winners (
    id uuid default uuid_generate_v4() primary key,
    draw_id uuid references public.draws(id) on delete cascade not null,
    user_id uuid references public.profiles(id) on delete cascade not null,
    match_type match_type not null,
    prize_amount numeric(10,2) not null,
    status payout_status default 'pending'::payout_status,
    proof_url text, 
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
