import { Provide } from '@midwayjs/core';
import { prisma } from '../../db/prisma';

@Provide()
export class PoemsService {
  async getPoems(data: any) {
    const { pageNum = 1, pageSize = 10, ...rest } = data;
    const page = {
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    };
    const res = await prisma.poems.findMany({
      where:  {
        name: {
          contains: rest.name ?? undefined,
        },
        author: {
          contains: rest.author ?? undefined,
        },
        dynasty: {
          contains: rest.dynasty ?? undefined,
        }
      },
      ...page,
    });
    const count = await prisma.poems.count({
      where:  {
        name: {
          contains: rest.name ?? undefined,
        },
        author: {
          contains: rest.author ?? undefined,
        },
        dynasty: {
          contains: rest.dynasty ?? undefined,
        }
      },
    });
    return {
      data: res,
      pagination: {
        pageNum,
        pageSize,
        total: count,
      }
    };
  }

  async getPoemById(id: number) {
    const res = await prisma.poems.findUnique({
      where: {
        id: +id,
      },
    });
    return res
  }

  async getAuthors(data: any) {
    const { pageNum = 1, pageSize = 10, ...rest } = data;
    const page = {
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    };
    const res = await prisma.authors.findMany({
      where:  {
        name: {
          contains: rest.name ?? undefined,
        },
        dynasty: {
          contains: rest.dynasty ?? undefined,
        },
      },
      ...page,
    });
    const count = await prisma.authors.count({
      where:  {
        name: {
          contains: rest.name ?? undefined,
        },
        dynasty: {
          contains: rest.dynasty ?? undefined,
        },
      },
    });
    return {
      data: res,
      pagination: {
        pageNum,
        pageSize,
        total: count,
      }
    };
  }

  async getAuthorById(id: number) {
    const res = await prisma.authors.findUnique({
      where: {
        id: +id,
      },
    });
    return res
  }

  async getSingele() {
    const res = await prisma.single.findMany({});
    return res
  }

  async getSingleById(id: number) {
    const res = await prisma.single.findUnique({
      where: {
        id: +id,
      },
    });
    return res
  }

  async getCategory() {
    const res = await prisma.category.findMany({});
    return res
  }

  async getCategoryById(id: number) {
    const res = await prisma.category.findUnique({
      where: {
        id: +id,
      },
    });
    return res
  }

  async getCipai() {
    const res = await prisma.cipai.findMany({});
    return res
  }

  async getCipaiById(id: number) {
    const res = await prisma.cipai.findUnique({
      where: {
        id: +id,
      },
    });
    return res
  }

  async getDynasty() {
    const res = await prisma.dynasty.findMany({});
    return res
  }

  async getDynastyById(id: number) {
    const res = await prisma.dynasty.findUnique({
      where: {
        id: +id,
      },
    });
    return res
  }

  async getOptions() {
    const res = await prisma.options.findMany({});
    return res
  }

  async getOptionsById(id: number) {
    const res = await prisma.options.findUnique({
      where: {
        id: +id,
      },
    });
    return res
  }
}
