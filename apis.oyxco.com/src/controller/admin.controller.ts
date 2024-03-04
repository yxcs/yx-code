
import { Controller, Inject, Get, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/web';

import { AdminService } from '../service/admin.service';

@Controller('/api/admin')
export class UserController {

  @Inject()
  ctx: Context;

  @Inject()
  admin: AdminService;

  @Post('/register')
  async adminRegister(@Body() data: any): Promise<string> {
    const res = await this.admin.adminRegister({
      ...data,
    });
    return this.ctx.body = res;
  }

  @Get('/login')
  async adminLogin(): Promise<string> {
    return 'Hello Midwayjs!';
  }
}
