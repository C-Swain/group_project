DROP TABLE IF EXISTS movies CASCADE;

CREATE TABLE movies (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  runtime  SMALLINT,
  rating VARCHAR(255) DEFAULT 'None'
);