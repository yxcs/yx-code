
import { Controller, Inject, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/web';

@Controller('/file')
export class FileController {

  @Inject()
  ctx: Context;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
}
