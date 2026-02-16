
require('dotenv').config()
const express = require('express')
const cors = require('cors')

const { logger } = require('./middlewares/logger.middleware')
const { errorHandler } = require('./middlewares/errorHandler.middleware')

const authRoutes = require('./routes/auth.routes')
const usersRoutes = require('./routes/users.routes')

const app = express()

if (!process.env.JWT_SECRET) {
  console.warn('[WARN] JWT_SECRET no está definido. Copia .env.example a .env y configura la llave.')
}

app.use(cors()) 
app.use(express.json())
app.use(logger)


app.use(authRoutes)
app.use(usersRoutes)

app.get('/', (_req, res) => res.json({ message: 'Soft Jobs API OK' }))


app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada.' }))

app.use(errorHandler)

const PORT = Number(process.env.PORT || 3000)
app.listen(PORT, () => {
  console.log(` SoftJobs API escuchando en http://localhost:${PORT}`)
})
