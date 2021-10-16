DROP TABLE IF EXISTS books CASCADE;

CREATE TABLE books (
  id SERIAL PRIMARY KEY NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
  author VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  detail TEXT,
  rating SMALLINT
);
