

const bcrypt = require('bcryptjs')
const { createUser, getUserPublicByEmail, findUserByEmail } = require('../models/users.model')

const registerUser = async (req, res, next) => {
  try {
    const { email, password, rol, lenguage } = req.body

  
    const exists = await findUserByEmail(email)
    if (exists) {
      return res.status(409).json({ message: 'El usuario ya existe.' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    await createUser({ email, passwordHash, rol, lenguage })

    
    return res.status(201).json({ message: 'Usuario registrado.' })
  } catch (error) {
    return next(error)
  }
}

const getUser = async (req, res, next) => {
  try {
   
    const { email } = req.user || {}

    if (!email) {
      return res.status(401).json({ message: 'Token sin payload válido.' })
    }

    const rows = await getUserPublicByEmail(email)

    if (!rows.length) {
      return res.status(404).json({ message: 'Usuario no encontrado.' })
    }

    
    return res.json(rows)
  } catch (error) {
    return next(error)
  }
}

module.exports = { registerUser, getUser }
