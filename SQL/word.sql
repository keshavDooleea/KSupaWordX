CREATE TABLE words (
    id uuid not null primary key default uuid_generate_v4(),
    user_id uuid not null references profiles on delete cascade default auth.uid(),
    word VARCHAR(50) unique,
    category_type int4,
    language_type int2,
    is_processing boolean default true
);

CREATE TABLE urls (
    id uuid not null primary key default uuid_generate_v4(),
    word_id uuid not null references words on delete cascade,
    url VARCHAR(255)
);

alter table words
  enable row level security;

alter table urls
  enable row level security;

create policy "Users can perform all actions on their own words." 
    on words
    for all 
    to authenticated
    using (auth.uid() = user_id) 
    with check (auth.uid() = user_id);

create policy "Users can perform all actions on their own word urls." 
    on urls
    for all 
    to authenticated
    using (auth.uid() in (
        select user_id from words
        where word_id = id
    )) 
    with check (auth.uid() in (
        select user_id from words
        where word_id = id
    ));