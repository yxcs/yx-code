const router = require('koa-router')()
const crypto = require('crypto')
const kq = require('koa2-request')
const moment = require("moment");
const config = require('../config')
const wx_config = config.wx_config
const BASE_URL = config.BASE_URL

// 全局存储
let access_token = ''
let expires_in = ''
let startTime = ''

let ticket = ''
let ticket_expires_in = ''
let ticketStartTime = ''

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/wx/scan', async (ctx, next) => {
  await ctx.render('wx/scan', {
    title: '微信扫码'
  })
})

router.get('/MP_verify_wXFlUkKrIuTXQO44.txt', async (ctx, next) => {
  ctx.body = 'wXFlUkKrIuTXQO44'
});

// 验证后端服务器用
function signFn(arr) {
  const sha1  = crypto.createHash('sha1');//sha1
  const str = arr.sort().join('');
  sha1.update(encodeURI(str));//添加需要的加密数据
  return sha1.digest('hex');//加密,(hex表示16进制)
}

router.get('/url_token', async (ctx, next) => {
  const obj = ['server', ctx.query.timestamp, ctx.query.nonce];
  const sign = signFn(obj);
  if (sign == ctx.query.signature) {
    ctx.body = ctx.query.echostr //对比成功原样返回微信请求的echostr 字段
  } else {
    ctx.body = '不匹配'
  }
})

router.get('/fetch_access_token', async (ctx, next) => {
  startTime = Date.now()
  const res = await kq.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wx_config.appId}&secret=${wx_config.appSecret}`)
  const body = JSON.parse(res.body)
  access_token = body.access_token
  expires_in = body.expires_in
  ctx.body = {
    access_token,
    expires_in,
    startTime
  }
})

router.get('/jsapi_ticket', async (ctx, next) => {
  if (ticket && Date.now() < (ticketStartTime + ticket_expires_in * 1000)) {
    ctx.body = {
      ticket: ticket,
      expires_in: ticket_expires_in,
      startTime: ticketStartTime
    }
  } else {
    let aToken = ''
    if (access_token && Date.now() < (startTime + expires_in * 1000)) {
      aToken = access_token
    } else {
      const res = await kq.get(`${BASE_URL}/fetch_access_token`)
      const body = JSON.parse(res.body)
      aToken = body.access_token
    }
    ticketStartTime = Date.now()
    const ticketData = await kq.get(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${aToken}&type=jsapi`)
    const tBody = JSON.parse(ticketData.body)
    ticket = tBody.ticket
    ticket_expires_in = tBody.expires_in
    ctx.body = {
      ticket,
      expires_in: ticket_expires_in,
      startTime: ticketStartTime
    } 
  }
})

router.get('/fetch_signature', async (ctx, next) => {
  const res = await kq.get(`${BASE_URL}/jsapi_ticket`)
  const body = JSON.parse(res.body)
  const timestamp = moment().unix()
  const jsapi_ticket = body.ticket
  const nonceStr = Math.random().toString(36).substr(2);
  const url = ctx.query.url.split('#')[0]

  const str = `jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
  const sha1  = crypto.createHash('sha1');
  const signature = sha1.update(str).digest('hex');
  
  ctx.body = {
    appId: wx_config.appId,
    timestamp,
    nonceStr,
    signature
  }
})

module.exports = router
