import { Controller, Inject, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/web';
import { prisma } from '../../db/prisma';
const fs = require('fs');

@Controller('/poemdb')
export class PoemController {

  @Inject()
  ctx: Context;

  @Get('/')
  async savePoems() {
    let list = fs.readFileSync('/Users/yxc/Home/poems-db/poem-api/poem_json.json');
    list = JSON.parse(list)
    console.log(list.length)
    let current = [];
    try {
      for (let value of list) {
        current.push(value);
        if (current.length >= 1000) {
          await prisma.poems.createMany({
            data: current,
          });
          console.log('-----:', current.length)
          current = [];
        }
      }
      await prisma.poems.createMany({
        data: current,
      });
    } catch (e) {
      console.log(e)
      // fs.writeFileSync('/Users/yxc/Home/code-zone/yx-apis/db/lll.json', JSON.stringify(current), { flag: 'a' })
    }

    return this.ctx.body = 'OK';
  }

  @Get('/abv')
  async saveAbv() {
    let list = fs.readFileSync('/Users/yxc/Home/poems-db/poem-api/ancient_book_views_json.json');
    list = JSON.parse(list)
    console.log(list.length)
    let current = [];
    try {
      for (let value of list) {
        const { id, oId, creTime, yiyi, ...rest } = value;
        current.push({
          ...rest,
          o_id: `${oId}`,
          yiyi: yiyi ? 1 : 0,
          createAt: new Date(),
          updateAt: new Date(),
        });
        if (current.length >= 400) {
          await prisma.ancient_book_views.createMany({
            data: current,
          });
          current = [];
        }
      }
      await prisma.ancient_book_views.createMany({
        data: current,
      });
    } catch (e) {
      console.log(e)
      fs.writeFileSync('/Users/yxc/Home/code-zone/lll.json', JSON.stringify(current), { flag: 'a' })
    }

    return this.ctx.body = 'OK';
  }

  @Get('/ancients')
  async saveAncients() {
    let list = fs.readFileSync('/Users/yxc/Home/poems-db/poem-api/ancients_json.json');
    list = JSON.parse(list)
    console.log(list.length)
    let current = [];
    try {
      for (let value of list) {
        const {  oId, creTime, ...rest } = value;
        current.push({
          ...rest,
          o_id: `${oId}`,
        });
        if (current.length >= 400) {
          await prisma.ancients.createMany({
            data: current,
          });
          current = [];
        }
      }
      await prisma.ancients.createMany({
        data: current,
      });
    } catch (e) {
      console.log(e)
      fs.writeFileSync('/Users/yxc/Home/code-zone/yx-apis/db/lll.json', JSON.stringify(current), { flag: 'a' })
    }

    return this.ctx.body = 'OK';
  }

  @Get('/authors')
  async saveAuthors() {
    let list = fs.readFileSync('/Users/yxc/Home/poems-db/poem-api/authors_json.json');
    list = JSON.parse(list)
    console.log(list.length)
    let current = [];
    try {
      for (let value of list) {
        const { describe , ...rest } = value;
        current.push({
          ...rest,
          description: describe,
        });
        if (current.length >= 400) {
          await prisma.authors.createMany({
            data: current,
          });
          current = [];
        }
      }
      await prisma.authors.createMany({
        data: current,
      });
    } catch (e) {
      console.log(e)
      fs.writeFileSync('/Users/yxc/Home/code-zone/yx-apis/db/lll.json', JSON.stringify(current), { flag: 'a' })
    }

    return this.ctx.body = 'OK';
  }

  @Get('/category')
  async saveCategory() {
    let list = fs.readFileSync('/Users/yxc/Home/poems-db/poem-api/category_json.json');
    list = JSON.parse(list)
    console.log(list.length)
    let current = [];
    try {
      for (let value of list) {
        const { __v , ...rest } = value;
        current.push({
          ...rest,
        });
        if (current.length >= 400) {
          await prisma.category.createMany({
            data: current,
          });
          current = [];
        }
      }
      await prisma.category.createMany({
        data: current,
      });
    } catch (e) {
      console.log(e)
      fs.writeFileSync('/Users/yxc/Home/code-zone/yx-apis/db/lll.json', JSON.stringify(current), { flag: 'a' })
    }

    return this.ctx.body = 'OK';
  }

  @Get('/cipai')
  async saveCipai() {
    let list = fs.readFileSync('/Users/yxc/Home/poems-db/poem-api/cipai_json.json');
    list = JSON.parse(list)
    console.log(list.length)
    let current = [];
    try {
      for (let value of list) {
        const { __v , ...rest } = value;
        current.push({
          ...rest,
        });
        if (current.length >= 400) {
          await prisma.cipai.createMany({
            data: current,
          });
          current = [];
        }
      }
      await prisma.cipai.createMany({
        data: current,
      });
    } catch (e) {
      console.log(e)
      fs.writeFileSync('/Users/yxc/Home/code-zone/yx-apis/db/lll.json', JSON.stringify(current), { flag: 'a' })
    }

    return this.ctx.body = 'OK';
  }

  @Get('/dynasty')
  async saveDynasty() {
    let list = fs.readFileSync('/Users/yxc/Home/poems-db/poem-api/dynasty_json.json');
    list = JSON.parse(list)
    console.log(list.length)
    let current = [];
    try {
      for (let value of list) {
        const { __v , ...rest } = value;
        current.push({
          ...rest,
        });
        if (current.length >= 400) {
          await prisma.dynasty.createMany({
            data: current,
          });
          current = [];
        }
      }
      await prisma.dynasty.createMany({
        data: current,
      });
    } catch (e) {
      console.log(e)
      fs.writeFileSync('/Users/yxc/Home/code-zone/yx-apis/db/lll.json', JSON.stringify(current), { flag: 'a' })
    }

    return this.ctx.body = 'OK';
  }

  @Get('/options')
  async saveOptions() {
    let list = fs.readFileSync('/Users/yxc/Home/poems-db/poem-api/options_json.json');
    list = JSON.parse(list)
    console.log(list.length)
    let current = [];
    try {
      for (let value of list) {
        const { desc , ...rest } = value;
        current.push({
          ...rest,
          description: desc,
        });
        if (current.length >= 400) {
          await prisma.options.createMany({
            data: current,
          });
          current = [];
        }
      }
      await prisma.options.createMany({
        data: current,
      });
    } catch (e) {
      console.log(e)
      fs.writeFileSync('/Users/yxc/Home/code-zone/yx-apis/db/lll.json', JSON.stringify(current), { flag: 'a' })
    }

    return this.ctx.body = 'OK';
  }

  @Get('/recommend')
  async saveRecommend() {
    let list = fs.readFileSync('/Users/yxc/Home/poems-db/poem-api/recommend_json.json');
    list = JSON.parse(list)
    console.log(list.length)
    let current = [];
    try {
      for (let value of list) {
        const { order, isShow, _openid, updateAt, createAt, ...rest } = value;
        current.push({
          ...rest,
          orderId: order,
          updateAt: new Date(),
          createAt: new Date(),
          isShow: isShow ? 1 : 0,
        });
        if (current.length >= 400) {
          await prisma.recommend.createMany({
            data: current,
          });
          current = [];
        }
      }
      await prisma.recommend.createMany({
        data: current,
      });
    } catch (e) {
      console.log(e)
      fs.writeFileSync('/Users/yxc/Home/code-zone/yx-apis/db/lll.json', JSON.stringify(current), { flag: 'a' })
    }  

    return this.ctx.body = 'OK';
  }

  @Get('/single')
  async saveSingle() {
    let list = fs.readFileSync('/Users/yxc/Home/poems-db/poem-api/single_json.json');
    list = JSON.parse(list)
    console.log(list.length)
    let current = [];
    try {
      for (let value of list) {
        const { createTime, updateTime, ...rest } = value;
        current.push({
          ...rest,
        });
        if (current.length >= 400) {
          await prisma.single.createMany({
            data: current,
          });
          current = [];
        }
      }
      await prisma.single.createMany({
        data: current,
      });
    } catch (e) {
      console.log(e)
      fs.writeFileSync('/Users/yxc/Home/code-zone/yx-apis/db/lll.json', JSON.stringify(current), { flag: 'a' })
    }  

    return this.ctx.body = 'OK';
  }

};
