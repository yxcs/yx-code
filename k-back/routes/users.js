const router = require('koa-router')()
const { getUser, register, login } = require('../controllers/user');

router.prefix('/api/user')

// 获取用户信息
router.get('/', getUser),

// 用户注册
router.post('/register', register);

// 用户登录
router.post('/login', login);

module.exports = router
