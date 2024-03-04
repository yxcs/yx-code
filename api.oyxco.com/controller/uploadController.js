import UploadService from '../service/uploadList'

class UploadController {
  async list(ctx, next) {
    const data = await UploadService.find({})
    ctx.body = {
      code: 0,
      data: data,
      msg: '获取成功'
    }
  }

  async create(ctx, next) {
    const { body = {} } = ctx.request
    const data = await UploadService.create(body)
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
    const data = await UploadService.getFileByPage(params, page)
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
    const data = await UploadService.findById(query.id)
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
    const data = await UploadService.findByIdAndRemove(body.id)
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
    const data = await UploadService.updateFileById(body.id, params)
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

  async fileSave2DB (params) {
    const data = await UploadService.create(params)
    if (data) {
      return {
        code: 0,
        data,
        msg: 'success'
      }
    }
    return {
      code: 1,
      data,
      msg: '创建失败'
    }
  }
}

export default new UploadController()
