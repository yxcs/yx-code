import { Provide } from '@midwayjs/core';
import { IUserOptions } from '../interface';
import { prisma } from '../../db/prisma';

import { TAdminOptions } from '../interface';

@Provide()
export class AdminService {
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async adminRegister(options: TAdminOptions) {
    const res = await prisma.admin.create({
      data: {
        user_name: options.userName,
        password: options.password,
        user_phone: options.userPhone,
      },
    });
    return res;
  }
}
