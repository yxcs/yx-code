const router = require('koa-router')()
import BlogController from '../controller/blogList'

router.prefix('/wx/blog')

router.get('/list', BlogController.page)
router.post('/create', BlogController.create)
router.get('/page', BlogController.page)
router.get('/detail', BlogController.getById)
router.post('/delete', BlogController.delete)
router.post('/update', BlogController.update)

module.exports = router
