import { Controller, Inject, Get, Query, Param } from '@midwayjs/core';
import { Context } from '@midwayjs/web';

import { PoemsService } from '../service/peom.service';

@Controller('/api/poetry')
export class HomeController {

  @Inject()
  ctx: Context;

  @Inject()
  poemsService: PoemsService;

  @Get('/poems')
  async getPoems(
    @Query('pageNum') pageNum: number,
    @Query('pageSize') pageSize: number,
    @Query('name') name: string,
    @Query('author') author: string,
    @Query('dynasty') dynasty: string,
  ) {
    const res = await this.poemsService.getPoems({
      pageNum,
      pageSize,
      name,
      author,
      dynasty,
    });

    return this.ctx.body = {
      data: res,
      code:  0,
      message: 'success',
    };
  }

  @Get('/poems/:id')
  async getPoemById(@Param('id') id: number) {
    const res = await this.poemsService.getPoemById(id);
    return this.ctx.body = {
      data: res,
      code:  0,
      message: 'success',
    };
  }

  @Get('/authors')
  async getAuthors(
    @Query('pageNum') pageNum: number,
    @Query('pageSize') pageSize: number,
    @Query('name') name: string,
    @Query('dynasty') dynasty: string,
  ) {
    const res = await this.poemsService.getAuthors({
      pageNum,
      pageSize,
      name,
      dynasty,
    });

    return this.ctx.body = {
      data: res,
      code:  0,
      message: 'success',
    };
  }

  @Get('/authors/:id')
  async getAuthorById(@Param('id') id: number) {
    const res = await this.poemsService.getAuthorById(id);
    return this.ctx.body = {
      data: res,
      code:  0,
      message: 'success',
    };
  }

  @Get('/single')
  async getSingle() {
    const res = await this.poemsService.getSingele();
    return this.ctx.body = {
      data: res,
      code:  0,
      message: 'success',
    };
  }

  @Get('/single/:id')
  async getSingleById(@Param('id') id: number) {
    const res = await this.poemsService.getSingleById(id);
    return this.ctx.body = {
      data: res,
      code:  0,
      message: 'success',
    };
  }

  @Get('/category')
  async getCategory() {
    const res = await this.poemsService.getCategory();
    return this.ctx.body = {
      data: res,
      code:  0,
      message: 'success',
    };
  }

  @Get('/category/:id')
  async getCategoryById(@Param('id') id: number) {
    const res = await this.poemsService.getCategoryById(id);
    return this.ctx.body = {
      data: res,
      code:  0,
      message: 'success',
    };
  }

  @Get('/cipai')
  async getCipai() {
    const res = await this.poemsService.getCipai();
    return this.ctx.body = {
      data: res,
      code:  0,
      message: 'success',
    };
  }

  @Get('/cipai/:id')
  async getCipaiById(@Param('id') id: number) {
    const res = await this.poemsService.getCipaiById(id);
    return this.ctx.body = {
      data: res,
      code:  0,
      message: 'success',
    };
  }

  @Get('/dynasty')
  async getDynasty() {
    const res = await this.poemsService.getDynasty();
    return this.ctx.body = {
      data: res,
      code:  0,
      message: 'success',
    };
  }

  @Get('/dynasty/:id')
  async getDynastyById(@Param('id') id: number) {
    const res = await this.poemsService.getDynastyById(id);
    return this.ctx.body = {
      data: res,
      code:  0,
      message: 'success',
    };
  }

  @Get('/options')
  async getOptions() {
    const res = await this.poemsService.getOptions();
    return this.ctx.body = {
      data: res,
      code:  0,
      message: 'success',
    };
  }

  @Get('/options/:id')
  async getOptionsById(@Param('id') id: number) {
    const res = await this.poemsService.getOptionsById(id);
    return this.ctx.body = {
      data: res,
      code:  0,
      message: 'success',
    };
  }
};
