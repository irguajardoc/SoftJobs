

const { pool } = require('../config/db')

const createUser = async ({ email, passwordHash, rol, lenguage }) => {
  const query = {
    text: `
      INSERT INTO usuarios (email, password, rol, lenguage)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, rol, lenguage
    `,
    values: [email, passwordHash, rol, lenguage]
  }

  const { rows } = await pool.query(query)
  return rows[0]
}

const findUserByEmail = async (email) => {
  const query = {
    text: 'SELECT id, email, password, rol, lenguage FROM usuarios WHERE email = $1',
    values: [email]
  }

  const { rows } = await pool.query(query)
  return rows[0] 
}

const getUserPublicByEmail = async (email) => {
  const query = {
    text: 'SELECT id, email, rol, lenguage FROM usuarios WHERE email = $1',
    values: [email]
  }

  const { rows } = await pool.query(query)
  return rows
}

module.exports = { createUser, findUserByEmail, getUserPublicByEmail }
