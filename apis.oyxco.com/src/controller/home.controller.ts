
import { Controller, Inject, Get, Query } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
const crypto = require('crypto');
const moment = require('moment');
const kq = require('koa2-request');

import { BASE_URL, wxConfig } from '../config/cosntant';

// 全局存储
let access_token: any = ''
let expires_in:  any = ''
let startTime: any = ''

let ticket: any = ''
let ticket_expires_in: any = ''
let ticketStartTime: any = ''

// 验证后端服务器用
const signFn = arr => {
  const sha1 = crypto.createHash('sha1');//sha1
  const str = arr.sort().join('');
  sha1.update(encodeURI(str));//添加需要的加密数据
  return sha1.digest('hex');//加密,(hex表示16进制)
}

@Controller('/')
export class HomeController {

  @Inject()
  ctx: Context;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }

  @Get('/url_token')
  async getUrlToken(
    @Query('timestamp') timestamp: string,
    @Query('nonce') nonce: string,
    @Query('signature') signature: string,
    @Query('echostr') echostr: string,
  ): Promise<string> {
    const obj = ['server', timestamp, nonce];
    const sign = signFn(obj);
    if (sign == signature) {
     return echostr; //对比成功原样返回微信请求的echostr 字段
    }
    return '不匹配';
  }

  @Get('/MP_verify_wXFlUkKrIuTXQO44.txt')
  async getMPVerify(): Promise<string> {
    return 'wXFlUkKrIuTXQO44';
  }

  @Get('/fetch_access_token')
  async fetchAccessToken(): Promise<any> {
    const res = await kq.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wxConfig.appId}&secret=${wxConfig.appSecret}`);
    startTime = Date.now();
    const body = JSON.parse(res.body);
    access_token = body.access_token;
    expires_in = body.expires_in;
    return {
      access_token,
      expires_in,
      startTime,
    };
  }

  @Get('/jsapi_ticket')
  async jsapiTicket(): Promise<any> {
    if (ticket && Date.now() < (ticketStartTime + ticket_expires_in * 1000)) {
      return {
        ticket: ticket,
        expires_in: ticket_expires_in,
        startTime: ticketStartTime
      };
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
      return {
        ticket,
        expires_in: ticket_expires_in,
        startTime: ticketStartTime
      } 
    }
  }

  @Get('/fetch_signature')
  async fetchSignature(): Promise<any> {
    const res = await kq.get(`${BASE_URL}/jsapi_ticket`)
    const body = JSON.parse(res.body)
    const timestamp = moment().unix()
    const jsapi_ticket = body.ticket
    const nonceStr = Math.random().toString(36).substr(2);
    const query: any = this.ctx?.query?.url || '';
    const url = query.split('#')[0]
  
    const str = `jsapi_ticket=${jsapi_ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`
    const sha1  = crypto.createHash('sha1');
    const signature = sha1.update(str).digest('hex');
    
    return {
      appId: wxConfig.appId,
      timestamp,
      nonceStr,
      signature
    }
  }
}
