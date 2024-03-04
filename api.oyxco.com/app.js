import Koa from 'koa'
import views from 'koa-views'
import json from 'koa-json'
import onerror from 'koa-onerror'
// import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import cors from 'koa2-cors'
import koaJwt from 'koa-jwt'
// 文件上传
import koaBody from 'koa-body'

import index from './routes/index'
import users from './routes/users'
import test from './routes/test'
import auth from './routes/auth'
import blog from './routes/blog'
import file from './routes/file'
import mp from './routes/miniProgram'

import { jwtConfig } from './config/index'

const app = new Koa()

// error handler
onerror(app)

// middleware
// app.use(bodyparser({
//   enableTypes: ['json', 'form', 'text']
// }))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.use(
  cors({
    origin: function(ctx) { // 设置允许来自指定域名请求
      if (ctx.url === '/test') {
        return '*'; // 允许来自所有域名请求
      }
      return 'http://localhost:4400'; //只允许http://localhost:8080这个域名的请求
    },
    maxAge: 5, //指定本次预检请求的有效期，单位为秒。
    credentials: true, //是否允许发送Cookie
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法'
  })
);

// 文件上传
app.use(koaBody({
  multipart: true,
  formidable: {
    maxFileSize: 2 * 1024 * 1024  // 设置上传文件大小最大限制，默认2M
  }
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// 中间件对token进行验证
app.use(async (ctx, next) => {
  return next().catch((err) => {
    if (err.status === 401) {
      ctx.status = 200; // ctx.status = 401
      ctx.body = {
        code: 401,
        msg: err.message
      }
    } else {
      throw err
    }
  })
})

// passthrough: true
app.use(koaJwt({ secret: jwtConfig.secret }).unless({
  // 登录，注册接口不需要验证
  path: [
    /^\/api\/login/,
    /^\/api\/register/,
    /^\/wx/,
    /^\/file/
  ]
}));

// routes
app.use(index.routes(), index.allowedMethods())
app.use(file.routes(), file.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(test.routes(), test.allowedMethods())
app.use(auth.routes(), auth.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(mp.routes(), mp.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

export default app