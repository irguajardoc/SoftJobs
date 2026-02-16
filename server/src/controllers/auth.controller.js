

const bcrypt = require('bcryptjs')
const { findUserByEmail } = require('../models/users.model')
const { signToken } = require('../utils/jwt')

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' })
    }

    const ok = await bcrypt.compare(password, user.password)
    if (!ok) {
      return res.status(401).json({ message: 'Credenciales inválidas.' })
    }

    const token = signToken({ email })

    return res.json({ token })
  } catch (error) {
    return next(error)
  }
}

module.exports = { login }
