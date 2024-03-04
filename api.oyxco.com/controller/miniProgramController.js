import rp from 'request-promise'
import schedule from 'node-schedule'
import { mp } from '../config/index'
import WXBizDataCrypt from '../utils/wxCrypt'
import mpUser from '../service/mpUser'

class MiniProgramController {
  constructor() {
    this.expiresStartTime = 0
    this.accessToken = ''
    this.isLoading = false
    schedule.scheduleJob('* 1 * * * *',()=>{
      console.log('scheduleCronstyle:' + new Date());
    });
  }
  async checkExpires() {
    const currentTime = +new Date()
    if (currentTime >= this.expiresStartTime && !this.isLoading) {
      this.isLoading = true
      await this.getAccessToken()
      this.isLoading = false
    }
  }

  async getAccessToken(ctx) {
    const currentTime = +new Date()
    const data = {} // await rp(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${mp.appId}&secret=${mp.secret}`)
    if (data && data.access_token && data.expires_in) {
      this.expiresStartTime = currentTime + (7200 - 5 * 60) * 1000
      this.accessToken = data.access_token
      ctx.body = true
    }
    ctx.body = false
  }

  async getLoginMessage(ctx) {
    const { jsCode } = ctx.query
    const data = await rp(`https://api.weixin.qq.com/sns/jscode2session?appid=${mp.appId}&secret=${mp.secret}&js_code=${jsCode}&grant_type=authorization_code`)
    if (!data.openid) {
      ctx.body = {
        code: 1,
        data: false,
        msg: '登录失败'
      }
      return
    }
    let user = await mpUser.findByOpenId({ openId: body.openid })
    if (!user) {
      user = await mpUser.create(user)
    }
    let userToken = {
      name: user.userName,
      id: user._id
    };
    ctx.body = {
      code: 200,
      msg: '登录成功',
      token: jwt.sign(
        userToken,
        jwtConfig.secret,
        {
          expiresIn: '10d'
        }
      )
    }
    ctx.body = {
      code: 0,
      data,
      msg: 'success'
    }
  }

  async getUserInfo(ctx) {
    const body = ctx.request.body
    const pc = new WXBizDataCrypt(mp.appId, body.sessionKey)
    const data = pc.decryptData(body.encryptedData , body.iv)
    ctx.body = {
      code: 0,
      data,
      msg: 'success'
    }

  }
}

export default new MiniProgramController()