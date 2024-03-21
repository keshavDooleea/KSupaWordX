create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  created_at timestamp default now(),
  updated_at timestamp with time zone
);

alter table profiles
  enable row level security;

create policy "Users can perform all actions on their own profile." 
    on profiles
    for all 
    to authenticated
    using (auth.uid() = id) 
    with check (auth.uid() = id);

create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();