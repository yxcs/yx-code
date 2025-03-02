const router = require('koa-router')()
const { register, login } = require('../controllers/user');

router.prefix('/users')

router.get('/', async (ctx, next)  => {
  const [rows] = await ctx.state.db.query('SELECT NOW() as time');
  ctx.body = rows[0].time;
  // ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/create/user', async (ctx, next) => {
  const sql = `
    INSERT INTO admin 
    (user_name,user_mail,user_phone,user_uid,create_at,update_at,last_login_at,user_avatar,user_link,user_token,user_age,user_address,password)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
  `;
  const res =  await ctx.state.db.query(sql, [
    'test',
    'test@example.com',
    '1234567890',
    'test_uid',
    new Date(),
    new Date(),
    new Date(),
    'test_avatar.jpg',
    'https://example.com',
    'test_token',
    20,
    'test_address',
    'test_password'
  ]);
  ctx.body = res;
})

//  用户注册、登录
// 用户注册
router.post('/auth/register', register);

// 用户登录
router.post('/auth/login', login);

module.exports = router
