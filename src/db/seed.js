const { Client } = require('pg')

require('dotenv').config()

const SQL = `
DROP TABLE IF EXISTS users, messages, session;

CREATE TABLE session (
  sid varchar NOT NULL COLLATE "default",
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE session ADD CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX IDX_session_expire ON session (expire);

CREATE TABLE users (
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstname varchar(30),
  lastname varchar(30),
  username varchar(30),
  hash varchar(999),
  member boolean NOT NULL DEFAULT false
);

CREATE TABLE messages (
  messagetitle varchar(255),
  message varchar(6000),
  messagetime date,
  userid integer REFERENCES users(id)
);
`

async function main() {
  const client = new Client({
    connectionString: process.env.DB_STRING
  }) 

  try {
    await client.connect();
    await client.query(SQL)
    await client.end()
  } catch(error) {
    throw(error)
  }
}

main();
