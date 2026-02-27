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
  email varchar(255),
  username varchar(30),
  hash varchar(999),
  admin boolean NOT NULL DEFAULT false,
  member boolean NOT NULL DEFAULT false
);

CREATE TABLE messages (
  messageid integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  messagetitle varchar(255),
  message varchar(6000),
  messagetime date,
  userid integer REFERENCES users(id)
);
`

async function main() {
  const client = new Client({
    connectionString: process.env.DB_STRING,
    ssl: true
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
