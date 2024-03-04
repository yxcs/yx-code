
import { Controller, Inject, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import { JwtService } from '@midwayjs/jwt';
import * as crypto from 'crypto';

import { AdminService } from '../service/admin.service';

@Controller('/api/admin')
export class UserController {

  @Inject()
  ctx: Context;

  @Inject()
  admin: AdminService;

  @Inject()
  jwt: JwtService;

  @Post('/register')
  async adminRegister(@Body() data: any): Promise<string> {
    if (!data?.userPhone || !data?.password) {
      this.ctx.body = {
        code: 1,
        data: '',
        message: '参数错误'
      };
      return;
    }
    const md5 = crypto.createHash('md5');
    const pwdMd5 = md5.update(data.password).digest('hex');
    const res = await this.admin.adminRegister({
      ...data,
      password: pwdMd5,
    });
    return this.ctx.body = res;
  }

  @Post('/login')
  async adminLogin(@Body() data: any): Promise<any> {
    if (!data?.userName || !data?.password) {
      this.ctx.body = {
        code: 1,
        data: '',
        message: '参数错误'
      };
      return;
    }
    const userInfo = await this.admin.getAdminByByPhone(data.userName);
    const md5 = crypto.createHash('md5');
    const pwdMd5 = md5.update(data.password).digest('hex');
    if (userInfo?.password === pwdMd5) {
      return this.ctx.body = {
        code: 0,
        data: {
          t: await this.jwt.sign({
            userName: userInfo.user_name,
            userPhone: userInfo.user_phone,
            loginAt: Date.now(),
          }),
        },
        message: '登录成功'
      }
    }
    return this.ctx.body = {
      code: 401,
      data: null,
      message: '账号或密码错误',
    };
  }
}
