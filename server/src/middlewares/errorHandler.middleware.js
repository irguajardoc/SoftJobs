
const errorHandler = (err, _req, res, _next) => {
  console.error('[ERROR]', err)

  const status = err.status || 500
  const message = err.message || 'Error interno del servidor'

  return res.status(status).json({ message })
}

module.exports = { errorHandler }
