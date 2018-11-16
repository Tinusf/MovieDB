CREATE TABLE movies_metadata(
  adult varchar(10),
  belongs_to_collection TEXT,
  budget integer,
  genres TEXT,
  homepage varchar(50),
  id integer not null primary key,
  imdb_id varchar(20),
  original_language varchar(10),
  original_title varchar(50),
  overview varchar(250),
  popularity float,
  poster_path varchar(50),
  production_companies TEXT,
  production_countries TEXT,
  release_date varchar(20),
  revenue integer,
  runtime float,
  spoken_languages TEXT,
  status varchar(20),
  tagline varchar(250),
  title varchar(50),
  video varchar(30),
  vote_average float,
  vote_count integer
);
CREATE TABLE links(
  movieId integer primary key,
  imdbId varchar(20),
  tmdbId varchar(20),
  foreign key (movieId) references movies_metadata(id) on update cascade on delete cascade 
);
CREATE TABLE keywords(
  id integer primary key,
  keywords TEXT,
  foreign key (id) references movies_metadata(id) on update cascade on delete cascade 
);
CREATE TABLE credits(
  cast TEXT,
  crew TEXT,
  id integer,
  primary key(id),
  foreign key (id) references movies_metadata(id) on update cascade on delete cascade
);
CREATE TABLE ratings(
  userId varchar(60),
  movieId integer,
  rating float,
  timestamp integer,
  primary key(userId, movieId),
  foreign key (movieId) references movies_metadata(id) on update cascade on delete cascade
);
