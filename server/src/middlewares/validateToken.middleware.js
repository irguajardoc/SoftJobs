

const { verifyToken } = require('../utils/jwt')

const validateToken = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization') || ''
    const [scheme, token] = authHeader.split(' ')

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Token no provisto o formato inválido.' })
    }

    const decoded = verifyToken(token)

    
    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado.' })
  }
}

module.exports = { validateToken }
