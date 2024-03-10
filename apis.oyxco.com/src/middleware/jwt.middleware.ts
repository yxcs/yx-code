import { Inject, Middleware, httpError } from '@midwayjs/core';
import { Context, NextFunction } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  public static getName(): string {
    return 'jwt';
  }

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 判断下有没有校验信息
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError();
      }
      // 从 header 上获取校验信息
      const parts = ctx.get('authorization').trim().split(' ');

      if (parts.length !== 2) {
        throw new httpError.UnauthorizedError();
      }

      const [scheme, token] = parts;

      if (/^Bearer$/i.test(scheme)) {
        try {
          //jwt.verify方法验证token是否有效
          await this.jwtService.verify(token, {
            complete: true,
          });
        } catch (error) {
          ctx.body = {
            code: 401,
            message: '请登录',
            data: null,
          }
        }
        await next();
      }
    };
  }

  // 配置忽略鉴权的路由地址
  public match(ctx: Context): boolean {
    const urls = [
      '/api/admin/login',
      '/api/admin/register',
      '/api/bookmark',
      '/poem',
      '/url_token',
      '/MP_verify_wXFlUkKrIuTXQO44.txt',
      '/fetch_access_token',
      '/jsapi_ticket',
      '/fetch_signature',
      '/api/poetry',
    ]
    const path = ctx.path;
    const ignore = urls.some(item => path.indexOf(item) > -1);
    return !ignore;
  }
}