import { Provide } from '@midwayjs/core';
import { prisma } from '../../db/prisma';

@Provide()
export class BookmarkService {
  async getBookmarks() {
    const res = await prisma.bookmarks.findMany({});
    return res;
  }

  async createBookmark(data) {
    const res = await prisma.bookmarks.create({
      data: {
        ...data,
      },
    });
    return res;
  }

  async createBookmarks(data) {
    const res = await prisma.bookmarks.createMany({
      data,
    });
    return res;
  }
}
