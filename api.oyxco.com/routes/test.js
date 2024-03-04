const router = require('koa-router')()
import TestController from '../controller/test'

const test = new TestController()

router.prefix('/test')

router.get('/', test.getAll)

router.get('/add', test.add)

module.exports = router
