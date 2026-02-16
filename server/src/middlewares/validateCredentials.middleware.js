

const validateLoginCredentials = (req, res, next) => {
  const { email, password } = req.body || {}

  if (!email || !password) {
    return res.status(400).json({ message: 'Email y password son obligatorios.' })
  }

  next()
}

const validateRegisterCredentials = (req, res, next) => {
  const { email, password, rol, lenguage } = req.body || {}

  if (!email || !password || !rol || !lenguage) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' })
  }

  next()
}

module.exports = { validateLoginCredentials, validateRegisterCredentials }
