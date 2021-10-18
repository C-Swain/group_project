
-- Table for texts
DROP TABLE IF EXISTS texts CASCADE;
CREATE TABLE texts (
  id SERIAL PRIMARY KEY NOT NULL,
  message_id INTEGER REFERENCES messages(id) NOT NULL,
  from_buyer BOOLEAN NOT NULL DEFAULT TRUE,
  content VARCHAR(255) NOT NULL,
  sent_at TIMESTAMP DEFAULT NOW()
);