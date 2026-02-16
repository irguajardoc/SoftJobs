

const { Router } = require('express')
const { login } = require('../controllers/auth.controller')
const { validateLoginCredentials } = require('../middlewares/validateCredentials.middleware')

const router = Router()

router.post('/login', validateLoginCredentials, login)

module.exports = router
