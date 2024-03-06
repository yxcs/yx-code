
import { Controller, Inject, Get, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import { JwtService } from '@midwayjs/jwt';

import { BookmarkService } from '../service/bookmark.service';

@Controller('/api/bookmark')
export class BookmarkController {

  @Inject()
  ctx: Context;

  @Inject()
  bk: BookmarkService;

  @Inject()
  jwt: JwtService;

  @Get('/')
  async getBookmarks(): Promise<string> {
    const res = await this.bk.getBookmarks();
    return this.ctx.body = res;
  }

  @Post('/')
  async createBookmarks(@Body() data: any): Promise<string> {
    const res = await this.bk.createBookmarks(data);
    return this.ctx.body = res;
  }
}
