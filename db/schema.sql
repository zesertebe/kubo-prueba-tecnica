CREATE SCHEMA IF NOT exists Core;

DROP TABLE if exists Core.users_movies;
DROP TABLE if exists Core.movies;
DROP TABLE if exists Core.categories;
DROP TABLE if exists Core.users;

-- users
create TABLE if not exists Core.users(
  user_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_name VARCHAR(100) not null,
  user_email VARCHAR(100) not null unique,
  user_verified boolean default false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- categories
create TABLE if not exists Core.categories(
  category_id INT GENERATED ALWAYS as IDENTITY PRIMARY KEY,
  category_name VARCHAR(100) not null unique,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT into Core.categories(category_name) VALUES ('Terror');
INSERT into Core.categories(category_name) VALUES ('Suspenso');
INSERT into Core.categories(category_name) VALUES ('Drama');
INSERT into Core.categories(category_name) VALUES ('Comedia');

-- movies
create TABLE if not exists Core.movies(
  movie_id INT GENERATED ALWAYS as IDENTITY PRIMARY KEY,
  movie_title VARCHAR(100) not null,
  movie_length VARCHAR(20) not null,
  movie_category int not null,
  movie_release_date TIMESTAMP not null,
  FOREIGN KEY (movie_category) REFERENCES Core.categories(category_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--users_movies
create TABLE if not exists Core.users_movies(
  user_id INT,
  movie_id INT,
  FOREIGN KEY (user_id) REFERENCES Core.users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (movie_id) REFERENCES Core.movies(movie_id) ON DELETE CASCADE,
  viewd_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
GRANT ALL ON SCHEMA core TO "owner";
ALTER DEFAULT PRIVILEGES IN SCHEMA core GRANT ALL ON TABLES TO "owner";
GRANT ALL ON TABLE core.categories TO "owner";
GRANT ALL ON TABLE core.movies TO "owner";
GRANT ALL ON TABLE core.users TO "owner";
GRANT ALL ON TABLE core.users_movies TO "owner";

