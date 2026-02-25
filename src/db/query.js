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

async function registerUser(firstname, lastname, email, username, hash) {
  try {
    return await pool.query(`INSERT INTO users (firstname, lastname, email, username, hash) VALUES ($1, $2, $3, $4, $5)`,
      [firstname, lastname, email, username, hash])
  } catch(error) {
    throw(error)
  }
}

async function getUserByEmail(email) {
  try {
    const {rows} = await pool.query(`SELECT * FROM users WHERE email=($1)`,
      [email])
    const user = rows[0]
    return user;
  } catch (error) {
    throw(error);
  }
}

async function getMessages() {
  try {
    const {rows} = await pool.query(`SELECT * FROM messages;`)
    return rows;
  } catch(error) {
    throw(error);
  }
}

async function addMessage(title, message, user) {
  try {
    await pool.query(`
INSERT INTO messages (messagetitle, message, messagetime, userid) VALUES 
($1, $2, now(), $3);
`, [title, message, user.id])
  } catch(error) {
    throw(error);
  }
}

async function updateUserPermission(user, type) {
  try {
    if (type == 'member') {
      await pool.query(`UPDATE users SET member = ($1) WHERE id = ($2)`, ['true', user.id])
    } else if (type == 'admin') {
      await pool.query(`UPDATE users SET admin = ($1), member = ($2) WHERE id = ($3)`, ['true', 'true', user.id])
    }
  } catch(error) {
    throw(error);
  }
}

async function getMessage(messageid) {
  try {
    await pool.query(`SELECT * FROM messages WHERE messageid=($1)`, [messageid])
  } catch(error) {
    throw(error);
  }
}

async function deleteMessage(messageid) {
  try {
    await pool.query(`DELETE FROM messages WHERE messageid = ($1)`, [messageid])
  } catch(error) {
    throw(error)
  }
}

module.exports = {
  getUser,
  registerUser,
  getUserById,
  getUserByEmail,
  getMessages,
  addMessage,
  updateUserPermission,
  deleteMessage
}
