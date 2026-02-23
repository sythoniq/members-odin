const pool = require('./pool')

async function getUser(username) {
  try {
    const {rows} = await pool.query(`SELECT * FROM users WHERE username=($1)`, [username])
    return rows[0]
  } catch (error) {
    throw(error);
  }
}

async function getUserById(id) {
  try {
    const {rows} = await pool.query('SELECT * FROM users WHERE id=($1)', [id])
    return rows[0]
  }catch (error) {
    throw(error);
  }
}

async function registerUser(username, hash) {
  try {
    return await pool.query(`INSERT INTO users (username, hash) VALUES ($1, $2)`,
      [username, hash])
  } catch(error) {
    throw(error)
  }
}

module.exports = {
  getUser,
  registerUser,
  getUserById
}
