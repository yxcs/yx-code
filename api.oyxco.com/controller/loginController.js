import jwt from 'jsonwebtoken'
import util from 'util'
import { jwtConfig } from '../config/index'
const USER = {
  username: 'admin',
  password: '123456',
  id: 100
}

class LoginController {
  async login(ctx) {
    let method = ctx.request.method
    method = method.toLowerCase()
    let params = {username: '', query: ''}
    if (method === 'get') {
      const { query } = ctx.request
      params = query
    } else {
      const { body } = ctx.request
      params = body
    }
    let checkUser = params.name == USER.username && params.password == USER.password;
    if (checkUser) {
      let userToken = {
        name: USER.username,
        id: USER.id
      };
      ctx.body = {
        code: 200,
        msg: '登录成功',
        token: jwt.sign(
          // 加密userToken, 等同于上面解密的userToken
          userToken,
          jwtConfig.secret,
          // 有效时长1小时
          {
            expiresIn: '1h'
          }
        )
      }
    } else {
      // 登录失败, 用户名密码不正确
      ctx.body = {
        code: 400,
        msg: '用户名密码不匹配'
      }
    }
  }
  async register(ctx) {
    ctx.body = 'register'
  }
  async getUser(ctx) {
    let token = ctx.header.authorization
    if (!token) {
      ctx.body = {
        code: 401,
        data: {},
        msg: '失败'
      }
    } else {
      let payload = await util.promisify(jwt.verify)(token.split(' ')[1], jwtConfig.secret)
      ctx.body = {
        code: 200,
        data: payload,
        msg: '请求成功'
      }
    }
  }
}

export default LoginController