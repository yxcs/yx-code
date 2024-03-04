import BlogModal from '../model/blogList'

class BlogService {

  async find (query) {
    return await BlogModal.find(query)
  }

  async findById (cid) {
    const data = await BlogModal.findById(cid)
    if (data && data._id) {
      return data
    }
    return false
  }

  async findByIdAndRemove (cid) {
    const data = await BlogModal.findByIdAndRemove(cid)
    if (data && data._id) {
      return data
    }
    return false
  }

  async create (params) {
    const data = await BlogModal.create(params)
    if (data && data._id) {
      return data
    }
    return false
  }

  async getBlogByPage(params, page) {
    try {
      const skip = (page.pageNum - 1) * page.pageSize
      const sort = { updateAt: -1 }
      const list = await BlogModal.find(params, {
        content: 0,
        description: 0,
        tag: 0
      }).sort(sort).skip(skip).limit(page.pageSize)
      const count = await BlogModal.find(params).count(true)
      return {
        list,
        total: count,
        pageNum: page.pageNum,
        pageSize: page.pageSize
      }
    } catch(err) {
      return false
    }
  }

  async updateBlogById(id, params = {}) {
    const data = await BlogModal.updateOne({_id: id}, params)
    if (data && data.ok) {
      return true
    }
    return false
  }
}

export default new BlogService()
