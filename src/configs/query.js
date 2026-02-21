require('dotenv').config();

const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DB_STRING
})

async function main() {
  await pool.connect();
  const res = await pool.query(`SELECT * FROM users`)
  console.log(res);
}

main();
