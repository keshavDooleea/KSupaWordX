-- ENUMS
create type language as enum (
  'en',
  'fr'
);


-- TABLES
CREATE TABLE words (
    id uuid not null primary key default uuid_generate_v4(),
    word VARCHAR(50) not null,
    lang language not null
);

alter table words
  add constraint word_lang_constraint unique (word, lang);

CREATE TABLE user_word_urls (
    id uuid not null primary key default uuid_generate_v4(),
    word_id uuid not null references words on delete cascade,
    user_id uuid not null references profiles on delete cascade default auth.uid(),
    custom_word_url VARCHAR(255)
);

CREATE TABLE dict_urls (
    id uuid not null primary key default uuid_generate_v4(),
    dict_name VARCHAR(50) unique not null,
    dict_url VARCHAR(255) unique not null,
    lang language not null
);


-- RLS
alter table words
  enable row level security;

alter table user_word_url
  enable row level security;

alter table dict_urls
  enable row level security;


-- POLICIES
create policy "Users can perform all actions on their own word URLS." 
    on user_word_url
    for all 
    to authenticated
    using (auth.uid() = user_id) 
    with check (auth.uid() = user_id);
   
create policy "Users can read all dictionnary URLS." 
    on dict_urls
    for select 
    to authenticated
    using (true); 


-- DEFAULT INSERTIONS
insert into dict_urls (dict_name, dict_url, lang) values
  (
    'Dictionary',
    'https://www.dictionary.com/browse/',
    'en'
  ),
  (
    'Oxford Learner',
    'https://www.oxfordlearnersdictionaries.com/definition/english/',
    'en'
  ),
  (
    'Collins',
    'https://www.collinsdictionary.com/dictionary/english/',
    'en'
  ),
  (
    'LeRobert',
    'https://dictionnaire.lerobert.com/definition/',
    'fr'
  ),
  (
    'Linternaute',
    'https://www.linternaute.fr/dictionnaire/fr/definition/',
    'fr'
  ),
  (
    'Larousse',
    'https://www.larousse.fr/dictionnaires/francais/',
    'fr'
  );
