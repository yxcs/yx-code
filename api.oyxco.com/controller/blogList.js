import BlogService from '../service/blogList'

class BlogController {
  async list(ctx, next) {
    const data = await BlogService.find({level: 1})
    ctx.body = {
      code: 0,
      data: {
        list: data,
        total: 1,
        pageNum: 1,
        pageSize: 20
      },
      msg: '获取成功'
    }
  }

  async create(ctx, next) {
    const { body = {} } = ctx.request
    if (!body.title || !body.content || !body.cover || !body.description || !body.author) {
      ctx.body = {
        code: 1,
        data: body,
        msg: '参数有误'
      }
      return
    }
    body.createAt = +new Date
    body.updateAt = +new Date
    body.tag = []
    body.commentId = null
    body.prevId = null
    body.nextId = null
    const data = await BlogService.create(body)
    if (data) {
      ctx.body = {
        code: 0,
        data,
        msg: 'success'
      }
      return 
    }
    ctx.body = {
      code: 1,
      data,
      msg: '创建失败'
    }
  }

  async page(ctx, next) {
    const { query } = ctx.request
    const params = {}
    const page = {}
    for (const key in query) {
      if (key === 'pageNum' || key === 'pageSize') {
        page[key] = +query[key]
      } else {
        params[key] = query[key]
      }
    }
    page.pageNum = page.pageNum ? page.pageNum : 1
    page.pageSize = page.pageSize ? page.pageSize : 20
    console.log(params, page)
    const data = await BlogService.getBlogByPage(params, page)
    if (data) {
      ctx.body = {
        code: 0,
        data,
        msg: 'success'
      }
      return
    }
    ctx.body = {
      code: 1,
      data,
      msg: 'fail'
    }
  }

  async getById(ctx, next) {
    const { query } = ctx.request
    if (!query.id) {
      ctx.body = {
        code: 1,
        data: false,
        msg: 'fail'
      }
      return false
    }
    const data = await BlogService.findById(query.id)
    if (data) {
      ctx.body = {
        code: 0,
        data,
        msg: 'success'
      }
      return true
    }
    ctx.body = {
      code: 1,
      data,
      msg: 'fail'
    }
  }

  async delete(ctx, next) {
    const { body } = ctx.request
    if (!body.id) {
      ctx.body = {
        code: 1,
        data: false,
        msg: 'fail'
      }
      return false
    }
    const data = await BlogService.findByIdAndRemove(body.id)
    if (data) {
      ctx.body = {
        code: 0,
        data,
        msg: 'success'
      }
      return true
    }
    ctx.body = {
      code: 1,
      data,
      msg: 'fail'
    }
  }

  async update(ctx, next) {
    const { body } = ctx.request
    if (!body.id) {
      ctx.body = {
        code: 1,
        data: false,
        msg: 'fail'
      }
      return false
    }
    const params = body.params
    params.updateAt = +new Date()
    const data = await BlogService.updateBlogById(body.id, params)
    if (data) {
      ctx.body = {
        code: 0,
        data,
        msg: 'success'
      }
      return true
    }
    ctx.body = {
      code: 1,
      data,
      msg: 'fail'
    }
  }
}

export default new BlogController()
