const router = require('koa-router')()
import LoginController from '../controller/loginController'

const auth = new LoginController()

router.prefix('/api')

router.post('/login', auth.login)

router.get('/register', auth.register)

router.get('/user', auth.getUser)

module.exports = router
