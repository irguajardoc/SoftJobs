
const { Router } = require('express')
const { registerUser, getUser } = require('../controllers/users.controller')
const { validateRegisterCredentials } = require('../middlewares/validateCredentials.middleware')
const { validateToken } = require('../middlewares/validateToken.middleware')

const router = Router()
router.post('/usuarios', validateRegisterCredentials, registerUser)


router.get('/usuarios', validateToken, getUser)

module.exports = router
