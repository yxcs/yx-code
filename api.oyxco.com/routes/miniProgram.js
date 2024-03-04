const router = require('koa-router')()
import MPController from '../controller/miniProgramController'

router.prefix('/wx/mp')

router.get('/getToken', MPController.getAccessToken)
router.get('/getLogin', MPController.getLoginMessage)
router.post('/getUserInfo', MPController.getUserInfo)

module.exports = router
